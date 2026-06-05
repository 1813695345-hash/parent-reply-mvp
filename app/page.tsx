"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();
  const [fading, setFading] = useState(false);

  const handleNavigate = (path: string) => {
    setFading(true);
    setTimeout(() => router.push(path), 400);
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 flex items-center justify-center transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full max-w-4xl aspect-[9/16] mx-auto">
        {/* 教室背景图（含气泡） */}
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/classroom.png)" }}
        />

        {/* 回复老师 */}
        <div
          onClick={() => handleNavigate("/generate?scene=teacher")}
          className="absolute top-[10%] left-[39%] w-40 h-16 cursor-pointer
                     flex items-center justify-center
                     text-base font-bold tracking-wide text-gray-800
                     active:scale-95 transition-transform duration-150"
        >
          回复老师
        </div>

        {/* 与同学家长交流心得 */}
        <div
          onClick={() => handleNavigate("/generate?scene=parent-chat")}
          className="absolute top-[34%] left-[16%] w-44 h-16 cursor-pointer
                     flex items-center justify-center
                     text-base font-bold tracking-wide text-gray-800
                     active:scale-95 transition-transform duration-150"
        >
          与同学家长交流心得
        </div>

        {/* 和孩子沟通 */}
        <div
          onClick={() => handleNavigate("/generate?scene=child")}
          className="absolute top-[62%] left-[25%] w-40 h-16 cursor-pointer
                     flex items-center justify-center
                     text-base font-bold tracking-wide text-gray-800
                     active:scale-95 transition-transform duration-150"
        >
          和孩子沟通
        </div>
      </div>
    </div>
  );
}
