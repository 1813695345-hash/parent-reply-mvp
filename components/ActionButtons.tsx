'use client';

import { Action } from '@/lib/types';

interface ActionButtonsProps {
  onCopy: () => void;
  onAction: (action: Action) => void;
  onReset: () => void;
  copied: boolean;
  loading: boolean;
}

export default function ActionButtons({
  onCopy,
  onAction,
  onReset,
  copied,
  loading,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onCopy}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          📋 {copied ? '已复制' : '复制'}
        </button>
        <button
          onClick={() => onAction('retry')}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          🔄 换一种说法
        </button>
        <button
          onClick={() => onAction('softer')}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          😌 再委婉一点
        </button>
        <button
          onClick={() => onAction('stronger')}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
        >
          💪 再强硬一点
        </button>
      </div>
      <button
        onClick={onReset}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
      >
        💬 重新输入
      </button>
    </div>
  );
}
