// src/app/api/v1/galleries/[id]/photos/route.js
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function POST(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId') || 'tenant-luminary';

    const gallery = await store.getGalleryById(id);
    if (!gallery) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    // Tenant isolation verification
    if (gallery.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Forbidden: Unauthorized tenant access' }, { status: 403 });
    }

    const body = await request.json();
    const { photos } = body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json({ error: 'No photos provided for upload' }, { status: 400 });
    }

    // Add photos to the gallery
    const addedPhotos = await store.addPhotos(tenantId, gallery.id, photos);

    // Trigger asynchronous AI processing background job
    const job = await store.queueProcessingJob(tenantId, gallery.id, photos.length);

    // 202 Accepted: Asynchronous job started
    return NextResponse.json(
      {
        success: true,
        message: `Accepted ${addedPhotos.length} photo(s) for AI processing`,
        uploadedPhotos: addedPhotos,
        processingJob: job,
      },
      { status: 202 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
