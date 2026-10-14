import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { getBuilderSession, saveBuilderDocument, discardBuilderDraft } from '@/lib/builder/server';
import { handleApiError, apiErrors } from '@/lib/utils/api-error';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';

type Context = { params: Promise<{ id: string }> };
const json = (value: unknown) => NextResponse.json(value, { headers: { 'Cache-Control': 'no-store' } });

export async function GET(request: NextRequest, context: Context) {
  try {
    await requireAdmin(request);
    return json(await getBuilderSession((await context.params).id));
  } catch (error) { return handleApiError(error); }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    await requireAdmin(request);
    requireSameOrigin(request);
    const body = await request.text();
    if (body.length > 1024 * 1024) throw apiErrors.badRequest('This page is too large to save.');
    let input: unknown;
    try { input = JSON.parse(body); } catch { throw apiErrors.badRequest('Invalid JSON.'); }
    const session = await saveBuilderDocument((await context.params).id, input);
    revalidateSolutions(session.oldSlug);
    revalidateSolutions(session.document.slug);
    return json(session);
  } catch (error) { return handleApiError(error); }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await requireAdmin(request);
    requireSameOrigin(request);
    const { version } = z.object({ version: z.number().int().min(0) }).parse(await request.json());
    return json(await discardBuilderDraft((await context.params).id, version));
  } catch (error) { return handleApiError(error); }
}
