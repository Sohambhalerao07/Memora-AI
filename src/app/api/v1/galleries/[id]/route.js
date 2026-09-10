// src/app/api/v1/galleries/[id]/route.js
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

    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    // If request has tenantId, enforce that it matches gallery owner
    if (tenantId && gallery.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Access denied: Gallery belongs to another tenant' }, { status: 403 });
    }

    const photos = await store.getPhotos(gallery.id);
    const clusters = await store.getPersonClusters(gallery.id);

    return NextResponse.json({
      success: true,
      gallery,
      photos,
      clusters,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
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

    // Strict tenant isolation check
    if (gallery.tenantId !== tenantId) {
      return NextResponse.json({ error: 'Forbidden: You cannot delete another tenant\'s gallery' }, { status: 403 });
    }

    await store.deleteGallery(tenantId, gallery.id);
    return NextResponse.json({ success: true, message: 'Gallery deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
