// src/app/api/v1/galleries/[id]/status/route.js
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const gallery = await store.getGalleryById(id);
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    const job = await store.getJobStatus(gallery.id);

    return NextResponse.json({
      success: true,
      galleryStatus: gallery.status,
      totalPhotos: gallery.totalPhotos,
      processedPhotos: gallery.processedPhotos,
      facesDetected: gallery.facesDetected,
      activeJob: job,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
