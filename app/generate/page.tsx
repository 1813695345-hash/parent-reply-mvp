'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Scene, Tone, Action, HistoryItem } from '@/lib/types';
import { generateReply } from '@/lib/client-ai';
import {
  getHistory,
  addHistory,
  clearHistory,
  getDailyCount,
  incrementDailyCount,
  canGenerate,
} from '@/lib/storage';
import SceneSelector from '@/components/SceneSelector';
import ToneSelector from '@/components/ToneSelector';
import InputBox from '@/components/InputBox';
import ResultCard from '@/components/ResultCard';
import ActionButtons from '@/components/ActionButtons';
import HistoryList from '@/components/HistoryList';
import LimitCounter from '@/components/LimitCounter';
import LeadCapture from '@/components/LeadCapture';
import SkeletonLoader from '@/components/SkeletonLoader';
import PrivacyNotice from '@/components/PrivacyNotice';

function Home() {
  const searchParams = useSearchParams();
  const [scene, setScene] = useState<Scene | null>(null);
  const [tone, setTone] = useState<Tone>('polite');
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'scenario' | 'polish'>('scenario');
  const [reply, setReply] = useState('');
  const [safetyWarning, setSafetyWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [dailyCount, setDailyCount] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setHistory(getHistory());
    setDailyCount(getDailyCount());

    const sceneParam = searchParams.get("scene");
    if (sceneParam && ["teacher", "child", "parent-chat"].includes(sceneParam)) {
      setScene(sceneParam as Scene);
    }
  }, [searchParams]);

  const handleSceneChange = useCallback((newScene: Scene) => {
    setScene(newScene);
    setError('');
  }, []);

  const handleToneChange = useCallback((newTone: Tone) => {
    setTone(newTone);
    setError('');
  }, []);

  const handleGenerate = useCallback(
    async (action: Action = 'generate') => {
      if (!scene) {
        setError('请先选择一个场景');
        return;
      }
      if (!input.trim()) {
        setError('请输入你想说的话');
        return;
      }
      if (input.length > 500) {
        setError('输入内容过长，请精简到500字以内');
        return;
      }
      if (!canGenerate()) {
        setShowLeadCapture(true);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const result = await generateReply({
          scene,
          tone,
          input: input.trim(),
          action,
          inputType,
          lastReply: action === 'softer' || action === 'stronger' ? reply : undefined,
        });

        setReply(result);

        if (action === 'generate') {
          incrementDailyCount();
          setDailyCount(getDailyCount());

          const item: HistoryItem = {
            scene,
            tone,
            input: input.trim(),
            reply: result,
            timestamp: Date.now(),
          };
          addHistory(item);
          setHistory(getHistory());
        }

        // Scroll to result
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      } catch (err) {
        const message = err instanceof Error ? err.message : '生成失败，请稍后重试';
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [scene, tone, input, reply]
  );

  const handleCopy = useCallback(() => {
    if (!reply) return;
    navigator.clipboard.writeText(reply).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [reply]);

  const handleReset = useCallback(() => {
    setScene(null);
    setTone('polite');
    setInput('');
    setInputType('scenario');
    setReply('');
    setSafetyWarning('');
    setError('');
    setCopied(false);
  }, []);

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setScene(item.scene);
    setTone(item.tone);
    setInput(item.input);
    setReply(item.reply);
    setSafetyWarning('');
    setError('');
  }, []);

  const handleHistoryClear = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const canSubmit = scene && input.trim().length > 0 && input.length <= 500 && !loading;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">高情商家长回复器</h1>
          <LimitCounter count={dailyCount} />
        </div>

        {/* Privacy Notice */}
        <div className="mb-6">
          <PrivacyNotice />
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Scene Selection */}
          <SceneSelector value={scene} onChange={handleSceneChange} />

          {/* Tone Selection */}
          {scene && (
            <ToneSelector value={tone} onChange={handleToneChange} />
          )}

          {/* Input */}
          {scene && (
            <InputBox
              value={input}
              onChange={setInput}
              inputType={inputType}
              onInputTypeChange={setInputType}
            />
          )}

          {/* Generate Button */}
          {scene && (
            <button
              onClick={() => handleGenerate('generate')}
              disabled={!canSubmit}
              className="w-full rounded-2xl bg-[#007AFF] py-4 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#0066CC] active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
            >
              {loading ? '生成中...' : '生成高情商回复'}
            </button>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && <SkeletonLoader />}

          {/* Result */}
          {reply && !loading && (
            <div className="space-y-4">
              <ResultCard reply={reply} safetyWarning={safetyWarning} />
              <ActionButtons
                onCopy={handleCopy}
                onAction={handleGenerate}
                onReset={handleReset}
                copied={copied}
                loading={loading}
              />
              <HistoryList
                history={history}
                onSelect={handleHistorySelect}
                onClear={handleHistoryClear}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lead Capture Modal */}
      {showLeadCapture && <LeadCapture onClose={() => setShowLeadCapture(false)} />}
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <Home />
    </Suspense>
  );
}
