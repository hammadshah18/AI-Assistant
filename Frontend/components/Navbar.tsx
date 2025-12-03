'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'AI Assistant', href: '/chat' },
    { label: 'FAQ', href: '/#faq' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">
                AI
              </div>
              <span className="text-lg font-semibold text-gray-800 hidden sm:inline">
                Assistant
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => router.push('/chat')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              Start Chat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                router.push('/chat');
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transition mt-2"
            >
              Start Chat
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
