// src/app/api/v1/galleries/route.js
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId') || 'tenant-luminary';

    // Verify tenant exists server-side
    const tenant = await store.getTenantById(tenantId);
    if (!tenant) {
      return NextResponse.json({ error: 'Unauthorized or invalid tenant' }, { status: 401 });
    }

    const galleries = await store.getGalleries(tenantId);
    return NextResponse.json({ success: true, galleries });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId') || 'tenant-luminary';

    const tenant = await store.getTenantById(tenantId);
    if (!tenant) {
      return NextResponse.json({ error: 'Unauthorized or invalid tenant' }, { status: 401 });
    }

    const body = await request.json();
    const { name, eventDate, location, description, coverUrl } = body;

    if (!name) {
      return NextResponse.json({ error: 'Gallery name is required' }, { status: 400 });
    }

    const gallery = await store.createGallery(tenantId, {
      name,
      eventDate,
      location,
      description,
      coverUrl,
    });

    return NextResponse.json({ success: true, gallery }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
