from itertools import tee
import os
import json
import re
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# LangChain / Google Gemini client (keep the import you used previously)
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage


# ---------- LOAD ENV ----------
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY", "")

# ---------- FASTAPI APP ----------
app = FastAPI(title="AI Assistant Service")

# Allow CORS (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- ROLE PROMPTS (single source of truth) ----------
ROLE_PROMPTS: Dict[str, str] = {
    "Code Analysis": "You are an expert code analyst. Break down every line of code and explain code clearly.",
    "Code Generator": "You are a senior developer. Generate high-quality, production-ready code.",
    "Debugger": "You are a debugging assistant. Find issues, explain them, and suggest fixes.",
    "Code Guide": "You are a mentor. Teach coding best practices step by step.",
    "Optimization": "You are a performance engineer. Optimize code for speed and efficiency.",
    "Explain Code": "You are a teacher. Explain code in simple terms with examples.",
    "Project Builder": "You are a full-stack developer. Build entire projects end-to-end.",
    "Documentation": "You are a technical writer. Generate professional documentation.",
    "General": "You are a full-stack developer assistant. Help with any coding tasks."
}
# Add more suggested roles
ROLE_PROMPTS["Security Auditor"] = "You are an application security auditor. Find vulnerabilities, explain impact, and propose fixes."
ROLE_PROMPTS["Code Reviewer"] = "You are a senior engineer performing a code review. Give line-by-line feedback and best-practice suggestions."
ROLE_PROMPTS["Test Writer"] = "You are a QA automation engineer. Generate unit/integration tests, edge cases, and test data."

# ---------- CONFIG / DEFAULTS ----------
DEFAULT_MODEL_NAME = "gemini-2.5-pro"
Temperature = float(os.getenv("TEMPERATURE", "0.2"))

# ---------- Pydantic models for API ----------
class MessageItem(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    mode: Optional[str] = "General"            # which role prompt to use
    messages: List[MessageItem]                # conversation (user & assistant messages)
    model: Optional[str] = None                # override model if desired
    temperature: Optional[float] = None        # override temperature
    memory: Optional[bool] = False             # whether to store this conversation in memory

class ChatResponse(BaseModel):
    reply: str
    mode: str
    model: str
    raw: Optional[Any] = None


# ---------- LANGCHAIN CLIENT WRAPPER ----------
class LangChainClient:
    def __init__(self, mode: str = "General", model_name: str = DEFAULT_MODEL_NAME, temperature: float = Temperature):
        # System prompt
        self.mode = mode if mode in ROLE_PROMPTS else "General"
        self.system_prompt = ROLE_PROMPTS[self.mode]

        # Model params
        self.model_name = model_name
        self.temperature = temperature
        self._init_model()

        self.conversations: Dict[str, List[Dict[str, str]]] = {}

    def _init_model(self):
        """(Re)initialize the ChatGoogleGenerativeAI model client"""
        self.model = ChatGoogleGenerativeAI(
            model=self.model_name,        # <- must be string
            temperature=self.temperature,
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )


    def set_mode(self, mode: str):
        """Change assistant role (system prompt)."""
        if mode not in ROLE_PROMPTS:
            raise ValueError(f"Unknown mode '{mode}'. Available: {list(ROLE_PROMPTS.keys())}")
        self.mode = mode
        self.system_prompt = ROLE_PROMPTS[mode]

    def set_model_params(self, model: Optional[str] = None, temperature: Optional[float] = None):
        """Update model name and/or temperature then re-init model client."""
        if model:
            self.model_name = model
        if temperature is not None:
            self.temperature = temperature
        self._init_model()

    def _build_prompt_messages(self, messages: List[Dict[str, str]]) -> List:
        """
        Convert simple dict messages into langchain Message objects with a SystemMessage upfront.
        Expects messages like [{"role":"user","content":"..."} , {"role":"assistant","content":"..."}]
        """
        prompt_messages = [SystemMessage(content=self.system_prompt)]
        for m in messages:
            role = m.get("role", "user")
            content = m.get("content", "")
            if role == "user":
                prompt_messages.append(HumanMessage(content=content))
            else:
                prompt_messages.append(AIMessage(content=content))
        return prompt_messages

    def chat(self, messages: List[Dict[str, str]]) -> str:
        """Send messages to the Gemini model via LangChain and return the assistant reply (string)."""
        prompt_messages = self._build_prompt_messages(messages)
        # The ChatGoogleGenerativeAI client in your snippet used .invoke(prompt_messages)
        resp = self.model.invoke(prompt_messages)
        # Some LangChain wrappers return an object with .content; keep fallback
        return getattr(resp, "content", str(resp))

    # ---------- Simple conversation memory helpers ----------
    def save_conversation(self, session_id: str, messages: List[Dict[str, str]]):
        """Append messages to the in-memory conversation store."""
        if session_id not in self.conversations:
            self.conversations[session_id] = []
        self.conversations[session_id].extend(messages)

    def get_conversation(self, session_id: str) -> List[Dict[str, str]]:
        return self.conversations.get(session_id, [])

    def clear_conversation(self, session_id: str):
        if session_id in self.conversations:
            del self.conversations[session_id]

# ---------- CREATE A SINGLE GLOBAL CLIENT (you can create per-user clients if needed) ----------
assistant_client = LangChainClient(mode="General")

# ---------- HELPERS ----------
def extract_json(text: str):
    """Extract and parse first JSON object found in model output (safe helper)."""
    text = re.sub(r"```json|```", "", text).strip()
    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("No JSON found in model output.")
    return json.loads(match.group(0))

# ---------- ROUTES ----------
@app.get("/home")
def home():
    return {"message": "Welcome to Cerevo Multi-Mode AI Assistant API", "available_modes": list(ROLE_PROMPTS.keys())}

@app.get("/modes")
def list_modes():
    """List available assistant modes / roles."""
    return {"modes": list(ROLE_PROMPTS.keys())}

@app.post("/set_mode")
def set_mode(mode: str):
    """Change the global assistant mode (system prompt)."""
    try:
        assistant_client.set_mode(mode)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"message": f"Mode changed to '{mode}'", "system_prompt": assistant_client.system_prompt}

@app.post("/set_model")
def set_model(model: Optional[str] = None, temperature: Optional[float] = None):
    """Update model name and temperature for the assistant client."""
    assistant_client.set_model_params(model=model, temperature=temperature)
    return {"message": "Model params updated", "model": assistant_client.model_name, "temperature": assistant_client.temperature}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """
    Send a chat request. Body:
    {
      "mode": "Debugger",
      "messages": [{"role":"user","content":"..."}],
      "model": "gemini-1.5-flash",
      "temperature": 0.0,
      "memory": true
    }
    """
    # apply mode override for this request (without permanently changing global mode)
    original_mode = assistant_client.mode
    if req.mode and req.mode in ROLE_PROMPTS:
        assistant_client.system_prompt = ROLE_PROMPTS[req.mode]
    elif req.mode and req.mode not in ROLE_PROMPTS:
        # restore original and reject
        assistant_client.system_prompt = ROLE_PROMPTS[original_mode]
        raise HTTPException(status_code=400, detail=f"Unknown mode '{req.mode}'")

    # apply model override if provided (temporary init)
    original_model = assistant_client.model_name
    original_temp = assistant_client.temperature
    if req.model or req.temperature is not None:
        assistant_client.set_model_params(model=req.model or original_model, temperature=req.temperature if req.temperature is not None else original_temp)

    # prepare messages for the model invocation
    messages_payload = [m.dict() for m in req.messages]
    try:
        reply = assistant_client.chat(messages_payload)
    except Exception as e:
        # restore original state before raising
        assistant_client.set_model_params(model=original_model, temperature=original_temp)
        assistant_client.system_prompt = ROLE_PROMPTS[original_mode]
        raise HTTPException(status_code=500, detail=f"Model invocation error: {str(e)}")

    # optionally save to memory (very simple)
    if req.memory:
        # simple session_id choice: use mode name as session for demo; replace with real session/user id in prod
        session_id = req.mode or assistant_client.mode
        assistant_client.save_conversation(session_id, messages_payload + [{"role": "assistant", "content": reply}])

    # restore original model & system prompt (stateless default)
    assistant_client.set_model_params(model=original_model, temperature=original_temp)
    assistant_client.system_prompt = ROLE_PROMPTS[original_mode]

    return ChatResponse(reply=reply, mode=req.mode or assistant_client.mode, model=assistant_client.model_name, raw=None)

@app.get("/conversation/{session_id}")
def get_conversation(session_id: str):
    """Return in-memory conversation for the given session id."""
    conv = assistant_client.get_conversation(session_id)
    return {"session_id": session_id, "conversation": conv}

@app.delete("/conversation/{session_id}")
def clear_conversation(session_id: str):
    assistant_client.clear_conversation(session_id)
    return {"message": f"Conversation {session_id} cleared."}

# ---------- EXTRA: Example utility endpoint to ask assistant to return structured JSON ----------
@app.post("/explain_code_json")
def explain_code_json(code: str, language: str = "python"):
    """
    Example convenience endpoint:
    - Uses Explain Code role
    - Instructs model to return a JSON structure with line-by-line explanations
    """
    # craft a compact system prompt for this specialized task
    system = ROLE_PROMPTS["Explain Code"]
    detailed_system = system + f" Provide a JSON array with objects {{'line_no': int, 'code': str, 'explanation': str}} for the following {language} code."
    # build messages
    prompt_messages = [SystemMessage(content=detailed_system), HumanMessage(content=code)]
    try:
        resp = assistant_client.model.invoke(prompt_messages)
        raw = getattr(resp, "content", str(resp))
        # attempt to extract JSON
        try:
            parsed = extract_json(raw)
            return {"json": parsed}
        except Exception:
            return {"error": "Failed to parse JSON from model output", "raw_output": raw}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model error: {str(e)}")

