"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function ReplyTeacherPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"scenario" | "polish">("scenario");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTagClick = (tag: string) => {
    setInput((prev) => (prev ? prev + "\n" + tag : tag));
  };

  const sensitiveWords = ["心动", "性骚扰", "虐待", "暴力", "自杀", "伤害", "欺负", "威胁"];

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;

    // 敏感词检测
    const hasSensitive = sensitiveWords.some((word) => input.includes(word));
    if (hasSensitive) {
      router.push("/reply-teacher/sensitive");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          scene: "reply-teacher",
          userInput: input.trim(),
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }

      // 存储结果到 localStorage，跳转结果页
      localStorage.setItem("generateResult", JSON.stringify(data));
      router.push(mode === "polish" ? "/reply-teacher/polish-result" : "/reply-teacher/result");
    } catch {
      alert("网络错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* 背景层 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/classroom.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover blur-[16px] scale-110"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[#FDF8F3]/70" />
      </div>

      {/* 固定顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-[#FDF8F3]/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.06)]">
        <div className="h-14 flex items-center justify-between px-5">
          <button onClick={() => router.back()}>
            <ArrowLeft className="w-6 h-6 text-[#666666]" />
          </button>
          <span className="text-base font-semibold text-[#1A1A1A]">
            回复老师
          </span>
          <div className="w-6" /> {/* 占位保持居中 */}
        </div>
      </div>

      {/* 内容层 */}
      <div className="relative z-10 px-5 pt-20 pb-8">
        {/* 模式切换标签 */}
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

        {/* 快捷标签（仅场景模式） */}
        {mode === "scenario" && (
          <div className="flex gap-1.5 overflow-x-auto py-3 mt-2 scrollbar-hide">
            {["点名批评", "被冤枉", "越界言论", "作业问题", "座位安排"].map((tag) => (
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

        {/* 输入框 */}
        <div className="mt-6">
          <div className="bg-[#F5F5F5] rounded-2xl p-4 min-h-[140px] relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              placeholder={
                mode === "scenario"
                  ? "请描述发生了什么事，比如：班主任在群里点名批评了我孩子，我该怎么回应？"
                  : "请粘贴你想发给老师的话，比如：老师，我觉得你对我孩子有偏见，这样不公平。"
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

        {/* 提交按钮 */}
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
            "生成回复"
          )}
        </button>
      </div>

      {/* 底部安全区 */}
      <div className="h-8" />
    </div>
  );
}
