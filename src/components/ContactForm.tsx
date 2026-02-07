'use client';

import { useState, FormEvent } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên của bạn';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Subject validation
    if (!formData.subject) {
      newErrors.subject = 'Vui lòng chọn chủ đề';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập tin nhắn';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace this with your actual API endpoint
      // Option 1: Create /api/contact route
      // Option 2: Use email service like SendGrid, Resend, etc.
      // Option 3: Use form service like Formspree, Basin, etc.
      
      // Simulated API call for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, just log the data
      console.log('Contact form submission:', formData);
      
      // Mock success
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại hoặc email trực tiếp cho chúng tôi.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <>
      {/* Demo Mode Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-button p-3 mb-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          ⚠️ <strong>Demo mode:</strong> Form hiện đang ở chế độ demo. 
          Submissions sẽ không được gửi đi thực tế.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tên của bạn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-base border rounded-button focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
              errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Nguyễn Văn A"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-base border rounded-button focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
              errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="email@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Chủ đề <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-base border rounded-button focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
              errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            <option value="">-- Chọn chủ đề --</option>
            <option value="general">Câu hỏi chung</option>
            <option value="technical">Hỗ trợ kỹ thuật</option>
            <option value="affiliate">Affiliate Partnership</option>
            <option value="content">Góp ý nội dung</option>
            <option value="bug">Báo lỗi</option>
            <option value="other">Khác</option>
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tin nhắn <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 text-base border rounded-button focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors ${
              errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="Nhập tin nhắn của bạn..."
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error message-help' : 'message-help'}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.message}
            </p>
          )}
          <p id="message-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Tối thiểu 10 ký tự (Hiện tại: {formData.message.length})
          </p>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-button p-4" role="status">
            <div className="flex items-center">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Gửi thành công!
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong 24-48 giờ.
                </p>
              </div>
            </div>
          </div>
        )}

      {status === 'error' && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-button p-4" role="alert">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">
                Lỗi gửi tin nhắn
              </p>
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-3 px-6 rounded-button font-semibold text-white transition-all touch-target shadow-elevation-2 hover:shadow-elevation-3 ${
          status === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-primary hover:scale-[1.02]'
        }`}
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang gửi...
          </span>
        ) : (
          'Gửi tin nhắn'
        )}
      </button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
        Bằng cách gửi form này, bạn đồng ý với{' '}
        <a href="/privacy" className="text-brand-600 dark:text-brand-400 hover:underline">
          Chính sách bảo mật
        </a>{' '}
        của chúng tôi.
      </p>
    </form>
    </>
  );
}
