'use client';
import React, { useEffect, useState } from 'react';
import { Menu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';
import api from '../lib/api';

export const HeaderBar: React.FC<{
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSessions: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mode, setMode, showSettings, setShowSettings, setShowSessions }) => {
  
  const { logout } = useAuth();
  const [modes, setModes] = useState<string[]>([]);
  const [loadingModes, setLoadingModes] = useState(true);

  useEffect(() => {
    const fetchModes = async () => {
      try {
        const fetchedModes = await api.getModes();
        setModes(fetchedModes);
      } catch (error) {
        console.error('Error fetching modes:', error);
        // Fallback to default modes
        setModes([
          'General',
          'Code Analysis',
          'Debugger',
          'Code Reviewer',
          'Code Generator',
          'Documentation',
          'Explain Code',
          'Optimization',
        ]);
      } finally {
        setLoadingModes(false);
      }
    };

    fetchModes();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm animate-slideDown">
      <div className="flex items-center gap-3">
        
        {/* mobile toggle button */}
        <button
          onClick={() => setShowSessions((v) => !v)}
          className="md:hidden text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <Menu size={24} />
        </button>

        <div className="animate-fadeIn">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 transition-all duration-300 hover:scale-105">
            AI Assistant
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Powered by Advanced AI
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 animate-fadeIn">
        
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm px-3 py-2 border border-gray-300 rounded-lg bg-white transition-all duration-200 hover:border-blue-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          disabled={loadingModes}
        >
          {loadingModes ? (
            <option>Loading modes...</option>
          ) : (
            modes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))
          )}
        </select>

        <button
          onClick={() => setShowSettings((v) => !v)}
          className="text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:rotate-90"
        >
          <Settings size={20} />
        </button>

        <button
          onClick={logout}
          className="text-gray-600 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
        >
          <LogOut size={20} />
        </button>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </header>
  );
};
