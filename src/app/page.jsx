// src/app/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Sparkles, ShieldCheck, Zap, QrCode, ArrowRight, Layers, Database, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-neutral-100 flex flex-col selection:bg-neutral-800">
      {/* Top Navigation */}
      <header className="border-b border-neutral-800/80 sticky top-0 z-50 backdrop-blur-md bg-[#09090B]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-neutral-200 to-neutral-500 flex items-center justify-center text-black font-black text-sm tracking-wider">
              M
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">MEMORA<span className="text-neutral-500 font-light">.AI</span></span>
            <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/60 ml-1">
              Multi-Tenant SaaS
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/g/rhea-akash"
              className="text-neutral-400 hover:text-white transition-colors px-3 py-1.5 hidden md:block"
            >
              Guest Demo
            </Link>
            <Link
              href="/admin"
              className="text-neutral-400 hover:text-white transition-colors px-3 py-1.5 hidden md:block"
            >
              Platform Admin
            </Link>
            <Link
              href="/login"
              className="text-neutral-300 hover:text-white transition-colors px-3 py-1.5"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Studio Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-24 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 text-xs font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Next-Generation Facial Recognition for Events</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] max-w-4xl">
            Scan. Take a selfie. <br />
            <span className="font-serif italic font-normal text-neutral-400">Find yourself instantly.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            A production-ready SaaS for photographers and event studios. Upload thousands of photos, index faces in the background, and give guests their personalized gallery in seconds.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/g/rhea-akash"
              className="group flex items-center gap-2 bg-white text-black font-medium px-6 py-3.5 rounded-xl hover:bg-neutral-200 transition-all shadow-md text-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Try Guest Selfie Discovery</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800/60 font-medium px-6 py-3.5 rounded-xl transition-all text-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Enter Tenant Studio</span>
            </Link>
          </div>

          {/* Metric Badges */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-neutral-800/80 w-full max-w-4xl text-left">
            <div>
              <div className="text-2xl font-light text-white tracking-tight">5,000+</div>
              <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">Photos Per Gallery</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white tracking-tight">&lt; 1.2s</div>
              <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">AI Face Match Time</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white tracking-tight">100%</div>
              <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">Tenant Data Isolation</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white tracking-tight">Ephemeral</div>
              <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">Privacy First Selfies</div>
            </div>
          </div>
        </section>

        {/* Visual Product Workflow */}
        <section className="py-20 border-t border-neutral-800/80 bg-neutral-950/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">The Architecture</h2>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Engineered for massive event scale.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white mb-6">
                    <Database className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Multi-Tenant Isolation</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Every gallery, photo, face cluster, and storage key is cryptographically bounded by a verified <code className="text-xs text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">tenantId</code> server-side.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-800/80 text-xs text-neutral-500">
                  Strict logical boundaries &bull; Cloudflare R2
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white mb-6">
                    <Zap className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Async Vector Pipeline</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Batch upload thousands of files with an immediate <code className="text-xs text-neutral-300 bg-neutral-800 px-1 py-0.5 rounded">202 Accepted</code>. Background workers extract face embeddings asynchronously.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-800/80 text-xs text-neutral-500">
                  OpenCV + DeepFace &bull; Cosine similarity search
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white mb-6">
                    <QrCode className="w-5 h-5 text-neutral-300" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Frictionless Guest Experience</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Guests scan an event QR code, capture a quick selfie right from their phone camera, and receive their photos without logging in or browsing thousands of shots.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-800/80 text-xs text-neutral-500">
                  Mobile-first &bull; Ephemeral biometric vectors
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles CTA */}
        <section className="py-20 border-t border-neutral-800/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-light text-white mb-4">Choose an interface to test</h3>
            <p className="text-neutral-400 text-sm mb-10">Memora-AI contains tailored interfaces for all user personas.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/g/rhea-akash"
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/80 transition-all text-left"
              >
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">For Guests</div>
                <div className="text-base font-medium text-white mb-1">Guest Selfie Discovery</div>
                <div className="text-xs text-neutral-500">Scan QR, capture selfie, get matched photos</div>
              </Link>

              <Link
                href="/dashboard"
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/80 transition-all text-left"
              >
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">For Studios</div>
                <div className="text-base font-medium text-white mb-1">Tenant Studio Dashboard</div>
                <div className="text-xs text-neutral-500">Manage galleries, upload photos, print QR codes</div>
              </Link>

              <Link
                href="/admin"
                className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800/80 transition-all text-left"
              >
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">For Platform</div>
                <div className="text-base font-medium text-white mb-1">Platform Superadmin</div>
                <div className="text-xs text-neutral-500">System health, 248 tenants, quotas & billing</div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-neutral-800/80 py-8 px-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} Memora-AI Inc. Multi-tenant biometric photo discovery.</div>
          <div className="flex gap-6 text-neutral-400">
            <span>Privacy Policy</span>
            <span>Biometric Data Notice</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
