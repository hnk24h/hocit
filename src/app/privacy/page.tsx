import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ikagi Blog',
  description: 'Chính sách bảo mật và cách chúng tôi xử lý dữ liệu cá nhân của bạn',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link href="/" className="text-brand-600 hover:underline">Home</Link>
          {' / '}
          <span className="text-gray-600 dark:text-gray-400">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="card shadow-elevation-3 p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Effective Date:</strong> February 8, 2026<br />
            <strong>Last Updated:</strong> February 8, 2026
          </p>
        </div>

        {/* Content */}
        <div className="card shadow-elevation-2 p-8 prose dark:prose-invert max-w-none">
          <h2>Introduction</h2>
          <p>
            Welcome to Ikagi Blog ("we," "our," or "us"). We respect your privacy and are committed 
            to protecting your personal data. This privacy policy explains how we collect, use, and 
            safeguard your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          
          <h3>1. Information You Provide</h3>
          <ul>
            <li><strong>Email Address:</strong> When you subscribe to our newsletter</li>
            <li><strong>Comments:</strong> When you comment on articles (via Giscus/GitHub)</li>
            <li><strong>Contact Information:</strong> When you contact us through forms</li>
          </ul>

          <h3>2. Information Automatically Collected</h3>
          <ul>
            <li><strong>Analytics Data:</strong> Via Google Analytics (IP address, browser type, device info, pages visited)</li>
            <li><strong>Cookies:</strong> For functionality and analytics</li>
            <li><strong>Affiliate Click Tracking:</strong> Anonymized click data for affiliate links</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use collected information for:</p>
          <ul>
            <li>📧 Sending newsletters and updates (with your consent)</li>
            <li>📊 Analyzing website traffic and user behavior</li>
            <li>🔗 Tracking affiliate link performance (anonymized)</li>
            <li>💬 Enabling comments and community features</li>
            <li>🛡️ Protecting against fraud and abuse</li>
            <li>📈 Improving our content and user experience</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          
          <h3>Types of Cookies We Use:</h3>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <ul className="space-y-2">
              <li>
                <strong>Essential Cookies:</strong> Required for website functionality 
                (theme preferences, session data)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Google Analytics for traffic analysis
              </li>
              <li>
                <strong>Affiliate Cookies:</strong> Track clicks on affiliate links 
                (24-90 days expiration)
              </li>
            </ul>
          </div>

          <h3>Managing Cookies:</h3>
          <p>
            You can control cookies through your browser settings. Note that blocking cookies 
            may affect website functionality.
          </p>

          <h2>Third-Party Services</h2>
          
          <h3>We use the following third-party services:</h3>
          <ul>
            <li>
              <strong>Google Analytics:</strong> Website analytics
              <br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-brand-600">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Giscus (GitHub):</strong> Comment system
              <br />
              <a href="https://github.com/privacy" target="_blank" rel="noopener" className="text-brand-600">
                GitHub Privacy Policy
              </a>
            </li>
            <li>
              <strong>Affiliate Networks:</strong> Amazon Associates, Udemy, Bluehost, etc.
              <br />
              Each has their own privacy policies
            </li>
          </ul>

          <h2>Affiliate Marketing Disclosure</h2>
          <p>
            When you click affiliate links, merchants may set cookies to track conversions. 
            We do NOT share your personal information with affiliate partners. See our{' '}
            <Link href="/affiliate-disclosure" className="text-brand-600 hover:underline">
              Affiliate Disclosure
            </Link>{' '}
            for more details.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data:
          </p>
          <ul>
            <li>🔒 HTTPS encryption for all traffic</li>
            <li>🔐 Secure hosting infrastructure (Vercel)</li>
            <li>🗑️ No storage of payment information</li>
            <li>📊 Minimal data collection principle</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of your data</li>
            <li><strong>Rectification:</strong> Correct inaccurate data</li>
            <li><strong>Erasure:</strong> Request deletion of your data</li>
            <li><strong>Opt-out:</strong> Unsubscribe from newsletters anytime</li>
            <li><strong>Object:</strong> Object to data processing</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13. We do not knowingly collect 
            data from children. If you believe we have collected data from a child, 
            please contact us immediately.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your data may be processed in countries outside your residence. We ensure 
            appropriate safeguards are in place for such transfers.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy periodically. Changes will be posted on this page 
            with an updated "Last Updated" date. Continued use of the website constitutes 
            acceptance of the updated policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this privacy policy or want to exercise your rights, 
            please contact us:
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <ul className="space-y-1">
              <li><strong>Email:</strong> privacy@ikagi.com</li>
              <li><strong>Contact Page:</strong> <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link></li>
              <li><strong>Response Time:</strong> Within 7 business days</li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2>GDPR Compliance</h2>
            <p>
              For EU residents: This policy complies with the General Data Protection Regulation (GDPR). 
              You have additional rights under GDPR. Contact us for more information.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2>California Privacy Rights</h2>
            <p>
              California residents have specific rights under CCPA. Contact us to exercise 
              your California privacy rights.
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
