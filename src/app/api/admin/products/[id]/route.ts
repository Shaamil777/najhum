import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { deleteFromR2 } from '@/lib/storage/r2';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl || null,
        brochureUrl: data.brochureUrl || null,
        platforms: data.platforms || [],
        solutions: data.solutions || [],
        features: data.features || [],
        details: data.details || {},
        isDraft: Boolean(data.isDraft),
        order: typeof data.order === 'number' ? data.order : (parseInt(data.order, 10) || 0),
      },
    });
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Clean up R2 storage assets if configured
    const publicUrl = process.env.R2_PUBLIC_URL || '';
    if (publicUrl) {
      if (existing.imageUrl && existing.imageUrl.startsWith(publicUrl)) {
        const key = existing.imageUrl.replace(`${publicUrl}/`, '');
        try {
          await deleteFromR2(key);
        } catch (e) {
          console.warn('Could not delete image from R2:', e);
        }
      }
      if (existing.brochureUrl && existing.brochureUrl.startsWith(publicUrl)) {
        const key = existing.brochureUrl.replace(`${publicUrl}/`, '');
        try {
          await deleteFromR2(key);
        } catch (e) {
          console.warn('Could not delete brochure from R2:', e);
        }
      }
    }

    await prisma.product.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
