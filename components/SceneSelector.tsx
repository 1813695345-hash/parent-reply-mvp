'use client';

import { Scene } from '@/lib/types';
import { getSceneOptions } from '@/lib/prompt';

interface SceneSelectorProps {
  value: Scene | null;
  onChange: (scene: Scene) => void;
}

export default function SceneSelector({ value, onChange }: SceneSelectorProps) {
  const scenes = getSceneOptions();

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800">选择场景</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {scenes.map((scene) => {
          const isSelected = value === scene.value;
          return (
            <button
              key={scene.value}
              onClick={() => onChange(scene.value)}
              className={`flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#007AFF] bg-[#007AFF]/5 shadow-md -translate-y-0.5'
                  : 'border-gray-100 bg-white shadow-sm hover:border-gray-200 hover:shadow'
              }`}
            >
              <span className="text-2xl mb-2">{scene.icon}</span>
              <span className="text-sm font-semibold text-gray-900">{scene.label}</span>
              <span className="mt-1 text-xs text-gray-500">{scene.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
