# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Backend Setup (Terminal 1)
```bash
cd Backend
pip install -r requirements.txt
# Create .env file with GOOGLE_API_KEY=your_key
uvicorn main:app --reload
```
✅ Backend runs at: http://localhost:8000

### Step 2: Frontend Setup (Terminal 2)
```bash
cd Frontend
npm install
npm run dev
```
✅ Frontend runs at: http://localhost:3000

### Step 3: Test It
1. Open http://localhost:3000
2. Sign up / Login
3. Go to `/chat`
4. Send a message
5. See typewriter animation ✨

---

## 📍 Key URLs

| Page | URL |
|------|-----|
| Landing | http://localhost:3000 |
| Chat | http://localhost:3000/chat |
| About | http://localhost:3000/about |
| Login | http://localhost:3000/auth/login |
| Signup | http://localhost:3000/auth/signup |
| API Docs | http://localhost:8000/docs |

---

## 🎯 What's Implemented

✅ **Markdown** - Bold, code blocks, lists work perfectly  
✅ **Chat History** - Sessions save automatically  
✅ **Typewriter** - Letter-by-letter typing effect  
✅ **Landing Page** - Beautiful professional design  
✅ **Navigation** - Navbar on all pages  
✅ **About Page** - Founder info & links  
✅ **Mode Selection** - Dropdown with all AI modes  
✅ **Temperature Control** - Slider in settings  
✅ **API Wrapper** - Clean TypeScript integration  
✅ **Mobile Responsive** - Works on all devices  

---

## 📂 Important Files

```
Frontend/
├── .env.local                    ← API URL config
├── app/
│   ├── page.tsx                 ← Landing page
│   ├── chat/page.tsx            ← Chat page
│   └── about/page.tsx           ← About page
├── components/
│   ├── Navbar.tsx               ← Navigation
│   ├── ChatInterface.tsx         ← Main chat (sessions + animation)
│   ├── ChatMessage.tsx           ← Markdown rendering
│   └── HeaderBar.tsx             ← Mode dropdown
└── lib/
    └── api.ts                   ← API functions

Backend/
├── main.py                      ← FastAPI app
└── .env                         ← Google API key
```

---

## 🔧 Environment Variables

### Backend `.env`
```env
GOOGLE_API_KEY=your_google_gemini_key_here
TEMPERATURE=0.2
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## 💡 Features Explained

### Markdown Support
Messages with formatting:
- **Bold**: `**text**`
- Code blocks: ` ```language\ncode\n``` `
- Lists: `- item` or `1. item`
- Links: `[text](url)`

### Session Management
- Automatically saves to localStorage
- Shows in left sidebar
- Click to load
- Delete with trash icon

### Typewriter Animation
- Each character appears smoothly
- 20ms delay per character
- Professional look
- Works with all responses

### Mode Selection
- Dynamic dropdown from backend
- Select to change AI role
- Sends with every message

### Temperature Slider
- 0 = focused, logical
- 0.5 = balanced
- 1 = creative, random
- Affects response style

---

## 🎨 Design Features

- **Gradient colors**: Cyan to Purple
- **Responsive**: Mobile, tablet, desktop
- **Smooth animations**: Buttons, transitions
- **Professional UI**: Clean, modern design
- **Accessibility**: Proper contrast, semantic HTML

---

## ⚠️ Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.9+

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install -r requirements.txt
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Or start fresh
npx create-next-app@latest
```

### Can't connect to API
- Check backend is running at http://localhost:8000
- Check `.env.local` has correct URL
- Check browser console for CORS errors
- Reload frontend page

### Markdown not showing
```bash
# Reinstall markdown packages
npm install react-markdown remark-gfm
npm run dev
```

### Sessions not saving
- Check localStorage is enabled
- DevTools > Application > Storage > Local Storage
- Try clearing browser cache

---

## 📞 Need Help?

Refer to:
- **Setup Details**: See `SETUP.md`
- **Features**: See `Frontend/README.md`
- **Full Summary**: See `IMPLEMENTATION_SUMMARY.md`
- **Creator**: Muhammad Hammad (LinkedIn, GitHub, Portfolio)

---

## ✅ Checklist

- [ ] Backend Python installed (3.9+)
- [ ] Frontend Node installed (18+)
- [ ] Google API key obtained
- [ ] `.env` file created (Backend)
- [ ] `.env.local` file created (Frontend)
- [ ] Backend running at :8000
- [ ] Frontend running at :3000
- [ ] Can create account
- [ ] Can send messages
- [ ] See typewriter animation
- [ ] Sessions appear in sidebar

**All checked?** You're good to go! 🎉

---

## 🚀 Deployment

### Quick Deploy to Vercel (Frontend)

```bash
npm install -g vercel
vercel
# Follow prompts, set NEXT_PUBLIC_API_BASE_URL
```

### Docker (Optional)

**Backend**:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

**Frontend**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## 📊 API Quick Reference

```bash
# Get available modes
curl http://localhost:8000/modes

# Send chat message
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "Code Analysis",
    "messages": [{"role": "user", "content": "explain this code"}],
    "temperature": 0.7
  }'

# Get conversation
curl http://localhost:8000/conversation/session-123

# Delete conversation
curl -X DELETE http://localhost:8000/conversation/session-123
```

---

## 🎯 What Next?

1. **Explore Pages**: Visit all pages to see design
2. **Test Features**: Try different modes and temperature
3. **Check Sidebar**: Watch sessions save automatically
4. **Read Code**: See implementation in `ChatInterface.tsx`
5. **Deploy**: Follow deployment section above

---

**Version**: 1.0.0  
**Last Updated**: November 30, 2025  
**Status**: ✅ Production Ready

Happy coding! 🚀
