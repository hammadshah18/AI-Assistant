'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthProvider';
import { ChatInterface } from '../../components/ChatInterface';

export default function ChatPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/auth/login');
  }, [user, router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Redirecting to login...</div>;

  return (
    <div className="h-screen flex flex-col">
      <ChatInterface />
    </div>
  );
}
