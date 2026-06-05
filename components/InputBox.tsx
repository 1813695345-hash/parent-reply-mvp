'use client';

import { useRef, useEffect } from 'react';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function InputBox({ value, onChange }: InputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const isOverLimit = value.length > 500;

  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold text-gray-800">输入你想说的话或遇到的情况</h2>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="把老师的原话、家长群的聊天、或者想对孩子说的话，粘贴进来或写在这里都行。"
          className={`min-h-[120px] w-full resize-none rounded-2xl border-2 bg-white p-4 text-sm leading-relaxed text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#007AFF] focus:shadow-sm ${
            isOverLimit ? 'border-red-400 focus:border-red-500' : 'border-gray-100'
          }`}
          maxLength={600}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {isOverLimit && (
            <span className="text-xs text-red-500">太长啦，精简一下更容易生成好回复哦</span>
          )}
          <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
            {value.length}/500
          </span>
        </div>
      </div>
    </div>
  );
}
