'use client';

import { useState, useEffect } from 'react';

interface DealBadgeProps {
  discount: string;
  code?: string;
  endDate?: string;
  className?: string;
}

export default function DealBadge({ discount, code, endDate, className = '' }: DealBadgeProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!endDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setTimeLeft('Đã hết hạn');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      if (days > 0) {
        setTimeLeft(`Còn ${days} ngày`);
      } else if (hours > 0) {
        setTimeLeft(`Còn ${hours} giờ`);
      } else {
        setTimeLeft(`Còn ${minutes} phút`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endDate]);

  const handleCopyCode = async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`inline-flex flex-col gap-2 ${className}`}>
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
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
          <span className="font-bold text-lg">{discount}</span>
        </div>
        {timeLeft && (
          <div className="text-xs mt-1 opacity-90">
            ⏰ {timeLeft}
          </div>
        )}
      </div>

      {code && (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
          {!showCode ? (
            <button
              onClick={() => setShowCode(true)}
              className="w-full text-center font-mono text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              🎁 Click để xem mã
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 font-mono text-lg font-bold text-gray-900 dark:text-white text-center bg-white dark:bg-gray-800 py-2 px-3 rounded border-2 border-dashed border-brand-500">
                {code}
              </div>
              <button
                onClick={handleCopyCode}
                className="px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded transition-colors"
                title="Copy mã"
              >
                {copied ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
