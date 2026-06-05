"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function TeacherSensitivePage() {
  const router = useRouter();

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
          <span className="text-base font-semibold text-[#1A1A1A]">需要谨慎处理</span>
          <div className="w-6" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-20 pb-20">
        {/* 警示图标 */}
        <div className="flex justify-center">
          <AlertTriangle className="w-12 h-12 text-[#C45B4A]" />
        </div>

        <h1 className="text-lg font-semibold text-[#C45B4A] text-center mt-4">
          这个情况需要谨慎处理
        </h1>

        <p className="text-sm text-[#666666] text-center mt-2">
          我们检测到这可能涉及敏感问题。建议你优先做以下事情：
        </p>

        {/* 建议列表 */}
        <div className="flex flex-col gap-3 mt-6">
          <div className="bg-white rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C45B4A] text-white flex items-center justify-center text-sm font-medium shrink-0">
              1
            </div>
            <div className="text-sm text-[#1A1A1A] leading-relaxed">
              先和孩子单独沟通，了解完整情况和真实感受
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C45B4A] text-white flex items-center justify-center text-sm font-medium shrink-0">
              2
            </div>
            <div className="text-sm text-[#1A1A1A] leading-relaxed">
              保留相关证据（截图、录音等）
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C45B4A] text-white flex items-center justify-center text-sm font-medium shrink-0">
              3
            </div>
            <div className="text-sm text-[#1A1A1A] leading-relaxed">
              必要时联系学校管理层或教育部门
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => router.push("/reply-teacher/result")}
            className="w-full h-12 border border-[#C45B4A] text-[#C45B4A] rounded-2xl text-base font-medium"
          >
            我了解了，仍要生成回复
          </button>
          <button className="w-full h-12 bg-[#C45B4A] text-white rounded-2xl text-base font-medium">
            联系专业帮助
          </button>
        </div>
      </div>
    </div>
  );
}
