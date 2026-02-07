import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Ikagi Blog',
  description: 'Điều khoản sử dụng dịch vụ Ikagi Blog',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="page-container">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          {' / '}
          <span className="text-gray-600 dark:text-gray-400">Terms of Service</span>
        </div>

        {/* Header */}
        <div className="card shadow-elevation-3 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Effective Date:</strong> February 8, 2026<br />
            <strong>Last Updated:</strong> February 8, 2026
          </p>
        </div>

        {/* Content */}
        <div className="card shadow-elevation-2 p-8 prose dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Ikagi Blog ("the Website"), you accept and agree to be bound 
            by these Terms of Service. If you do not agree to these terms, please do not use 
            the Website.
          </p>

          <h2>2. Use of the Website</h2>
          
          <h3>2.1 Permitted Use</h3>
          <p>You may use the Website for:</p>
          <ul>
            <li>Reading articles and educational content</li>
            <li>Downloading free resources</li>
            <li>Commenting on articles (subject to our guidelines)</li>
            <li>Subscribing to newsletters</li>
            <li>Clicking on affiliate links to purchase products</li>
          </ul>

          <h3>2.2 Prohibited Use</h3>
          <p>You agree NOT to:</p>
          <ul>
            <li>❌ Copy, republish, or redistribute content without permission</li>
            <li>❌ Use automated scripts or bots to scrape content</li>
            <li>❌ Post spam, malicious code, or offensive content</li>
            <li>❌ Attempt to hack or compromise website security</li>
            <li>❌ Use the website for illegal activities</li>
            <li>❌ Impersonate others or provide false information</li>
            <li>❌ Manipulate affiliate links or commit fraud</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          
          <h3>3.1 Our Content</h3>
          <p>
            All content on Ikagi Blog, including articles, images, code examples, and designs, 
            is owned by or licensed to us. Content is protected by copyright and other 
            intellectual property laws.
          </p>

          <h3>3.2 Limited License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to:
          </p>
          <ul>
            <li>View and read content for personal use</li>
            <li>Use code examples in your projects (with attribution)</li>
            <li>Share links to our articles on social media</li>
          </ul>

          <h3>3.3 Attribution</h3>
          <p>
            If you reference our content, please provide proper attribution with a link back 
            to the original article.
          </p>

          <h2>4. User-Generated Content</h2>
          
          <h3>4.1 Comments</h3>
          <p>
            When you post comments via Giscus (GitHub), you grant us a worldwide, non-exclusive, 
            royalty-free license to display and moderate your comments.
          </p>

          <h3>4.2 Comment Guidelines</h3>
          <ul>
            <li>✅ Be respectful and constructive</li>
            <li>✅ Stay on topic</li>
            <li>✅ Provide value to the discussion</li>
            <li>❌ No spam, self-promotion, or affiliate links</li>
            <li>❌ No offensive, discriminatory, or illegal content</li>
            <li>❌ No personal attacks or harassment</li>
          </ul>

          <p>
            We reserve the right to remove comments that violate these guidelines without notice.
          </p>

          <h2>5. Affiliate Marketing</h2>
          
          <h3>5.1 Affiliate Links</h3>
          <p>
            This Website contains affiliate links. When you purchase products through our links, 
            we may earn a commission at no extra cost to you. See our{' '}
            <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">
              Affiliate Disclosure
            </Link>{' '}
            for details.
          </p>

          <h3>5.2 Product Information</h3>
          <p>
            We strive to provide accurate product information, but:
          </p>
          <ul>
            <li>Prices and availability may change without notice</li>
            <li>We are not responsible for merchant policies or product quality</li>
            <li>All purchases are subject to merchant terms and conditions</li>
            <li>We do not handle refunds or customer service for products</li>
          </ul>

          <h2>6. Disclaimers</h2>
          
          <h3>6.1 No Warranty</h3>
          <p>
            The Website and content are provided "AS IS" without warranties of any kind. 
            We do not guarantee:
          </p>
          <ul>
            <li>Accuracy or completeness of information</li>
            <li>Uninterrupted or error-free service</li>
            <li>Results from using our content or recommendations</li>
            <li>Compatibility of code examples with your environment</li>
          </ul>

          <h3>6.2 Professional Advice</h3>
          <p>
            Content on this Website is for informational and educational purposes only. 
            It does NOT constitute professional advice (financial, legal, technical, etc.). 
            Always consult qualified professionals for specific situations.
          </p>

          <h3>6.3 External Links</h3>
          <p>
            The Website contains links to external websites. We are not responsible for 
            the content, privacy practices, or availability of third-party sites.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Ikagi Blog and its owners, authors, 
            and contributors SHALL NOT be liable for:
          </p>
          <ul>
            <li>Direct, indirect, incidental, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Damages arising from use or inability to use the Website</li>
            <li>Errors or omissions in content</li>
            <li>Issues with products purchased through affiliate links</li>
          </ul>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Ikagi Blog from any claims, damages, 
            or expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your use of the Website</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
          </ul>

          <h2>9. Privacy</h2>
          <p>
            Your use of the Website is also governed by our{' '}
            <Link href="/privacy" className="text-brand-600 hover:underline">
              Privacy Policy
            </Link>
            . Please review it to understand how we collect and use your information.
          </p>

          <h2>10. Modifications</h2>
          
          <h3>10.1 Terms Changes</h3>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted 
            on this page with an updated "Last Updated" date. Your continued use of the 
            Website constitutes acceptance of modified Terms.
          </p>

          <h3>10.2 Content Changes</h3>
          <p>
            We may update, modify, or remove content at any time without notice.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to:
          </p>
          <ul>
            <li>Terminate or suspend your access to the Website</li>
            <li>Remove your comments or content</li>
            <li>Block your IP address</li>
          </ul>
          <p>
            This may occur without notice if you violate these Terms or engage in 
            harmful behavior.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of [Your Jurisdiction]. Any disputes 
            shall be resolved in the courts of [Your Jurisdiction].
          </p>

          <h2>13. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, 
            the remaining provisions shall remain in full force and effect.
          </p>

          <h2>14. Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy and Affiliate Disclosure, 
            constitute the entire agreement between you and Ikagi Blog.
          </p>

          <h2>15. Contact Information</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <ul className="space-y-1">
              <li><strong>Email:</strong> legal@ikagi.com</li>
              <li><strong>Contact Page:</strong> <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link></li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Note:</strong> By using Ikagi Blog, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-primary text-white px-8 py-3 rounded-button font-semibold transition-all shadow-elevation-2 hover:shadow-elevation-3 hover:scale-[1.02]"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
