"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PenLine, MessageCircle, Heart, MessageSquare } from "lucide-react";

const cards = [
  {
    id: "teacher",
    iconBg: "bg-[rgba(74,144,217,0.1)]",
    icon: (
      <div className="relative flex items-center justify-center">
        <PenLine className="w-6 h-6 stroke-2 text-[#4A90D9]" />
        <MessageCircle className="w-4 h-4 stroke-2 text-[#4A90D9] absolute -bottom-1 -right-1" />
      </div>
    ),
    title: "回复老师",
    desc: "不知道怎么回，怕说错话",
    btn: "帮我回复",
    path: "/reply-teacher",
  },
  {
    id: "child",
    iconBg: "bg-[rgba(93,166,138,0.1)]",
    icon: (
      <div className="relative flex items-center justify-center">
        <Heart className="w-6 h-6 stroke-2 text-[#5DA68A]" />
        <Heart className="w-4 h-4 stroke-[1.5] text-[#5DA68A] absolute -bottom-1 -right-1 opacity-60" />
      </div>
    ),
    title: "和孩子沟通",
    desc: "想好好说，一开口就变说教",
    btn: "帮我沟通",
    path: "/talk-child",
  },
  {
    id: "parent",
    iconBg: "bg-[rgba(217,140,74,0.1)]",
    icon: (
      <div className="relative flex items-center justify-center">
        <MessageSquare className="w-6 h-6 stroke-2 text-[#D98C4A]" />
        <MessageSquare className="w-4 h-4 stroke-[1.5] text-[#D98C4A] absolute -bottom-1 -right-1 opacity-60" />
      </div>
    ),
    title: "家长交流",
    desc: "群里有人阴阳，不知道怎么接",
    btn: "帮我应对",
    path: "/parent-chat",
  },
];

export default function StartPage() {
  const router = useRouter();
  const [fading, setFading] = useState(false);

  const handleNavigate = (path: string) => {
    setFading(true);
    setTimeout(() => router.push(path), 400);
  };

  return (
    <main className="relative min-h-screen">
      {/* 背景层：必须是第一个元素 */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="/classroom.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover blur-[16px] scale-110"
          draggable={false}
        />
        <div className="absolute inset-0 bg-[#FDF8F3]/60" />
      </div>

      {/* 内容层 */}
      <div
        className={`relative z-10 flex flex-col items-center px-5 pt-[88px] pb-20 transition-opacity duration-500 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* 标题 */}
        <h1 className="text-2xl font-semibold text-[#1A1A1A] text-center">
          让每一次沟通，都更温暖
        </h1>
        <p className="text-sm text-[#999999] text-center mt-2">
          选择你需要的帮助
        </p>

        {/* 三张功能卡片 */}
        <div className="flex flex-col items-center gap-4 w-full mt-10">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleNavigate(card.path)}
              className="w-full bg-white rounded-[20px] p-5 border border-[rgba(0,0,0,0.06)]
                         shadow-[0_4px_24px_rgba(0,0,0,0.08)]
                         active:scale-[0.98]
                         active:shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                         transition-all duration-200 text-left"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg}`}
              >
                {card.icon}
              </div>

              <div className="text-base font-semibold text-[#1A1A1A] mt-3 text-center">
                {card.title}
              </div>

              <div className="text-[13px] text-[#666666] mt-1 text-center">
                {card.desc}
              </div>

              <div
                className="w-full h-11 bg-[#2C2C2C] text-white rounded-2xl text-base font-medium mt-4
                           flex items-center justify-center"
              >
                {card.btn}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 底部安全区 */}
      <div className="h-[34px]" />
    </main>
  );
}
