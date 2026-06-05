'use client';

interface ResultCardProps {
  reply: string;
  safetyWarning?: string;
}

export default function ResultCard({ reply, safetyWarning }: ResultCardProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800">高情商回复</h2>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {safetyWarning && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
            ⚠️ {safetyWarning}
          </div>
        )}
        <p className="text-sm leading-7 text-gray-800 whitespace-pre-wrap">{reply}</p>
      </div>
    </div>
  );
}
