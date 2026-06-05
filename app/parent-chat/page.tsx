"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ParentChatPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"scenario" | "polish">("scenario");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTagClick = (tag: string) => {
    setInput((prev) => (prev ? prev + "\n" + tag : tag));
  };

  const handleSubmit = () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    console.log("提交内容:", { mode, input: input.trim() });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

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
          <span className="text-base font-semibold text-[#1A1A1A]">
            家长交流
          </span>
          <div className="w-6" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-20 pb-8">
        <div className="flex gap-1 p-1 bg-[#EEEEEE] rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setMode("scenario")}
            className={`flex-1 h-9 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors duration-200 ${
              mode === "scenario"
                ? "bg-[#2C2C2C] text-white"
                : "bg-transparent text-[#666666]"
            }`}
          >
            🎯 应对场景
          </button>
          <button
            onClick={() => setMode("polish")}
            className={`flex-1 h-9 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition-colors duration-200 ${
              mode === "polish"
                ? "bg-[#2C2C2C] text-white"
                : "bg-transparent text-[#666666]"
            }`}
          >
            ✏️ 润色草稿
          </button>
        </div>

        {mode === "scenario" && (
          <div className="flex gap-1.5 overflow-x-auto py-3 mt-2 scrollbar-hide">
            {["被阴阳怪气", "班费纠纷", "孩子被欺负", "对方家长护短", "约见面沟通"].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="rounded-xl bg-[rgba(0,0,0,0.04)] px-2.5 py-1.5 text-xs text-[#666666] whitespace-nowrap active:bg-[rgba(74,144,217,0.1)] active:text-[#4A90D9]"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6">
          <div className="bg-[#F5F5F5] rounded-2xl p-4 min-h-[140px] relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              placeholder={
                mode === "scenario"
                  ? "请描述发生了什么事，比如：群里有个家长阴阳怪气说我孩子..."
                  : "请粘贴你想发给家长的话，比如：你家孩子推了我家孩子，你们管不管？"
              }
              className="w-full min-h-[100px] bg-transparent text-[15px] text-[#1A1A1A] leading-relaxed resize-none focus:outline-none placeholder:text-[#AAAAAA]"
              maxLength={500}
            />
            <div
              className={`text-xs text-right mt-2 ${
                input.length >= 500 ? "text-red-500" : "text-[#999999]"
              }`}
            >
              {input.length}/500
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!input.trim() || loading}
          className="w-full h-12 bg-[#2C2C2C] text-white rounded-2xl text-base font-medium
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-opacity duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              思考中...
            </span>
          ) : (
            "生成应对方案"
          )}
        </button>
      </div>

      <div className="h-8" />
    </div>
  );
}
