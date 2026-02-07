import { NextRequest, NextResponse } from 'next/server';
import { getClickStats } from '@/lib/affiliate';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  try {
    const stats = getClickStats(slug);
    
    return NextResponse.json({
      slug,
      stats,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}
