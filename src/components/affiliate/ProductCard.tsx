'use client';

import Image from 'next/image';
import Link from 'next/link';
import RatingStars from './RatingStars';
import AffiliateButton from './AffiliateButton';
import { formatPrice } from '@/lib/affiliate-types';

interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    description: string;
    image?: string;
    price?: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    affiliateLink: string;
    category?: string;
    featured?: boolean;
  };
  layout?: 'grid' | 'list';
  showDescription?: boolean;
}

export default function ProductCard({ 
  product, 
  layout = 'grid',
  showDescription = true 
}: ProductCardProps) {
  const affiliateUrl = product.affiliateLink.startsWith('http') 
    ? product.affiliateLink 
    : `/go/${product.affiliateLink}`;

  const imageUrl = product.image || '/images/placeholder-product.jpg';
  const displayPrice = product.price ? formatPrice(product.price, product.currency) : null;

  if (layout === 'list') {
    return (
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Image */}
        <div className="relative sm:w-48 h-48 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <Link href={`/products/${product.slug}`} className="group">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {product.name}
              </h3>
            </Link>

            {product.category && (
              <span className="inline-block text-xs text-brand-600 dark:text-brand-400 font-medium mb-2">
                {product.category}
              </span>
            )}

            {product.rating && (
              <div className="mb-2">
                <RatingStars 
                  rating={product.rating} 
                  showNumber 
                  reviewCount={product.reviewCount}
                  size="sm"
                />
              </div>
            )}

            {showDescription && (
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {displayPrice && (
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayPrice}
              </div>
            )}
            <AffiliateButton
              href={affiliateUrl}
              text="Xem chi tiết"
              size="sm"
              trackingId={product.slug}
            />
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          {product.category && (
            <span className="inline-block text-xs text-brand-600 dark:text-brand-400 font-medium mb-2">
              {product.category}
            </span>
          )}

          <Link href={`/products/${product.slug}`} className="group">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {product.rating && (
            <div className="mb-2">
              <RatingStars 
                rating={product.rating} 
                showNumber 
                reviewCount={product.reviewCount}
                size="sm"
              />
            </div>
          )}

          {showDescription && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-auto">
          {displayPrice && (
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {displayPrice}
            </div>
          )}
          <AffiliateButton
            href={affiliateUrl}
            text="Xem chi tiết"
            size="sm"
            className="w-full"
            trackingId={product.slug}
          />
        </div>
      </div>
    </div>
  );
}
