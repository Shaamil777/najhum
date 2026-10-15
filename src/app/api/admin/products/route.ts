import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
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
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
