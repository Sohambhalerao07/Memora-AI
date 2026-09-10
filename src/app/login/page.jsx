// src/app/login/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useTenant } from '@/context/TenantContext';

export default function LoginPage() {
  const router = useRouter();
  const { switchTenant } = useTenant();
  const [email, setEmail] = useState('marcus@luminarystudios.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login and route to tenant studio
    switchTenant('tenant-luminary');
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex flex-col justify-center items-center p-6 selection:bg-neutral-800">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs">
              M
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">MEMORA<span className="text-neutral-500 font-light">.AI</span></span>
          </Link>
          <h1 className="text-2xl font-light text-white tracking-tight">Studio Sign In</h1>
          <p className="text-xs text-neutral-400 mt-1">Access your photography organization and event galleries.</p>
        </div>

        {/* Form Card */}
        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-xs shadow-md disabled:opacity-60"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500">
            <span>Looking for your event photos? </span>
            <Link href="/g/rhea-akash" className="text-white hover:underline">
              Enter Guest View &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
