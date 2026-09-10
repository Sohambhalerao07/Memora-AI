// src/app/dashboard/galleries/[id]/page.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  UploadCloud,
  Layers,
  Sparkles,
  Users,
  CheckCircle2,
  Clock,
  ExternalLink,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';

export default function GalleryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const galleryId = params?.id;
  const { currentTenantId } = useTenant();

  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'faces'

  const fileInputRef = useRef(null);

  const fetchGalleryDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/v1/galleries/${galleryId}?tenantId=${currentTenantId}`);
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery);
        setPhotos(data.photos || []);
        setClusters(data.clusters || []);
      }
    } catch (err) {
      console.error('Error loading gallery details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (galleryId) {
      fetchGalleryDetails();
    }
  }, [galleryId, currentTenantId]);

  // Status polling when PROCESSING
  useEffect(() => {
    let interval = null;
    if (gallery?.status === 'PROCESSING') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/v1/galleries/${galleryId}/status`);
          const data = await res.json();
          if (data.success) {
            setGallery((prev) => ({
              ...prev,
              status: data.galleryStatus,
              totalPhotos: data.totalPhotos,
              processedPhotos: data.processedPhotos,
              facesDetected: data.facesDetected,
            }));
            if (data.galleryStatus === 'READY') {
              clearInterval(interval);
              fetchGalleryDetails();
            }
          }
        } catch (e) {
          console.warn('Status poll failed:', e);
        }
      }, 1500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gallery?.status, galleryId]);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (droppedFiles.length > 0) {
      uploadBatch(droppedFiles);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []).filter((f) => f.type.startsWith('image/'));
    if (selectedFiles.length > 0) {
      uploadBatch(selectedFiles);
    }
  };

  const uploadBatch = async (fileList) => {
    setIsUploading(true);
    setUploadProgress(15);
    setUploadMessage(`Uploading ${fileList.length} photo(s) to storage...`);

    // Prepare simulated preview uploads
    const payload = fileList.map((file, idx) => ({
      url: URL.createObjectURL(file),
      thumbnailUrl: URL.createObjectURL(file),
      filename: file.name,
      facesCount: (idx % 3) + 1,
      personIds: ['cluster-guest-01', 'cluster-guest-02'],
    }));

    try {
      setUploadProgress(60);
      const res = await fetch(`/api/v1/galleries/${galleryId}/photos?tenantId=${currentTenantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: payload }),
      });

      const data = await res.json();
      if (res.status === 202) {
        setUploadProgress(100);
        setUploadMessage('Photos accepted! Asynchronous AI facial indexing started.');
        setGallery((prev) => ({ ...prev, status: 'PROCESSING' }));
        setTimeout(() => {
          setIsUploading(false);
          fetchGalleryDetails();
        }, 800);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadMessage('Upload failed. Check network.');
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center text-neutral-400">
        Loading gallery details...
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center text-neutral-400 p-6">
        <p className="mb-4">Gallery not found or unauthorized.</p>
        <Link href="/dashboard" className="text-white underline">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex flex-col selection:bg-neutral-800">
      {/* Top Bar */}
      <header className="h-16 border-b border-neutral-800/80 px-6 flex items-center justify-between bg-[#0A0A0B] sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-sm font-medium text-white">{gallery.name}</span>
          <span
            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
              gallery.status === 'READY'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
            }`}
          >
            {gallery.status}
          </span>
        </div>

        <Link
          href={`/g/${gallery.slug}`}
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors shadow-sm"
        >
          <span>Open Guest View</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-6 space-y-6">
        {/* Background Processing Notification */}
        {gallery.status === 'PROCESSING' && (
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400 animate-spin" />
              <div>
                <h4 className="text-xs font-medium text-amber-300">Asynchronous AI Face Indexing Active</h4>
                <p className="text-[11px] text-amber-400/80">
                  Processing photos: {gallery.processedPhotos} / {gallery.totalPhotos} complete ({gallery.facesDetected} faces detected)
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-300 animate-pulse">Running DeepFace pipeline...</span>
          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 rounded-2xl p-8 text-center transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
          <UploadCloud className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-white mb-1">
            Drop high-resolution photos here to upload
          </h3>
          <p className="text-xs text-neutral-500 mb-4 max-w-sm mx-auto">
            Supports hundreds of photos at once. Photos are asynchronously scanned by DeepFace for guest selfie discovery.
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-medium transition-colors"
          >
            Select Photos from Computer
          </button>
        </div>

        {/* Live Upload Progress */}
        {isUploading && (
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-xs">
            <div className="flex justify-between mb-1 text-neutral-300">
              <span>{uploadMessage}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        )}

        {/* Tabs: Photos & Face Index */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-1 transition-colors border-b-2 ${
                activeTab === 'photos'
                  ? 'border-white text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Uploaded Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveTab('faces')}
              className={`pb-1 transition-colors border-b-2 ${
                activeTab === 'faces'
                  ? 'border-white text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              People / Face Index ({clusters.length})
            </button>
          </div>
        </div>

        {/* TAB 1: Photos Grid */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900"
              >
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-[11px] text-neutral-300">
                  <span className="truncate font-medium">{photo.filename}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {photo.facesCount} face(s) indexed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Face Index / Clusters */}
        {activeTab === 'faces' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {clusters.map((cluster) => (
              <div
                key={cluster.id}
                className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-neutral-700 bg-neutral-800">
                  <img src={cluster.avatarUrl} alt={cluster.label} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xs font-medium text-white truncate max-w-full mb-1">{cluster.label}</h4>
                <span className="text-[10px] font-mono text-neutral-500">{cluster.photoCount} photos in gallery</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
