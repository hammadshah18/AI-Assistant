'use client';
import React from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import type { Session } from '../types';

export const SidebarSessions: React.FC<{
  sessions: Session[];
  currentSessionId?: string;
  onLoad: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onNewChat: () => void;
}> = ({ sessions, currentSessionId, onLoad, onDelete, onNewChat }) => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen fixed md:relative z-20">
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <button onClick={onNewChat} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
          <MessageSquare size={18} /> New Chat
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-88px)]">
        <div className="p-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Recent Conversations</h3>
        </div>
        {sessions.map((session) => (
          <div key={session.id} onClick={() => onLoad(session.id)} className={`p-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer group ${currentSessionId === session.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate mb-1">{session.title}</p>
                <p className="text-xs text-gray-500">{new Date(session.lastMessage).toLocaleDateString()}</p>
              </div>
              <button onClick={(e) => onDelete(session.id, e)} className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
