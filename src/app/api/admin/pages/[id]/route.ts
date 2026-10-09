import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const page = await prisma.pageContent.findUnique({
      where: { id },
    });
    
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }
    
    return NextResponse.json({ page });
  } catch (error) {
    console.error('Failed to fetch page:', error);
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    const page = await prisma.pageContent.update({
      where: { id },
      data: {
        title: data.title,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        content: data.content,
      },
    });
    
    return NextResponse.json({ page });
  } catch (error) {
    console.error('Failed to update page:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}
