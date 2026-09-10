// src/app/dashboard/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Image as ImageIcon,
  Users,
  HardDrive,
  Sparkles,
  Plus,
  QrCode,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Download,
  Copy,
  Check,
  Building,
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';
import QRCode from 'qrcode';

export default function TenantDashboard() {
  const { currentTenantId, tenant, role, setRole, switchTenant, loading } = useTenant();

  const [activeTab, setActiveTab] = useState('galleries'); // 'overview' | 'galleries' | 'faces' | 'analytics' | 'billing'
  const [galleries, setGalleries] = useState([]);
  const [fetchingGalleries, setFetchingGalleries] = useState(true);

  // New gallery modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGalleryName, setNewGalleryName] = useState('');
  const [newGalleryDate, setNewGalleryDate] = useState(new Date().toISOString().split('T')[0]);
  const [newGalleryLocation, setNewGalleryLocation] = useState('');
  const [newGalleryDesc, setNewGalleryDesc] = useState('');
  const [newGalleryCover, setNewGalleryCover] = useState('');
  const [creating, setCreating] = useState(false);

  // QR Code modal
  const [selectedQR, setSelectedQR] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const fetchGalleries = async () => {
    try {
      setFetchingGalleries(true);
      const res = await fetch(`/api/v1/galleries?tenantId=${currentTenantId}`);
      const data = await res.json();
      if (data.success) {
        setGalleries(data.galleries || []);
      }
    } catch (err) {
      console.error('Failed to fetch galleries:', err);
    } finally {
      setFetchingGalleries(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [currentTenantId]);

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!newGalleryName.trim()) return;

    setCreating(true);
    try {
      const res = await fetch(`/api/v1/galleries?tenantId=${currentTenantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGalleryName,
          eventDate: newGalleryDate,
          location: newGalleryLocation,
          description: newGalleryDesc,
          coverUrl: newGalleryCover || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowCreateModal(false);
        setNewGalleryName('');
        setNewGalleryLocation('');
        setNewGalleryDesc('');
        setNewGalleryCover('');
        fetchGalleries();
      }
    } catch (err) {
      console.error('Failed to create gallery:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteGallery = async (galleryId) => {
    if (!confirm('Are you sure you want to delete this gallery?')) return;
    try {
      const res = await fetch(`/api/v1/galleries/${galleryId}?tenantId=${currentTenantId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchGalleries();
      }
    } catch (err) {
      console.error('Failed to delete gallery:', err);
    }
  };

  const openQRModal = async (gallery) => {
    setSelectedQR(gallery);
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const guestUrl = `${origin}/g/${gallery.slug}`;
    try {
      const dataUrl = await QRCode.toDataURL(guestUrl, { width: 320, margin: 2, color: { dark: '#000000', light: '#ffffff' } });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  };

  const copyGuestLink = () => {
    if (!selectedQR) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const guestUrl = `${origin}/g/${selectedQR.slug}`;
    navigator.clipboard.writeText(guestUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const storageUsedGB = (tenant?.storageUsedBytes ? tenant.storageUsedBytes / 1073741824 : 38.4).toFixed(1);
  const storageLimitGB = (tenant?.storageLimitBytes ? tenant.storageLimitBytes / 1073741824 : 100).toFixed(0);
  const storagePercent = Math.min(100, Math.round((storageUsedGB / storageLimitGB) * 100));

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex selection:bg-neutral-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800/80 bg-[#0A0A0B] flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          {/* Tenant Switcher */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs">
              M
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-tight">{tenant?.name || 'Studio'}</h2>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{tenant?.plan || 'Pro'} Plan</span>
            </div>
          </div>

          <div className="mb-6 p-2 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <label className="text-[10px] uppercase font-mono text-neutral-500 block mb-1">Active Tenant</label>
            <select
              value={currentTenantId}
              onChange={(e) => switchTenant(e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-200 focus:outline-none cursor-pointer"
            >
              <option value="tenant-luminary" className="bg-neutral-900">Luminary Wedding Studio</option>
              <option value="tenant-apex" className="bg-neutral-900">Apex Corporate Media</option>
              <option value="tenant-horizon" className="bg-neutral-900">Horizon Event Visuals</option>
            </select>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('galleries')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'galleries' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Galleries</span>
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'overview' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview & Stats</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'analytics' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Searches</span>
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === 'billing' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span>Storage & Plan</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Quota */}
        <div className="p-6 border-t border-neutral-800/80">
          <div className="flex justify-between text-xs text-neutral-400 mb-1.5">
            <span>Storage Used</span>
            <span>{storageUsedGB} / {storageLimitGB} GB</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all" style={{ width: `${storagePercent}%` }} />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-300">Home</Link>
            <Link href="/admin" className="hover:text-neutral-300">Admin</Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-neutral-800/80 px-6 flex items-center justify-between bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Tenant Dashboard</span>
            <span className="text-neutral-700">/</span>
            <span className="text-sm font-medium text-white capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-white text-black font-medium text-xs px-3.5 py-2 rounded-lg hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Gallery</span>
            </button>
          </div>
        </header>

        {/* Dashboard Views */}
        <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
          {/* ============================================================ */}
          {/* TAB: GALLERIES                                              */}
          {/* ============================================================ */}
          {activeTab === 'galleries' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-light text-white tracking-tight">Galleries</h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage your event albums, print QR access cards, and review AI facial indexing.
                  </p>
                </div>
              </div>

              {fetchingGalleries ? (
                <div className="py-20 text-center text-sm text-neutral-500">Loading galleries...</div>
              ) : galleries.length === 0 ? (
                <div className="py-20 border border-dashed border-neutral-800 rounded-2xl text-center p-8">
                  <Layers className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                  <h3 className="text-base font-medium text-white mb-1">No galleries created yet</h3>
                  <p className="text-xs text-neutral-400 mb-4 max-w-sm mx-auto">
                    Create your first gallery to upload photos and begin AI face indexing for your guests.
                  </p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-white text-black rounded-lg text-xs font-medium"
                  >
                    Create Gallery
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {galleries.map((gal) => (
                    <div
                      key={gal.id}
                      className="group p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Cover Image & Status Badge */}
                        <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-neutral-800">
                          <img
                            src={gal.coverUrl}
                            alt={gal.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${
                                gal.status === 'READY'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : gal.status === 'PROCESSING'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                              }`}
                            >
                              {gal.status}
                            </span>
                          </div>
                        </div>

                        {/* Title & Date */}
                        <div className="text-xs font-mono text-neutral-500 mb-1">
                          {new Date(gal.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="text-lg font-medium text-white tracking-tight mb-2">{gal.name}</h3>
                        {gal.location && (
                          <p className="text-xs text-neutral-400 mb-4">{gal.location}</p>
                        )}

                        {/* Metrics summary */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/80 text-xs text-neutral-400 mb-4">
                          <div>
                            <span className="text-white font-medium block">{gal.totalPhotos}</span>
                            <span className="text-[10px] text-neutral-500">Photos</span>
                          </div>
                          <div>
                            <span className="text-white font-medium block">{gal.facesDetected}</span>
                            <span className="text-[10px] text-neutral-500">Faces Found</span>
                          </div>
                          <div>
                            <span className="text-white font-medium block">{gal.processedPhotos}</span>
                            <span className="text-[10px] text-neutral-500">Indexed</span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/g/${gal.slug}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                            title="Open Public Guest View"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => openQRModal(gal)}
                            className="p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                            title="Generate QR Code"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/galleries/${gal.id}`}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            Upload & Manage
                          </Link>
                          <button
                            onClick={() => handleDeleteGallery(gal.id)}
                            className="p-2 text-neutral-500 hover:text-rose-400 transition-colors"
                            title="Delete Gallery"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: OVERVIEW & STATS                                        */}
          {/* ============================================================ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight">Studio Overview</h1>
                <p className="text-xs text-neutral-400 mt-1">Real-time usage and event activity for {tenant?.name}.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Galleries</span>
                  <span className="text-2xl font-light text-white">{galleries.length}</span>
                </div>
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Total Photos</span>
                  <span className="text-2xl font-light text-white">{tenant?.photosCount || 3840}</span>
                </div>
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">AI Face Searches</span>
                  <span className="text-2xl font-light text-white">{tenant?.aiSearchesCount || 1280}</span>
                </div>
                <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block mb-1">Storage</span>
                  <span className="text-2xl font-light text-white">{storageUsedGB} GB</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: ANALYTICS                                               */}
          {/* ============================================================ */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight">AI Face Matching Analytics</h1>
                <p className="text-xs text-neutral-400 mt-1">Guest discovery statistics and search performance.</p>
              </div>

              <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-sm font-medium text-white">Search Success Rate</span>
                  <span className="text-sm font-mono text-emerald-400">96.8%</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-sm font-medium text-white">Average Photos Found per Guest</span>
                  <span className="text-sm font-mono text-white">34 photos</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-sm font-medium text-white">Average Vector Match Latency</span>
                  <span className="text-sm font-mono text-white">410 ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Selfies Processed Ephemerally</span>
                  <span className="text-sm font-mono text-emerald-400">100% Discarded Post-Embedding</span>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB: BILLING & STORAGE                                       */}
          {/* ============================================================ */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight">Subscription & Limits</h1>
                <p className="text-xs text-neutral-400 mt-1">Tenant plan allocation, storage limits, and features.</p>
              </div>

              <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Active Plan</span>
                    <h3 className="text-2xl font-medium text-white mt-1">{tenant?.plan || 'Pro'} Studio</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Cloudflare R2 Storage Quota</span>
                    <span className="text-white font-mono">{storageUsedGB} / {storageLimitGB} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly AI Face Discoveries</span>
                    <span className="text-white font-mono">Unlimited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Photos per Gallery</span>
                    <span className="text-white font-mono">10,000 photos</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* CREATE GALLERY MODAL                                         */}
      {/* ============================================================ */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F0F11] border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-lg font-medium text-white mb-1">Create New Gallery</h2>
            <p className="text-xs text-neutral-400 mb-5">Set up an event gallery for your photography clients.</p>

            <form onSubmit={handleCreateGallery} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Gallery / Event Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya & Daniel Wedding"
                  value={newGalleryName}
                  onChange={(e) => setNewGalleryName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={newGalleryDate}
                    onChange={(e) => setNewGalleryDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Tuscany, Italy"
                    value={newGalleryLocation}
                    onChange={(e) => setNewGalleryLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Cover Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newGalleryCover}
                  onChange={(e) => setNewGalleryCover(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* QR CODE MODAL                                                */}
      {/* ============================================================ */}
      {selectedQR && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0F0F11] border border-neutral-800 rounded-2xl p-6 text-center shadow-2xl">
            <h3 className="text-base font-medium text-white mb-1">Event Guest QR Code</h3>
            <p className="text-xs text-neutral-400 mb-4">{selectedQR.name}</p>

            {qrDataUrl && (
              <div className="p-4 bg-white rounded-xl inline-block mx-auto mb-4 shadow-md">
                <img src={qrDataUrl} alt="Gallery QR Code" className="w-56 h-56 mx-auto" />
              </div>
            )}

            <p className="text-[11px] text-neutral-500 mb-4">
              Guests scan this QR with their phone camera to instantly search their photos.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                readOnly
                value={typeof window !== 'undefined' ? `${window.location.origin}/g/${selectedQR.slug}` : ''}
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-300 select-all"
              />
              <button
                onClick={copyGuestLink}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                title="Copy Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800">
              <a
                href={qrDataUrl}
                download={`${selectedQR.slug}-qr-code.png`}
                className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PNG</span>
              </a>
              <button
                onClick={() => setSelectedQR(null)}
                className="px-4 py-2 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
