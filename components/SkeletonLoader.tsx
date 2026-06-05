'use client';

export default function SkeletonLoader() {
  return (
    <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
      <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
    </div>
  );
}
