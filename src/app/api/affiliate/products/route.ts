import { NextResponse } from 'next/server';
import { getAllProducts, getFeaturedProducts, getProductsByCategory } from '@/lib/affiliate';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');
  const category = searchParams.get('category');
  
  try {
    let products;
    
    if (featured === 'true') {
      products = getFeaturedProducts();
    } else if (category) {
      products = getProductsByCategory(category);
    } else {
      products = getAllProducts();
    }
    
    return NextResponse.json({
      products,
      total: products.length,
    });
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json(
      { error: 'Failed to get products' },
      { status: 500 }
    );
  }
}
