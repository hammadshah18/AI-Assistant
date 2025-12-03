'use client';
import React from 'react';
import { SignupForm } from '../../../components/SignupForm';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';

export default function SignupPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <SignupForm onSwitchToLogin={() => router.push('/auth/login')} />
    </>
  );
}
