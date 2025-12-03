import type { Message, Session } from '../types/index.d';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Types for API requests/responses
interface MessageItem {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestPayload {
  mode?: string;
  messages: MessageItem[];
  model?: string;
  temperature?: number;
  memory?: boolean;
}

interface ChatResponsePayload {
  reply: string;
  mode: string;
  model: string;
  raw?: any;
}

interface ModesResponse {
  modes: string[];
}

interface SetModeResponse {
  message: string;
  system_prompt: string;
}

interface SetModelResponse {
  message: string;
  model: string;
  temperature: number;
}

interface ConversationResponse {
  session_id: string;
  conversation: MessageItem[];
}

export const api = {
  /**
   * Fetch list of available assistant modes
   */
  async getModes(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/modes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch modes: ${response.statusText}`);
      }

      const data: ModesResponse = await response.json();
      return data.modes;
    } catch (error) {
      console.error('Error fetching modes:', error);
      throw error;
    }
  },

  /**
   * Send a chat request to the backend
   * @param payload ChatRequestPayload with mode, messages, optional model/temperature
   */
  async sendChatRequest(payload: ChatRequestPayload): Promise<ChatResponsePayload> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.statusText}`);
      }

      const data: ChatResponsePayload = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending chat request:', error);
      throw error;
    }
  },

  /**
   * Set the assistant mode/role
   * @param mode The mode name (e.g., "Debugger", "Code Analysis")
   */
  async setMode(mode: string): Promise<SetModeResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/set_mode?mode=${encodeURIComponent(mode)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to set mode: ${response.statusText}`);
      }

      const data: SetModeResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error setting mode:', error);
      throw error;
    }
  },

  /**
   * Update model configuration
   * @param model Optional model name
   * @param temperature Optional temperature value
   */
  async setModel(model?: string, temperature?: number): Promise<SetModelResponse> {
    try {
      const params = new URLSearchParams();
      if (model) params.append('model', model);
      if (temperature !== undefined) params.append('temperature', temperature.toString());

      const response = await fetch(
        `${API_BASE_URL}/set_model?${params.toString()}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to set model: ${response.statusText}`);
      }

      const data: SetModelResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error setting model:', error);
      throw error;
    }
  },

  /**
   * Get a conversation by session ID
   * @param sessionId The session ID
   */
  async getConversation(sessionId: string): Promise<MessageItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${encodeURIComponent(sessionId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch conversation: ${response.statusText}`);
      }

      const data: ConversationResponse = await response.json();
      return data.conversation;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw error;
    }
  },

  /**
   * Clear/delete a conversation by session ID
   * @param sessionId The session ID
   */
  async deleteConversation(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/conversation/${encodeURIComponent(sessionId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete conversation: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  },

  /**
   * Explain code and return JSON analysis
   * @param code The code to explain
   * @param language Programming language (default: "python")
   */
  async explainCodeJson(code: string, language: string = 'python'): Promise<any> {
    try {
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('language', language);

      const response = await fetch(`${API_BASE_URL}/explain_code_json?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to explain code: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error explaining code:', error);
      throw error;
    }
  },

  // Keep legacy methods for compatibility with existing code
  async login(email: string, password: string) {
    return new Promise<{ token: string }>((resolve) =>
      setTimeout(() => resolve({ token: 'mock-jwt-token-' + Date.now() }), 500)
    );
  },

  async signup(email: string, password: string) {
    return new Promise<{ token: string }>((resolve) =>
      setTimeout(() => resolve({ token: 'mock-jwt-token-' + Date.now() }), 500)
    );
  },

  async getSessions(token: string) {
    return new Promise<Session[]>((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'session-1', title: 'Code Review Discussion', lastMessage: new Date() },
          { id: 'session-2', title: 'Debug Help', lastMessage: new Date(Date.now() - 86400000) },
          { id: 'session-3', title: 'Architecture Planning', lastMessage: new Date(Date.now() - 172800000) },
        ]);
      }, 500);
    });
  },

  async getSessionMessages(sessionId: string, token: string) {
    return new Promise<Message[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            role: 'user',
            content: 'Hello! Can you help me with a code review?',
            timestamp: new Date(Date.now() - 3600000),
          },
          {
            id: '2',
            role: 'assistant',
            content: "Of course! I'd be happy to help with your code review. Please share the code you'd like me to review.",
            timestamp: new Date(Date.now() - 3500000),
          },
        ]);
      }, 300);
    });
  },

  async deleteSession(sessionId: string, token: string) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 300));
  },
};

export default api;
