'use client';

import { HistoryItem } from '@/lib/types';
import { getToneLabel } from '@/lib/prompt';

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function HistoryList({ history, onSelect, onClear }: HistoryListProps) {
  if (history.length === 0) return null;

  const sceneLabels: Record<string, string> = {
    teacher: '回复老师',
    parent: '回复家长群',
    child: '和孩子沟通',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-500">最近生成</h2>
        <button
          onClick={onClear}
          className="text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          清空
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item)}
            className="w-full rounded-xl border border-gray-100 bg-white p-3 text-left text-xs text-gray-600 shadow-sm transition-all hover:shadow"
          >
            <div className="mb-1 flex items-center gap-2 text-gray-400">
              <span>{sceneLabels[item.scene]}</span>
              <span>·</span>
              <span>{getToneLabel(item.tone)}</span>
            </div>
            <p className="truncate text-gray-800">{item.reply}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
