import { NextResponse } from 'next/server';
import { getActiveDeals } from '@/lib/affiliate';

export async function GET() {
  try {
    const deals = getActiveDeals();
    
    return NextResponse.json({
      deals,
      total: deals.length,
    });
  } catch (error) {
    console.error('Error getting deals:', error);
    return NextResponse.json(
      { error: 'Failed to get deals' },
      { status: 500 }
    );
  }
}
