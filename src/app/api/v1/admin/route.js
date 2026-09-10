// src/app/api/v1/admin/route.js
import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  try {
    const metrics = await store.getPlatformMetrics();
    const tenants = await store.getTenants();

    return NextResponse.json({
      success: true,
      metrics,
      tenants,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { tenantId, status, plan, storageLimitBytes } = body;

    if (!tenantId) {
      return NextResponse.json({ error: 'tenantId is required' }, { status: 400 });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (plan !== undefined) updates.plan = plan;
    if (storageLimitBytes !== undefined) updates.storageLimitBytes = storageLimitBytes;

    const updated = await store.updateTenant(tenantId, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, tenant: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
