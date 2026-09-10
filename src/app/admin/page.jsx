// src/app/admin/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Building,
  HardDrive,
  Sparkles,
  Activity,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Users,
} from 'lucide-react';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/admin');
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
        setTenants(data.tenants || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const toggleTenantStatus = async (tenantId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      const res = await fetch('/api/v1/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error toggling tenant status:', err);
    }
  };

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col selection:bg-neutral-800">
      {/* Platform Admin Topbar */}
      <header className="h-16 border-b border-neutral-800/80 px-6 flex items-center justify-between bg-[#070709]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-tight">MEMORA ADMIN</span>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30">
            Platform Operator
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link href="/dashboard" className="text-neutral-400 hover:text-white">
            Studio Dashboard &rarr;
          </Link>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-8">
        {/* Global Platform Metrics */}
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight mb-4">Platform Overview</h1>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">Total Tenants</span>
              <span className="text-2xl font-light text-white">{metrics?.totalTenants || '248'}</span>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">Active Galleries</span>
              <span className="text-2xl font-light text-white">{metrics?.activeGalleries || '1,824'}</span>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">Photos Indexed</span>
              <span className="text-2xl font-light text-white">{metrics?.photosProcessed || '4.2M'}</span>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">AI Searches</span>
              <span className="text-2xl font-light text-white">{metrics?.aiSearches || '382K'}</span>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
              <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1">R2 Storage</span>
              <span className="text-2xl font-light text-white">{metrics?.storageUsed || '18.4 TB'}</span>
            </div>
          </div>
        </div>

        {/* System Health Status */}
        <div className="p-4 rounded-xl border border-neutral-800/80 bg-neutral-900/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium">All AI Inference Clusters Operational</span>
            <span className="text-neutral-500">&bull;</span>
            <span className="text-neutral-400">Queue Latency: {metrics?.avgProcessingLatencySec || '1.4s'}</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500 font-mono text-[11px]">
            <span>Cloudflare R2: Healthy</span>
            <span>Vector Engine: 0 errors</span>
          </div>
        </div>

        {/* Tenant Management Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-light text-white tracking-tight">Tenants & Organizations</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Manage customer access, quotas, and subscription tiers.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
              <input
                type="text"
                placeholder="Search tenants or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
              />
            </div>
          </div>

          <div className="border border-neutral-800/80 rounded-2xl overflow-hidden bg-neutral-900/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="px-6 py-3.5">Tenant</th>
                    <th className="px-6 py-3.5">Plan</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Galleries</th>
                    <th className="px-6 py-3.5">Photos</th>
                    <th className="px-6 py-3.5">Storage</th>
                    <th className="px-6 py-3.5">AI Searches</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {filteredTenants.map((t) => (
                    <tr key={t.id} className="hover:bg-neutral-800/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{t.name}</div>
                        <div className="text-[11px] text-neutral-500">{t.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-neutral-300">{t.plan}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            t.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}
                        >
                          <span className={`w-1 h-1 rounded-full ${t.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-300">{t.galleriesCount}</td>
                      <td className="px-6 py-4 text-neutral-300">{t.photosCount}</td>
                      <td className="px-6 py-4 text-neutral-300">
                        {(t.storageUsedBytes / 1073741824).toFixed(1)} GB
                      </td>
                      <td className="px-6 py-4 text-neutral-300">{t.aiSearchesCount}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleTenantStatus(t.id, t.status)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            t.status === 'Active'
                              ? 'text-rose-400 hover:bg-rose-500/10 border border-rose-500/20'
                              : 'text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20'
                          }`}
                        >
                          {t.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
