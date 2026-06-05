"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy } from "lucide-react";

function parseScenario(content: string) {
  const parts = content.split("【");
  const analysis = parts
    .find((p) => p.startsWith("场景分析】"))
    ?.replace("场景分析】", "")
    .trim();
  const repliesPart = parts
    .find((p) => p.startsWith("可选回复】"))
    ?.replace("可选回复】", "")
    .trim();

  const versions = repliesPart?.split(/\d+\.\s+/)?.filter(Boolean) || [];

  return {
    analysis: analysis || "正在分析场景...",
    versions: versions.map((v: string) => {
      const colonIdx = v.indexOf("：");
      if (colonIdx > 0) {
        return {
          title: v.slice(0, colonIdx).trim(),
          content: v.slice(colonIdx + 1).trim(),
        };
      }
      return { title: "回复建议", content: v.trim() };
    }),
  };
}

const colorMap: Record<string, { bar: string; text: string; label: string }> = {
  "温和提醒": { bar: "bg-[#5DA68A]", text: "text-[#5DA68A]", label: "温和提醒" },
  "温和提醒版": { bar: "bg-[#5DA68A]", text: "text-[#5DA68A]", label: "温和提醒" },
  "标准沟通": { bar: "bg-[#4A90D9]", text: "text-[#4A90D9]", label: "标准沟通" },
  "标准沟通版": { bar: "bg-[#4A90D9]", text: "text-[#4A90D9]", label: "标准沟通" },
  "正式交涉": { bar: "bg-[#D98C4A]", text: "text-[#D98C4A]", label: "正式交涉" },
  "正式交涉版": { bar: "bg-[#D98C4A]", text: "text-[#D98C4A]", label: "正式交涉" },
};

function getColor(title: string) {
  return colorMap[title] || { bar: "bg-[#4A90D9]", text: "text-[#4A90D9]", label: title };
}

export default function TeacherResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{
    analysis: string;
    versions: { title: string; content: string }[];
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("generateResult");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.content) {
          setResult(parseScenario(data.content));
        }
      } catch {
        // 解析失败，保持 null
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
          <span className="text-base font-semibold text-[#1A1A1A]">生成结果</span>
          <div className="w-6" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-16 pb-24">
        {/* 场景分析 */}
        <div className="bg-[#F5F5F5] rounded-2xl p-4">
          <div className="text-sm font-semibold text-[#666666] mb-1">场景分析</div>
          <div className="text-sm text-[#1A1A1A] leading-relaxed">{result.analysis}</div>
        </div>

        {/* 可选回复 */}
        <div className="text-base font-semibold text-[#1A1A1A] mt-6 mb-4">可选回复</div>

        <div className="flex flex-col gap-4">
          {result.versions.map((version, i) => {
            const colors = getColor(version.title);
            return (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className={`h-1 ${colors.bar}`} />
                <div className="p-5">
                  <div className={`text-xs font-medium ${colors.text} mb-2`}>
                    {colors.label}
                  </div>
                  <div className="text-[15px] text-[#1A1A1A] leading-relaxed">
                    {version.content}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleCopy(version.content)}
                      className="flex-1 h-10 border border-[rgba(0,0,0,0.1)] text-[#1A1A1A] rounded-xl text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Copy className="w-4 h-4" />
                      复制
                    </button>
                    <button className="flex-1 h-10 bg-[#2C2C2C] text-white rounded-xl text-sm font-medium">
                      使用这段
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-[rgba(0,0,0,0.06)] px-5 py-4">
        <div className="flex items-center justify-between">
          <button className="text-sm text-[#666666]">重新生成</button>
          <button className="text-sm text-[#4A90D9]">不满意？人工帮助</button>
        </div>
      </div>
    </div>
  );
}
