import { NextRequest, NextResponse } from 'next/server';
import { getAffiliateLink, trackClick, hashIP, detectDevice } from '@/lib/affiliate';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  // Get the affiliate link
  const link = getAffiliateLink(slug);
  
  if (!link) {
    return NextResponse.json(
      { error: 'Affiliate link not found' },
      { status: 404 }
    );
  }
  
  // Track the click
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || undefined;
    
    trackClick({
      linkSlug: slug,
      timestamp: new Date().toISOString(),
      ipHash: hashIP(ip),
      userAgent: userAgent,
      referrer: referrer,
      device: detectDevice(userAgent),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
    // Continue with redirect even if tracking fails
  }
  
  // Redirect to the affiliate URL
  return NextResponse.redirect(link.targetUrl, {
    status: 302, // Temporary redirect
  });
}

// Handle POST requests (for JavaScript-based tracking)
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  // Get the affiliate link
  const link = getAffiliateLink(slug);
  
  if (!link) {
    return NextResponse.json(
      { error: 'Affiliate link not found' },
      { status: 404 }
    );
  }
  
  // Track the click with additional client-side data
  try {
    const body = await request.json();
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    trackClick({
      linkSlug: slug,
      timestamp: new Date().toISOString(),
      ipHash: hashIP(ip),
      userAgent: userAgent,
      referrer: body.referrer,
      device: body.device || detectDevice(userAgent),
    });
  } catch (error) {
    console.error('Error tracking click:', error);
  }
  
  // Return the target URL for client-side redirect
  return NextResponse.json({
    success: true,
    targetUrl: link.targetUrl,
  });
}
