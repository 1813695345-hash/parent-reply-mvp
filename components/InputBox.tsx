'use client';

import { useRef, useEffect } from 'react';

type InputType = 'scenario' | 'polish';

interface InputBoxProps {
  value: string;
  onChange: (value: string) => void;
  inputType: InputType;
  onInputTypeChange: (type: InputType) => void;
}

export default function InputBox({
  value,
  onChange,
  inputType,
  onInputTypeChange,
}: InputBoxProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const isOverLimit = value.length > 500;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800">你想做什么？</h2>

      {/* 标签按钮 */}
      <div className="flex gap-2">
        <button
          onClick={() => onInputTypeChange('scenario')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            inputType === 'scenario'
              ? 'bg-[#007AFF] text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🎯 应对一个沟通场景
        </button>
        <button
          onClick={() => onInputTypeChange('polish')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            inputType === 'polish'
              ? 'bg-[#007AFF] text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✏️ 润色一段话
        </button>
      </div>

      {/* 输入框 */}
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-800">
          {inputType === 'scenario'
            ? '描述你遇到的沟通场景'
            : '粘贴你想润色的草稿'}
        </h2>
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              inputType === 'scenario'
                ? '比如：老师说我女儿上课走神，我该怎么回……'
                : '比如：收到，老师，我们一定加强监督，非常感谢老师……'
            }
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
    </div>
  );
}
