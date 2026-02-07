'use client';

import ProductCard from './ProductCard';
import type { Product } from '@/lib/affiliate-types';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  layout?: 'grid' | 'list';
  title?: string;
  description?: string;
}

export default function ProductGrid({ 
  products, 
  columns = 3,
  layout = 'grid',
  title,
  description 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Không tìm thấy sản phẩm nào
        </p>
      </div>
    );
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description) && (
        <div className="text-center">
          {title && (
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Products */}
      {layout === 'list' ? (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              layout="list"
            />
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              layout="grid"
            />
          ))}
        </div>
      )}
    </div>
  );
}
