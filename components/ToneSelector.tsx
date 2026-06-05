'use client';

import { Tone } from '@/lib/types';
import { getToneOptions } from '@/lib/prompt';

interface ToneSelectorProps {
  value: Tone;
  onChange: (tone: Tone) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  const tones = getToneOptions();

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800">选择语气</h2>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => {
          const isSelected = value === tone.value;
          return (
            <button
              key={tone.value}
              onClick={() => onChange(tone.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-[#007AFF] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tone.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
