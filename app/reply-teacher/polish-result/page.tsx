"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy } from "lucide-react";

function parsePolish(content: string) {
  const parts = content.split("【");
  const polished = parts
    .find((p) => p.startsWith("润色后】"))
    ?.replace("润色后】", "")
    .trim();
  const changesPart = parts
    .find((p) => p.startsWith("修改说明】"))
    ?.replace("修改说明】", "")
    .trim();

  const changes = changesPart?.split("•")?.map((c) => c.trim()).filter(Boolean) || [];

  return { polished: polished || "", changes };
}

export default function TeacherPolishResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{
    polished: string;
    changes: string[];
    original?: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("generateResult");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.content) {
          setResult(parsePolish(data.content));
        }
      } catch {
        // 解析失败
      }
    }
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#FDF8F3] flex items-center justify-center">
        <div className="text-sm text-[#999999]">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/classroom.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover blur-[16px] scale-110"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[#FDF8F3]/70" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-20 bg-[#FDF8F3]/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)]">
        <div className="h-14 flex items-center justify-between px-5">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#666666]" />
          </button>
          <span className="text-base font-semibold text-[#1A1A1A]">润色结果</span>
          <div className="w-6" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-16 pb-20">
        {/* 原文 */}
        <div className="bg-[#F5F5F5] rounded-2xl p-4">
          <div className="text-sm font-semibold text-[#666666] mb-2">原文</div>
          <div className="text-sm text-[#1A1A1A] leading-relaxed">
            {result.original || "（原文内容）"}
          </div>
        </div>

        {/* 润色后 */}
        <div className="bg-white rounded-2xl border-l-4 border-[#5DA68A] p-5 mt-4">
          <div className="text-sm font-semibold text-[#5DA68A] mb-2">润色后</div>
          <div className="text-[15px] text-[#1A1A1A] leading-relaxed">{result.polished}</div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => handleCopy(result.polished)}
              className="flex items-center gap-1 text-sm text-[#666666]"
            >
              <Copy className="w-4 h-4" />
              复制
            </button>
            <button className="text-sm text-[#4A90D9] font-medium">重新润色</button>
          </div>
        </div>

        {/* 修改说明 */}
        {result.changes.length > 0 && (
          <div className="bg-[rgba(93,166,138,0.06)] rounded-xl p-4 mt-4">
            <div className="text-sm font-semibold text-[#5DA68A] mb-2">修改说明</div>
            <ul className="space-y-1">
              {result.changes.map((change, i) => (
                <li key={i} className="text-sm text-[#5DA68A] flex items-start gap-2">
                  <span>•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
