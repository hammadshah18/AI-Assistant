# AI Assistant Frontend

A modern, professional AI chatting application built with Next.js 14, React, and Tailwind CSS. Features real-time chat with markdown support, session management, and typewriter animations.

## 🚀 Features

### Chat Features
- **Markdown Rendering**: Bold, code blocks, lists, and formatted text support
- **Typewriter Animation**: Letter-by-letter typing effect for smooth responses
- **Session Management**: Chat history stored in localStorage (ChatGPT-style sidebar)
- **Multiple AI Modes**: Code Analysis, Debugging, Generation, Documentation, and more
- **Temperature Control**: Adjust AI creativity with temperature slider (0-1)
- **Real-time Streaming**: Responsive message display with loading indicators

### UI/UX
- **Responsive Design**: Mobile-friendly interface with collapsible sidebar
- **Professional Landing Page**: Hero section, features, founder bio, FAQ
- **Global Navbar**: Navigation bar on all pages
- **About Page**: Comprehensive information about the project and creator
- **Dark-aware Markdown**: Properly styled code blocks and text formatting
- **Smooth Animations**: Gradient buttons, hover effects, and transitions

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running at `http://localhost:8000`

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create or update `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── chat/
│   │   └── page.tsx          # Chat interface page
│   ├── about/
│   │   └── page.tsx          # About page
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   └── signup/
│   │       └── page.tsx      # Signup page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── Navbar.tsx            # Global navigation bar
│   ├── ChatInterface.tsx      # Main chat component
│   ├── ChatMessage.tsx        # Individual message component (with Markdown)
│   ├── HeaderBar.tsx          # Chat page header
│   ├── LoginForm.tsx          # Login form
│   ├── SignupForm.tsx         # Signup form
│   └── SidebarSessions.tsx    # Session sidebar (optional, integrated)
├── context/
│   └── AuthProvider.tsx       # Auth context provider
├── lib/
│   └── api.ts                 # API wrapper functions
├── types/
│   └── index.d.ts            # TypeScript type definitions
├── public/                    # Static assets
├── .env.local                 # Environment variables
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🔌 API Integration

The frontend connects to the FastAPI backend using the API wrapper in `lib/api.ts`.

### Key Functions

- `getModes()`: Fetch available AI modes
- `sendChatRequest(payload)`: Send message to assistant
- `setMode(mode)`: Change assistant role
- `setModel(model, temperature)`: Update model settings
- `getConversation(sessionId)`: Load conversation history
- `deleteConversation(sessionId)`: Delete a conversation
- `explainCodeJson(code, language)`: Analyze code

### API Base URL

Configured via `NEXT_PUBLIC_API_BASE_URL` environment variable.

## 📝 Key Components

### ChatInterface
Main component managing:
- Message state and history
- Session management with localStorage
- Typewriter animation logic
- API communication
- Error handling

### ChatMessage
Displays individual messages with:
- Markdown rendering using `react-markdown`
- Syntax highlighting for code
- Support for lists, tables, blockquotes
- Timestamp display

### HeaderBar
Controls:
- Mode selection dropdown (fetched from backend)
- Settings panel toggle
- Mobile sidebar toggle
- Logout button

### Navbar
Global navigation with:
- Responsive design
- Mobile menu
- Links to home, about, chat, FAQ
- Start chat button

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Gradients**: Cyan to Purple gradients throughout
- **Responsive**: Mobile-first approach
- **Accessibility**: Semantic HTML, proper contrast

## 🔐 Authentication

Currently uses mock tokens. To enable real authentication:

1. Update `AuthProvider.tsx` to connect to real auth API
2. Implement JWT token storage
3. Add token refresh logic
4. Implement proper login/signup endpoints

## 💾 Session Management

Sessions are stored in localStorage:
- Key: `chat_sessions`
- Format: JSON array of session objects
- Includes: id, title, createdAt, messages
- Persists across browser sessions

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Vercel Deployment

```bash
npm install -g vercel
vercel
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running at the configured URL
- Check `.env.local` for correct `NEXT_PUBLIC_API_BASE_URL`
- Check browser console for CORS errors

### Markdown Not Rendering
- Verify `react-markdown` and `remark-gfm` are installed
- Clear node_modules and reinstall: `npm install`

### Session Data Not Saving
- Check browser's localStorage is enabled
- Clear browser cache if experiencing issues
- Verify browser devtools > Application > Storage > Local Storage

### Typewriter Animation Not Working
- Check for JavaScript errors in console
- Verify component is properly mounted
- Check animation speed in `ChatInterface.tsx` (default 20ms)

## 📚 Dependencies

### Core
- `next@^14.0.0` - React framework
- `react@^18.0.0` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility CSS
- `lucide-react` - Icon library

### Markdown & Text
- `react-markdown` - Markdown renderer
- `remark-gfm` - GitHub flavored markdown

### Development
- `eslint` - Code linting
- `prettier` - Code formatting

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

Created by Muhammad Hammad

## 🔗 Links

- **Portfolio**: https://www.hammadshah.me
- **LinkedIn**: https://linkedin.com/in/hammad-shah-90741b25b
- **GitHub**: https://github.com/hammadshah18

---

## 🎯 Quick Start Checklist

- [ ] Clone the repository
- [ ] Run `npm install`
- [ ] Create `.env.local` with API URL
- [ ] Start backend: `cd backend && uvicorn main:app --reload`
- [ ] Start frontend: `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] Create account or login
- [ ] Start chatting!

## 📞 Support

For issues, questions, or suggestions, reach out to Muhammad Hammad on LinkedIn or GitHub.

Enjoy using AI Assistant! 🚀
