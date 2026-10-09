import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

/**
 * GET /api/solutions/published
 * 
 * Returns all published solutions (for public navigation)
 */
export async function GET() {
  try {
    const solutions = await prisma.solution.findMany({
      where: { isDraft: false },
      select: {
        title: true,
        slug: true,
        metaDescription: true,
      },
      orderBy: { title: 'asc' },
    });

    return NextResponse.json({ solutions }, { status: 200 });
  } catch (error) {
    console.error('[API] Error fetching published solutions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch solutions' },
      { status: 500 }
    );
  }
}
