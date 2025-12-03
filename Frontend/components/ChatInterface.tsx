'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Send, Trash2, Plus } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { HeaderBar } from './HeaderBar';
import { useAuth } from '../context/AuthProvider';
import api from '../lib/api';
import type { Message, Session } from '../types';

// Founder system prompt
const FOUNDER_SYSTEM_PROMPT = `
You were created by Muhammad Hammad.
Founder: Muhammad Hammad
Portfolio: https://www.hammadshah.me
LinkedIn: https://linkedin.com/in/hammad-shah-90741b25b
GitHub: https://github.com/hammadshah18
`;

// Session type
interface SessionData {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

// Helper function to generate session title from first message
function generateSessionTitle(message: string): string {
  const maxLength = 50;
  return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
}

// Typewriter animation helper
async function typeText(
  fullText: string,
  setDisplayed: React.Dispatch<React.SetStateAction<string>>,
  speed: number = 20
): Promise<void> {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayed((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('General');
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>();
  const [showSessions, setShowSessions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [displayedReply, setDisplayedReply] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Load sessions from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('chat_sessions');
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions));
      } catch {
        console.error('Error loading sessions from localStorage');
      }
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, displayedReply]);

  // Load conversation when session is selected
  const loadSession = async (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
      setShowSessions(false);
    }
  };

  // Create a new chat session
  const startNewChat = () => {
    setMessages([]);
    setCurrentSessionId(undefined);
    setDisplayedReply('');
    setShowSessions(false);
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const userInput = input;
    setMessages((p) => [...p, userMessage]);
    setInput('');
    setLoading(true);
    setDisplayedReply('');
    setIsTyping(true);

    try {
      // Build message history
      const messageHistory = messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));
      messageHistory.push({
        role: 'user' as const,
        content: userInput,
      });

      let assistantReply = '';

      if (mode === 'Explain Code JSON') {
        // Handle code explanation
        const analysis = await api.explainCodeJson(userInput);
        assistantReply = typeof analysis.json === 'object'
          ? JSON.stringify(analysis.json, null, 2)
          : analysis.raw || 'Code analysis completed.';
      } else {
        // Send to chat endpoint
        const response = await api.sendChatRequest({
          mode,
          messages: messageHistory,
          temperature,
          memory: false,
        });
        assistantReply = response.reply;
      }

      // Typewriter animation
      setIsTyping(true);
      await typeText(assistantReply, setDisplayedReply, 20);
      setIsTyping(false);

      // Create or update session
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantReply,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);

      // Handle session management
      let sessionId = currentSessionId;
      if (!sessionId) {
        sessionId = `session-${Date.now()}`;
        const newSession: SessionData = {
          id: sessionId,
          title: generateSessionTitle(userInput),
          createdAt: new Date().toISOString(),
          messages: updatedMessages,
        };
        setSessions((p) => [newSession, ...p]);
        setCurrentSessionId(sessionId);
      } else {
        // Update existing session
        setSessions((p) =>
          p.map((s) =>
            s.id === sessionId ? { ...s, messages: updatedMessages } : s
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      const errorReply = `Sorry, there was an error processing your message: ${errorMessage}`;
      setDisplayedReply(errorReply);

      const errorMessage_obj: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: errorReply,
        timestamp: new Date(),
      };
      setMessages((p) => [...p, errorMessage_obj]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  // Handle delete session
  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions((p) => p.filter((s) => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      startNewChat();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          showSessions ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-20 transition-transform duration-300 w-64 bg-white border-r border-gray-200 h-screen flex flex-col`}
      >
        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={startNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition"
          >
            <Plus size={18} /> New Chat
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-3">
          <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
            Chat History
          </h3>
          {sessions.length === 0 ? (
            <p className="text-xs text-gray-400">No conversations yet</p>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => loadSession(session.id)}
                className={`p-3 mb-2 rounded-lg cursor-pointer group transition ${
                  currentSessionId === session.id
                    ? 'bg-blue-50 border border-blue-600'
                    : 'hover:bg-gray-100'
                }`}
              >
                <p className="text-sm font-medium text-gray-800 truncate mb-1">
                  {session.title}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={(e) => handleDeleteSession(session.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {showSessions && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setShowSessions(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <HeaderBar
          mode={mode}
          setMode={setMode}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          setShowSessions={setShowSessions}
        />

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-blue-50 border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature: {temperature.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-gray-500 mt-2">
                Lower = more focused. Higher = more creative.
              </p>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          {messages.length === 0 && !displayedReply ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-7xl mb-6">💬</div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-3">
                  Start a conversation
                </h2>
                <p className="text-gray-500 mb-6">
                  Ask me anything or select a mode to get started.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Code Analysis', 'Debugger', 'Documentation'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {isTyping && displayedReply && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-5 py-3 rounded-2xl shadow-md border border-gray-100 max-w-[75%]">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-gray-800 whitespace-pre-wrap">{displayedReply}</p>
                    </div>
                  </div>
                </div>
              )}
              {loading && !displayedReply && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white px-5 py-4 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-4 shadow-lg">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Type your message... (Press Enter to send)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-gray-50 focus:bg-white transition"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Current mode: <span className="font-medium text-blue-600">{mode}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
