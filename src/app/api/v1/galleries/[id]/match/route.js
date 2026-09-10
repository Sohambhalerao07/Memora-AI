// src/app/api/v1/galleries/[id]/match/route.js
import { NextResponse } from 'next/server';
import { matchGuestSelfie } from '@/lib/ai';

export async function POST(request, context) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const body = await request.json();
    const { selfie } = body;

    if (!selfie) {
      return NextResponse.json({ error: 'Selfie image data is required' }, { status: 400 });
    }

    // Run scoped face similarity search
    const result = await matchGuestSelfie(id, selfie);

    return NextResponse.json({
      success: true,
      matches: result.matches,
      totalSearched: result.totalSearched,
      searchTimeMs: result.searchTimeMs,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
