'use client';

interface AffiliateDisclosureProps {
  variant?: 'banner' | 'inline' | 'footer';
  className?: string;
}

export default function AffiliateDisclosure({ 
  variant = 'banner',
  className = '' 
}: AffiliateDisclosureProps) {
  if (variant === 'inline') {
    return (
      <p className={`text-sm text-gray-600 dark:text-gray-400 italic ${className}`}>
        <strong>Lưu ý:</strong> Bài viết này có chứa liên kết affiliate. 
        Chúng tôi có thể nhận hoa hồng khi bạn mua hàng qua các liên kết này, 
        nhưng không ảnh hưởng đến giá bạn phải trả.
      </p>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-900 dark:text-white">Affiliate Disclosure:</strong> 
          {' '}Một số liên kết trong bài viết này là liên kết affiliate. 
          Điều này có nghĩa là nếu bạn mua sản phẩm thông qua liên kết của chúng tôi, 
          chúng tôi sẽ nhận được hoa hồng mà không tốn thêm chi phí nào từ bạn. 
          Chúng tôi chỉ giới thiệu các sản phẩm mà chúng tôi thực sự tin tưởng 
          và nghĩ rằng sẽ có giá trị cho bạn. Cảm ơn sự hỗ trợ của bạn!
        </p>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div className={`bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg ${className}`}>
      <div className="flex items-start gap-3">
        <svg
          className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-yellow-900 dark:text-yellow-100 mb-1">
            Thông báo về Affiliate
          </h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            Bài viết này có chứa các liên kết affiliate. Khi bạn mua hàng qua các liên kết này, 
            chúng tôi có thể nhận được hoa hồng mà không làm tăng giá bạn phải trả. 
            Điều này giúp chúng tôi duy trì và phát triển website. 
            Chúng tôi chỉ giới thiệu các sản phẩm mà chúng tôi thực sự tin tưởng. 
            Cảm ơn sự ủng hộ của bạn! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
