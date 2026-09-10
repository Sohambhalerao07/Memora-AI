// src/app/signup/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building, Mail, User } from 'lucide-react';
import { useTenant } from '@/context/TenantContext';

export default function SignupPage() {
  const router = useRouter();
  const { switchTenant } = useTenant();
  const [studioName, setStudioName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/v1/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studioName,
          ownerName,
          email,
          plan: 'Pro',
        }),
      });
      const data = await res.json();
      if (data.success) {
        switchTenant(data.tenant.id);
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Registration failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex flex-col justify-center items-center p-6 selection:bg-neutral-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs">
              M
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">MEMORA<span className="text-neutral-500 font-light">.AI</span></span>
          </Link>
          <h1 className="text-2xl font-light text-white tracking-tight">Create Photography Studio</h1>
          <p className="text-xs text-neutral-400 mt-1">Start your 14-day free trial with multi-tenant facial recognition.</p>
        </div>

        <div className="bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Studio / Company Name *</label>
              <div className="relative">
                <Building className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Luminary Visuals"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-medium">Work Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="email"
                  required
                  placeholder="alex@luminary.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-white text-black font-medium rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 text-xs shadow-md disabled:opacity-60"
            >
              <span>{loading ? 'Creating Studio...' : 'Register Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800/80 text-center text-[11px] text-neutral-500">
            <span>Already have an account? </span>
            <Link href="/login" className="text-white hover:underline">
              Log in &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
