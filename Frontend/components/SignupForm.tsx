'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthProvider';

export const SignupForm: React.FC<{ onSwitchToLogin?: () => void }> = ({ onSwitchToLogin }) => {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!email || !password || !confirmPassword) return setError('Please fill in all fields');
    if (!/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    setLoading(true);
    try {
      await signup(email, password);
      router.push('/chat');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Create Account</h1>
          <p className="text-gray-500">Join AI Assistant today</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>}

          <button onClick={submit} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 font-medium hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
