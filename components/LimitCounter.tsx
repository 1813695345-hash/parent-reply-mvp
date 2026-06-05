'use client';

import { MAX_DAILY_GENERATIONS } from '@/lib/storage';

interface LimitCounterProps {
  count: number;
}

export default function LimitCounter({ count }: LimitCounterProps) {
  const remaining = Math.max(0, MAX_DAILY_GENERATIONS - count);
  const isLow = remaining <= 3;

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">今日还可生成</span>
      <span
        className={`inline-flex h-6 min-w-[24px] items-center justify-center rounded-full px-2 text-xs font-bold ${
          isLow
            ? 'bg-red-50 text-red-500'
            : 'bg-[#007AFF]/10 text-[#007AFF]'
        }`}
      >
        {remaining}
      </span>
      <span className="text-gray-500">次</span>
    </div>
  );
}
