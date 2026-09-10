// src/app/g/[slug]/page.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Camera, Sparkles, Download, Heart, ArrowLeft, RefreshCw, X, Check, Image as ImageIcon, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import JSZip from 'jszip';

export default function GuestGalleryPage() {
  const params = useParams();
  const slug = params?.slug || 'rhea-akash';

  const [gallery, setGallery] = useState(null);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Guest discovery states: 'LANDING' | 'CAMERA' | 'SCANNING' | 'RESULTS' | 'BROWSE_ALL'
  const [viewState, setViewState] = useState('LANDING');
  const [matchedPhotos, setMatchedPhotos] = useState([]);
  const [searchStats, setSearchStats] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null); // for lightbox
  const [favorites, setFavorites] = useState(new Set());
  const [downloadingZip, setDownloadingZip] = useState(false);

  // Camera stream refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraFacing, setCameraFacing] = useState('user'); // 'user' or 'environment'
  const [cameraError, setCameraError] = useState(null);

  // Load gallery data
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/galleries/${slug}`);
        const data = await res.json();
        if (data.success) {
          setGallery(data.gallery);
          setAllPhotos(data.photos || []);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  // Start camera when entering CAMERA state
  useEffect(() => {
    if (viewState === 'CAMERA') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [viewState, cameraFacing]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraFacing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Unable to access camera directly. You can upload a selfie from your device instead.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const flipCamera = () => {
    setCameraFacing((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Capture selfie and trigger AI matching
  const handleCapture = () => {
    let capturedBase64 = null;
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      capturedBase64 = canvas.toDataURL('image/jpeg', 0.85);
    }
    stopCamera();
    runAIMatching(capturedBase64 || 'captured_selfie');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      stopCamera();
      runAIMatching(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const runAIMatching = async (selfieData) => {
    setViewState('SCANNING');
    try {
      const res = await fetch(`/api/v1/galleries/${gallery?.id || slug}/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selfie: selfieData }),
      });
      const data = await res.json();
      if (data.success) {
        setMatchedPhotos(data.matches || []);
        setSearchStats({
          count: data.matches?.length || 0,
          timeMs: data.searchTimeMs || 420,
        });
        setViewState('RESULTS');
      } else {
        setViewState('RESULTS');
      }
    } catch (err) {
      console.error('Match error:', err);
      setViewState('RESULTS');
    }
  };

  const toggleFavorite = (photoId) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
  };

  const downloadSinglePhoto = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || 'memora-photo.jpg';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Download failed', err);
      window.open(url, '_blank');
    }
  };

  const downloadAllMatched = async () => {
    setDownloadingZip(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(`${gallery?.name || 'Memora'}_My_Photos`);

      const promises = matchedPhotos.map(async (photo, idx) => {
        try {
          const res = await fetch(photo.url);
          const blob = await res.blob();
          folder.file(`photo_${idx + 1}.jpg`, blob);
        } catch (e) {
          console.warn('Failed to fetch photo for zip:', photo.url);
        }
      });

      await Promise.all(promises);
      const content = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(content);
      a.download = `${gallery?.slug || 'memora'}_matched_photos.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Zip generation failed:', err);
    } finally {
      setDownloadingZip(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center text-neutral-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
          <span className="text-sm font-light">Loading gallery...</span>
        </div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center text-neutral-300 p-6 text-center">
        <h2 className="text-xl font-medium text-white mb-2">Gallery Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6">This event link may be invalid or has expired.</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-neutral-800 text-white rounded-lg text-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex flex-col selection:bg-neutral-800">
      {/* ============================================================ */}
      {/* 1. GALLERY LANDING SCREEN                                    */}
      {/* ============================================================ */}
      {viewState === 'LANDING' && (
        <div className="flex-1 flex flex-col">
          {/* Hero Cover Header */}
          <div className="relative h-[48vh] sm:h-[55vh] w-full overflow-hidden bg-neutral-900">
            <img
              src={gallery.coverUrl}
              alt={gallery.name}
              className="w-full h-full object-cover object-center filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/40 to-transparent" />

            {/* Event Details Overlay */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 max-w-4xl mx-auto flex flex-col">
              <div className="inline-flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-neutral-300">
                <span>Event Gallery</span>
                <span>&bull;</span>
                <span>{new Date(gallery.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
                {gallery.name}
              </h1>
              {gallery.location && (
                <p className="text-neutral-400 text-sm mt-1">{gallery.location}</p>
              )}
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex-1 max-w-xl mx-auto w-full px-6 py-8 flex flex-col items-center justify-center text-center">
            <p className="text-neutral-400 text-sm sm:text-base font-light mb-8 max-w-md">
              Skip scrolling through thousands of photos. Take a selfie to instantly reveal every picture you appear in.
            </p>

            <button
              onClick={() => setViewState('CAMERA')}
              className="w-full max-w-sm flex items-center justify-center gap-3 bg-white text-black font-medium py-4 px-6 rounded-2xl text-base shadow-xl hover:bg-neutral-200 transition-all active:scale-[0.98]"
            >
              <Camera className="w-5 h-5" />
              <span>Find My Photos</span>
            </button>

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setViewState('BROWSE_ALL')}
                className="text-xs text-neutral-400 hover:text-white transition-colors py-2 px-3 rounded-lg flex items-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Browse all {allPhotos.length} photos</span>
              </button>
            </div>

            <div className="mt-12 text-[11px] text-neutral-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>Biometric privacy: Your selfie is processed in memory and never saved.</span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. SELFIE CAPTURE SCREEN                                     */}
      {/* ============================================================ */}
      {viewState === 'CAMERA' && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Camera Header */}
          <div className="p-4 flex items-center justify-between z-10">
            <button
              onClick={() => setViewState('LANDING')}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/60 backdrop-blur-md"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-light text-neutral-200">Take a quick selfie</span>
            <button
              onClick={flipCamera}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900/60 backdrop-blur-md"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Viewfinder with Oval Guide */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Oval Face Guide Overlay */}
            <div className="relative z-10 w-64 h-80 rounded-[50%] border-2 border-dashed border-white/60 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] pointer-events-none flex flex-col items-center justify-end pb-6">
              <span className="text-xs text-white/90 font-light bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                Position your face inside
              </span>
            </div>

            {cameraError && (
              <div className="absolute inset-x-6 top-20 z-20 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-center">
                <p className="text-xs text-neutral-300 mb-3">{cameraError}</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium rounded-lg cursor-pointer">
                  <ImageIcon className="w-4 h-4" />
                  <span>Choose from Photos</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            )}
          </div>

          {/* Bottom Capture Controls */}
          <div className="p-8 pb-12 flex items-center justify-around z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
            {/* File upload alternative */}
            <label className="p-3 text-neutral-400 hover:text-white rounded-full bg-neutral-900/80 cursor-pointer">
              <ImageIcon className="w-5 h-5" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>

            {/* Shutter Button */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 rounded-full border-4 border-white p-1 flex items-center justify-center transition-transform active:scale-95 shadow-2xl"
            >
              <div className="w-full h-full rounded-full bg-white hover:bg-neutral-200" />
            </button>

            <div className="w-11" /> {/* spacing placeholder */}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. AI MATCHING / SCANNING SCREEN                             */}
      {/* ============================================================ */}
      {viewState === 'SCANNING' && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-28 h-28 rounded-full border border-neutral-800 flex items-center justify-center animate-pulse">
              <div className="w-20 h-20 rounded-full border border-neutral-700 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-white/5 animate-ping" />
          </div>

          <h3 className="text-xl font-light text-white mb-2">Finding your photos...</h3>
          <p className="text-sm text-neutral-400 font-light max-w-xs leading-relaxed">
            Scanning the gallery for your memories. This takes just a moment.
          </p>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. RESULTS SCREEN (MATCHED PHOTOS)                           */}
      {/* ============================================================ */}
      {viewState === 'RESULTS' && (
        <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Search Complete</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                {matchedPhotos.length > 0 ? `${matchedPhotos.length} photos found of you` : 'No matching photos found'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewState('CAMERA')}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Another Selfie</span>
              </button>

              {matchedPhotos.length > 0 && (
                <button
                  onClick={downloadAllMatched}
                  disabled={downloadingZip}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingZip ? 'Packaging ZIP...' : 'Download All (.zip)'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Photos Grid */}
          {matchedPhotos.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto">
              <p className="text-neutral-400 text-sm mb-6">
                We could not find a clear match. Try capturing another selfie with better lighting or facing directly forward.
              </p>
              <button
                onClick={() => setViewState('CAMERA')}
                className="px-5 py-2.5 bg-white text-black font-medium text-sm rounded-xl"
              >
                Retake Selfie
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
              {matchedPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 cursor-pointer"
                  onClick={() => setActivePhotoIndex(idx)}
                >
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt="Found memory"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        {photo.matchConfidence}% Match
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(photo.id);
                        }}
                        className="p-1.5 rounded-full bg-black/50 text-white hover:text-rose-400"
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.has(photo.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadSinglePhoto(photo.url, photo.filename);
                      }}
                      className="w-full py-1.5 bg-white/90 hover:bg-white text-black text-xs font-medium rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. BROWSE ALL PHOTOS VIEW                                    */}
      {/* ============================================================ */}
      {viewState === 'BROWSE_ALL' && (
        <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewState('LANDING')}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-light text-white">All Event Photos</h2>
                <span className="text-xs text-neutral-400">{allPhotos.length} total photos</span>
              </div>
            </div>

            <button
              onClick={() => setViewState('CAMERA')}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium text-xs rounded-xl"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Find My Photos</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {allPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 cursor-pointer"
                onClick={() => {
                  setMatchedPhotos(allPhotos);
                  setActivePhotoIndex(idx);
                }}
              >
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt="Gallery photo"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FULLSCREEN LIGHTBOX MODAL                                    */}
      {/* ============================================================ */}
      {activePhotoIndex !== null && matchedPhotos[activePhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col">
          {/* Lightbox Bar */}
          <div className="p-4 flex items-center justify-between z-10">
            <span className="text-xs font-mono text-neutral-400">
              {activePhotoIndex + 1} / {matchedPhotos.length}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(matchedPhotos[activePhotoIndex].id)}
                className="p-2 rounded-full bg-neutral-900 text-white hover:text-rose-400"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.has(matchedPhotos[activePhotoIndex].id) ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
              </button>
              <button
                onClick={() =>
                  downloadSinglePhoto(
                    matchedPhotos[activePhotoIndex].url,
                    matchedPhotos[activePhotoIndex].filename
                  )
                }
                className="p-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full-res Photo Container */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <img
              src={matchedPhotos[activePhotoIndex].url}
              alt="Full view"
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation Arrows */}
            {activePhotoIndex > 0 && (
              <button
                onClick={() => setActivePhotoIndex((prev) => prev - 1)}
                className="absolute left-6 p-3 rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {activePhotoIndex < matchedPhotos.length - 1 && (
              <button
                onClick={() => setActivePhotoIndex((prev) => prev + 1)}
                className="absolute right-6 p-3 rounded-full bg-black/60 text-white hover:bg-black/90"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
