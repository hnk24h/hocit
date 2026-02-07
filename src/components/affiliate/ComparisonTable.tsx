'use client';

import Image from 'next/image';
import RatingStars from './RatingStars';
import AffiliateButton from './AffiliateButton';
import { formatPrice, type Product } from '@/lib/affiliate-types';

interface ComparisonTableProps {
  products: Product[];
  features: string[];
  featureData: { [productSlug: string]: { [feature: string]: string | boolean } };
}

export default function ComparisonTable({ products, features, featureData }: ComparisonTableProps) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-4 text-left font-bold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600 sticky left-0 bg-gray-100 dark:bg-gray-700 z-10">
              So sánh
            </th>
            {products.map((product) => (
              <th key={product.slug} className="p-4 text-center min-w-[200px]">
                <div className="flex flex-col items-center gap-2">
                  {product.image && (
                    <div className="relative w-20 h-20">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="font-bold text-gray-900 dark:text-white">
                    {product.name}
                  </div>
                  {product.rating && (
                    <RatingStars rating={product.rating} size="sm" showNumber />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Price */}
          <tr className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <td className="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600 sticky left-0 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              Giá
            </td>
            {products.map((product) => (
              <td key={product.slug} className="p-4 text-center">
                <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {product.price ? formatPrice(product.price, product.currency) : 'N/A'}
                </span>
              </td>
            ))}
          </tr>

          {/* Features */}
          {features.map((feature, idx) => (
            <tr
              key={feature}
              className={`border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50`}
            >
              <td className="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600 sticky left-0 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {feature}
              </td>
              {products.map((product) => {
                const value = featureData[product.slug]?.[feature];
                return (
                  <td key={product.slug} className="p-4 text-center">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">{value || '-'}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}

          {/* Action buttons */}
          <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
            <td className="p-4 font-semibold text-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-600 sticky left-0 bg-gray-50 dark:bg-gray-700/50">
              Hành động
            </td>
            {products.map((product) => {
              const affiliateUrl = product.affiliateLink.startsWith('http')
                ? product.affiliateLink
                : `/go/${product.affiliateLink}`;
              return (
                <td key={product.slug} className="p-4 text-center">
                  <AffiliateButton
                    href={affiliateUrl}
                    text="Xem chi tiết"
                    size="sm"
                    trackingId={product.slug}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
