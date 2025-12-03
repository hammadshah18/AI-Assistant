'use client';
import React from 'react';
import { LoginForm } from '../../../components/LoginForm';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';

export default function LoginPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <LoginForm onSwitchToSignup={() => router.push('/auth/signup')} />
    </>
  );
}
