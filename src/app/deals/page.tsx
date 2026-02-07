import { Metadata } from 'next';
import Link from 'next/link';
import { getActiveDeals } from '@/lib/affiliate';
import { DealBadge, AffiliateButton } from '@/components/affiliate';

export const metadata: Metadata = {
  title: 'Deals & Coupons | Hocit Blog',
  description: 'Khám phá các deal hot và mã giảm giá tốt nhất cho developer tools và courses',
  openGraph: {
    title: 'Deals & Coupons',
    description: 'Các deal hot và mã giảm giá tốt nhất',
  },
};

export default function DealsPage() {
  const deals = getActiveDeals();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
            🔥 HOT DEALS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Deals & Mã giảm giá
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tiết kiệm tiền với các deal độc quyền và mã giảm giá cho 
            developer tools, courses và software
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
              {deals.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Deals đang hoạt động
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              70%
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Giảm giá tối đa
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              $100+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Tiết kiệm trung bình
            </div>
          </div>
        </div>

        {/* Deals List */}
        {deals.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Chưa có deal nào đang hoạt động
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hãy quay lại sau để cập nhật các deal mới nhất
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal, index) => {
              const affiliateUrl = deal.affiliateLink.startsWith('http')
                ? deal.affiliateLink
                : `/go/${deal.affiliateLink}`;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    {/* Deal Badge */}
                    <div className="mb-4">
                      <DealBadge
                        discount={deal.discount}
                        code={deal.code}
                        endDate={deal.endDate}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {deal.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {deal.description}
                    </p>

                    {/* CTA */}
                    <AffiliateButton
                      href={affiliateUrl}
                      text="Nhận deal ngay"
                      size="md"
                      className="w-full"
                      trackingId={`deal-${index}`}
                    />

                    {/* Expiry Info */}
                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                      Hết hạn: {new Date(deal.endDate).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            📧 Đăng ký nhận thông báo Deal mới
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Nhận thông báo ngay khi có deal hot và mã giảm giá độc quyền
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="bg-white text-brand-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>

        {/* Browse Products CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>Xem tất cả sản phẩm</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
