# AI Assistant - Complete Setup Guide

A full-stack AI chatting application with FastAPI backend and Next.js 14 frontend.

## 📋 System Requirements

- **Node.js**: 18.0 or higher
- **Python**: 3.9 or higher
- **npm**: 9.0 or higher (comes with Node.js)
- **Git**: For version control

## 🚀 Quick Start (5 Minutes)

### Terminal 1: Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with:
# GOOGLE_API_KEY=your_api_key_here
# TEMPERATURE=0.2

# Start the server
uvicorn main:app --reload
```

Backend will be available at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Terminal 2: Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install Node dependencies
npm install

# Verify .env.local exists with:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
AI-Assistant/
├── Backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables (GOOGLE_API_KEY)
│
└── Frontend/
    ├── app/
    │   ├── page.tsx            # Landing page
    │   ├── chat/
    │   │   └── page.tsx        # Chat interface
    │   ├── about/
    │   │   └── page.tsx        # About page
    │   └── auth/
    │       ├── login/
    │       └── signup/
    ├── components/             # React components
    ├── lib/
    │   └── api.ts             # API wrapper
    ├── context/               # React context (Auth)
    ├── types/                 # TypeScript types
    ├── .env.local             # Frontend env vars
    ├── package.json           # Node dependencies
    └── README.md              # Frontend documentation
```

## 🔧 Configuration

### Backend (.env)

Create `Backend/.env`:

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
TEMPERATURE=0.2
```

**Get your API key:**
1. Visit: https://ai.google.dev/
2. Click "Get API Key"
3. Create a new project
4. Generate API key
5. Copy and paste into `.env`

### Frontend (.env.local)

Create `Frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 📚 Available Features

### Backend Routes

- `GET /` - Home/welcome endpoint
- `GET /modes` - List available AI modes
- `POST /chat` - Send message to AI
- `POST /set_mode` - Change AI mode
- `POST /set_model` - Update model/temperature
- `GET /conversation/{session_id}` - Load conversation
- `DELETE /conversation/{session_id}` - Delete conversation
- `POST /explain_code_json` - Analyze code

### AI Modes

1. **General** - General purpose assistant
2. **Code Analysis** - Analyze code structure
3. **Code Generator** - Generate production code
4. **Debugger** - Find and fix bugs
5. **Code Guide** - Teach best practices
6. **Optimization** - Optimize performance
7. **Explain Code** - Explain code simply
8. **Project Builder** - Full-stack development
9. **Documentation** - Generate documentation
10. **Security Auditor** - Find vulnerabilities
11. **Code Reviewer** - Professional code review
12. **Test Writer** - Generate tests

### Frontend Features

✅ Real-time chat with markdown support
✅ Chat history with persistent sessions
✅ Typewriter animation for responses
✅ Multiple AI modes with dropdown
✅ Temperature control slider
✅ Professional landing page
✅ About page with founder info
✅ Global navigation navbar
✅ Mobile-responsive design
✅ Error handling and loading states
✅ Dark-aware UI components

## 🔐 Authentication

Currently uses mock authentication. The app includes:

- Login page: `/auth/login`
- Signup page: `/auth/signup`
- Auth context: `Frontend/context/AuthProvider.tsx`

For production, update authentication in `AuthProvider.tsx`.

## 📱 Pages

### Frontend URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Landing page |
| `http://localhost:3000/chat` | Chat interface |
| `http://localhost:3000/about` | About page |
| `http://localhost:3000/auth/login` | Login |
| `http://localhost:3000/auth/signup` | Sign up |

## 🎯 How It Works

1. **User sends message** in chat interface
2. **Frontend collects** message history and metadata
3. **API sends request** to backend with:
   - Current mode (AI role)
   - Message history
   - Temperature (creativity setting)
4. **Backend processes** with:
   - LangChain framework
   - Google Gemini AI
   - Selected role prompt
5. **Response streams** back to frontend
6. **Frontend displays** with typewriter animation
7. **Session saved** to localStorage

## 🚀 Production Deployment

### Backend (FastAPI)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 main:app
```

### Frontend (Next.js)

```bash
# Build for production
npm run build

# Start production server
npm start

# Or deploy to Vercel
npm install -g vercel
vercel
```

## 🐛 Troubleshooting

### Backend Issues

**CORS Error in Frontend**
- Ensure backend CORS middleware is enabled
- Check `main.py` has `CORSMiddleware` configured

**Google API Key Error**
- Verify API key is set in `.env`
- Check key hasn't expired
- Ensure Gemini API is enabled in Google Cloud

**ModuleNotFoundError**
- Install requirements: `pip install -r requirements.txt`
- Use virtual environment: `python -m venv venv && source venv/bin/activate`

### Frontend Issues

**Cannot reach backend**
- Verify backend is running at `http://localhost:8000`
- Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
- Check browser console for CORS errors

**Markdown not rendering**
- Clear node_modules: `rm -rf node_modules && npm install`
- Verify `react-markdown` package is installed

**Sessions not saving**
- Check localStorage is enabled in browser
- Open DevTools > Application > Storage > Local Storage

## 📊 API Response Examples

### Chat Request

```json
{
  "mode": "Code Analysis",
  "messages": [
    {"role": "user", "content": "Explain this Python code..."}
  ],
  "temperature": 0.7
}
```

### Chat Response

```json
{
  "reply": "This Python code does...",
  "mode": "Code Analysis",
  "model": "gemini-2.5-pro"
}
```

## 🔗 Useful Links

- **Google Gemini API**: https://ai.google.dev/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/
- **React Markdown**: https://github.com/remarkjs/react-markdown

## 👨‍💻 Creator

**Muhammad Hammad**

- Portfolio: https://www.hammadshah.me
- LinkedIn: https://linkedin.com/in/hammad-shah-90741b25b
- GitHub: https://github.com/hammadshah18

## 📄 License

Free to use and modify for personal and commercial projects.

---

## ✅ Setup Checklist

- [ ] Cloned the repository
- [ ] Created backend `.env` with Google API key
- [ ] Created frontend `.env.local` with API URL
- [ ] Installed Python dependencies
- [ ] Installed Node dependencies
- [ ] Backend running at `http://localhost:8000`
- [ ] Frontend running at `http://localhost:3000`
- [ ] Can access API docs at `http://localhost:8000/docs`
- [ ] Can create account and login
- [ ] Can send messages and get responses
- [ ] Sessions appear in sidebar

**Everything working? You're all set!** 🎉

## 💡 Tips

- Keep both backend and frontend terminals running
- Use DevTools to debug frontend issues
- Check backend logs for API errors
- Use `/docs` endpoint for API exploration
- Sessions automatically save to localStorage
- Clear browser storage to reset chat history

---

Happy coding! Feel free to reach out with questions. 🚀
