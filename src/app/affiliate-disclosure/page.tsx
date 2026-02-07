import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | Hocit Blog',
  description: 'Chính sách tiết lộ về liên kết affiliate và cách chúng tôi kiếm thu nhập từ website',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          {' / '}
          <span className="text-gray-600 dark:text-gray-400">Affiliate Disclosure</span>
        </div>

        {/* Header */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📢 Affiliate Disclosure
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Thông báo về các liên kết affiliate và cách chúng tôi kiếm thu nhập
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            <strong>Cập nhật lần cuối:</strong> February 8, 2026
          </p>

          <h2>Giới thiệu</h2>
          <p>
            Hocit Blog là một blog về lập trình và công nghệ, được điều hành bởi các developers 
            với mục đích chia sẻ kiến thức và kinh nghiệm. Để duy trì và phát triển website, 
            chúng tôi sử dụng affiliate marketing như một nguồn thu nhập.
          </p>

          <h2>Affiliate Marketing là gì?</h2>
          <p>
            Affiliate marketing là một mô hình kinh doanh mà chúng tôi nhận hoa hồng khi bạn 
            mua sản phẩm hoặc dịch vụ thông qua các liên kết trên website của chúng tôi. 
            <strong>Điều này KHÔNG làm tăng giá bạn phải trả</strong> - giá vẫn như bình thường, 
            thậm chí đôi khi còn rẻ hơn nhờ các deal đặc biệt mà chúng tôi đàm phán.
          </p>

          <h2>Các liên kết affiliate trên website</h2>
          <p>
            Website của chúng tôi có chứa các liên kết affiliate từ nhiều chương trình khác nhau, bao gồm:
          </p>
          <ul>
            <li><strong>Amazon Associates</strong> - Các sản phẩm hardware, books, gadgets</li>
            <li><strong>Udemy, Coursera, Pluralsight</strong> - Các khóa học online</li>
            <li><strong>Bluehost, SiteGround, DigitalOcean</strong> - Hosting và cloud services</li>
            <li><strong>JetBrains, GitHub</strong> - Developer tools và software</li>
            <li><strong>ConvertKit, Mailchimp</strong> - Email marketing tools</li>
          </ul>

          <h2>Cam kết của chúng tôi</h2>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="mt-0 text-green-900 dark:text-green-100">Nguyên tắc hoạt động</h3>
            <ul className="mb-0">
              <li>
                <strong>Trung thực:</strong> Chúng tôi chỉ giới thiệu các sản phẩm mà chúng tôi 
                thực sự sử dụng, tin tưởng và nghĩ rằng có giá trị cho bạn.
              </li>
              <li>
                <strong>Minh bạch:</strong> Chúng tôi luôn tiết lộ rõ ràng khi một liên kết là 
                affiliate link thông qua thông báo trong bài viết.
              </li>
              <li>
                <strong>Độc lập:</strong> Reviews và đánh giá của chúng tôi hoàn toàn độc lập, 
                không bị ảnh hưởng bởi việc nhận hoa hồng.
              </li>
              <li>
                <strong>Chất lượng:</strong> Chúng tôi từ chối các chương trình affiliate có 
                sản phẩm kém chất lượng hoặc không phù hợp với độc giả.
              </li>
            </ul>
          </div>

          <h2>Bạn không bắt buộc phải mua</h2>
          <p>
            Việc click vào affiliate links và mua sản phẩm là <strong>hoàn toàn tự nguyện</strong>. 
            Tất cả nội dung trên website vẫn miễn phí và công khai. Nếu bạn quyết định mua sản phẩm 
            qua liên kết của chúng tôi, đó là cách bạn ủng hộ chúng tôi tiếp tục tạo ra nội dung 
            chất lượng miễn phí.
          </p>

          <h2>Giá cả và chất lượng sản phẩm</h2>
          <p>
            Chúng tôi không kiểm soát giá cả, tính năng, hoặc chất lượng của các sản phẩm bên thứ ba. 
            Chúng tôi cố gắng cập nhật thông tin thường xuyên nhưng giá và tính năng có thể thay đổi 
            mà không báo trước. Hãy luôn:
          </p>
          <ul>
            <li>Kiểm tra giá trực tiếp trên website merchant</li>
            <li>Đọc reviews từ nhiều nguồn khác nhau</li>
            <li>Xem xét return policy và warranty</li>
            <li>So sánh với các sản phẩm tương tự</li>
          </ul>

          <h2>Thu nhập từ Affiliate</h2>
          <p>
            Thu nhập từ affiliate giúp chúng tôi:
          </p>
          <ul>
            <li>Chi trả chi phí hosting và domain</li>
            <li>Đầu tư thời gian viết content chất lượng</li>
            <li>Mua và test các sản phẩm để review</li>
            <li>Phát triển và maintain website</li>
            <li>Tạo ra các tools và resources miễn phí</li>
          </ul>
          <p>
            Chúng tôi coi đây là một mối quan hệ cùng có lợi: bạn nhận được thông tin có giá trị, 
            chúng tôi nhận được hỗ trợ tài chính để tiếp tục công việc.
          </p>

          <h2>Tuân thủ quy định FTC</h2>
          <p>
            Website này tuân thủ các hướng dẫn của <strong>Federal Trade Commission (FTC)</strong> 
            về việc tiết lộ quan hệ affiliate. Chúng tôi cam kết rằng:
          </p>
          <ul>
            <li>Mối quan hệ affiliate được tiết lộ rõ ràng</li>
            <li>Reviews và testimonials là trung thực</li>
            <li>Không có tuyên bố sai lệch về sản phẩm</li>
            <li>Tuân thủ đầy đủ các quy định pháp luật</li>
          </ul>

          <h2>Cookie và Tracking</h2>
          <p>
            Khi bạn click vào affiliate link, merchant có thể đặt cookie trên trình duyệt của bạn 
            để tracking commission. Cookies này thường có thời hạn 24-90 ngày tùy theo chương trình. 
            Bạn có thể xóa cookies bất cứ lúc nào trong settings trình duyệt.
          </p>

          <h2>Liên hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về affiliate disclosure này hoặc về các liên kết 
            affiliate trên website, hãy liên hệ với chúng tôi:
          </p>
          <ul>
            <li><strong>Email:</strong> contact@hocit.com</li>
            <li><strong>Trang liên hệ:</strong> <Link href="/contact">Contact Page</Link></li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
            <h3 className="mt-0 text-blue-900 dark:text-blue-100">💙 Cảm ơn sự hỗ trợ của bạn!</h3>
            <p className="mb-0">
              Chúng tôi rất trân trọng sự tin tưởng và hỗ trợ của bạn. Việc sử dụng affiliate links 
              của chúng tôi giúp chúng tôi tiếp tục tạo ra nội dung miễn phí và chất lượng cao. 
              Nếu bạn có đề xuất hoặc feedback, đừng ngần ngại liên hệ!
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Note:</strong> Trang này có thể được cập nhật định kỳ để phản ánh 
              các thay đổi trong chính sách affiliate của chúng tôi. Hãy kiểm tra lại thường xuyên.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Xem các sản phẩm được đề xuất
          </Link>
        </div>
      </div>
    </div>
  );
}
