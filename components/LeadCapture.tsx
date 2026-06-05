'use client';

import { useState } from 'react';

interface LeadCaptureProps {
  onClose: () => void;
}

export default function LeadCapture({ onClose }: LeadCaptureProps) {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    // In MVP, just log to localStorage analytics
    try {
      const analytics = JSON.parse(window.localStorage.getItem('ph:analytics') || '{}');
      const events = analytics.events || [];
      events.push({ type: 'lead_submit', contact: contact.trim(), timestamp: Date.now() });
      window.localStorage.setItem('ph:analytics', JSON.stringify({ ...analytics, events }));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        {!submitted ? (
          <>
            <h3 className="mb-2 text-lg font-bold text-gray-900">今日次数已用完</h3>
            <p className="mb-5 text-sm leading-relaxed text-gray-500">
              感谢使用！如果您觉得有帮助，可以留下联系方式，我们后续会通知您更多功能上线。
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="微信号或手机号"
                className="w-full rounded-xl border-2 border-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#007AFF]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  稍后再说
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#007AFF] py-3 text-sm font-medium text-white transition-colors hover:bg-[#0066CC]"
                >
                  提交
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mb-3 text-4xl">🎉</div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">提交成功</h3>
            <p className="mb-5 text-sm text-gray-500">我们会尽快与您联系。</p>
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-[#007AFF] py-3 text-sm font-medium text-white transition-colors hover:bg-[#0066CC]"
            >
              好的
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
