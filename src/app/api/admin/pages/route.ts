import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const pages = await prisma.pageContent.findMany({
      orderBy: { title: 'asc' },
    });
    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}
