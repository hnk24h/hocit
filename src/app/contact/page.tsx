import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Ikagi Blog',
  description: 'Liên hệ với chúng tôi qua email hoặc form liên hệ',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="page-container">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          {' / '}
          <span className="text-gray-600 dark:text-gray-400">Contact</span>
        </div>

        {/* Header */}
        <div className="card shadow-elevation-3 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Có câu hỏi, góp ý, hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="card shadow-elevation-2 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Thông tin liên hệ
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-600 text-2xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      General inquiries:<br />
                      <a href="mailto:hello@ikagi.com" className="text-brand-600 hover:underline">
                        hello@ikagi.com
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Affiliate partnerships:<br />
                      <a href="mailto:partnerships@ikagi.com" className="text-brand-600 hover:underline">
                        partnerships@ikagi.com
                      </a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Privacy & legal:<br />
                      <a href="mailto:legal@ikagi.com" className="text-brand-600 hover:underline">
                        legal@ikagi.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-600 text-2xl">🌐</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Social Media
                    </h3>
                    <div className="space-y-2">
                      <a 
                        href="https://github.com/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-brand-600"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      <a 
                        href="https://twitter.com/yourusername" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-brand-600"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                      </a>
                      <a 
                        href="https://facebook.com/yourpage" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-brand-600"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div>
                <div className="flex items-start space-x-3">
                  <div className="text-brand-600 text-2xl">⏱️</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Thời gian phản hồi
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Chúng tôi cố gắng trả lời trong vòng 24-48 giờ làm việc.
                      Các vấn đề khẩn cấp sẽ được ưu tiên xử lý.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>💡 Mẹo:</strong> Trước khi liên hệ, hãy kiểm tra xem câu hỏi của bạn 
                  đã được trả lời trong các bài viết của chúng tôi chưa nhé!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card shadow-elevation-2 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Gửi tin nhắn
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 cta-section">
          <h2 className="text-2xl font-bold mb-3">
            Bạn là affiliate marketer hoặc brand?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Chúng tôi luôn tìm kiếm các đối tác chiến lược. Hãy email cho chúng tôi tại{' '}
            <a href="mailto:partnerships@ikagi.com" className="underline font-semibold">
              partnerships@ikagi.com
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/affiliate-disclosure"
              className="bg-white text-brand-600 px-6 py-3 rounded-button font-semibold hover:bg-gray-100 transition-all shadow-elevation-2"
            >
              Xem Affiliate Program
            </Link>
            <Link
              href="/products"
              className="bg-brand-800 text-white px-6 py-3 rounded-button font-semibold hover:bg-brand-900 transition-all"
            >
              Xem sản phẩm đề xuất
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
