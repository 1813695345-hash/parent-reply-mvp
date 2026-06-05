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
      className={`relative min-h-screen bg-gray-50 overflow-hidden transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* 教室背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/classroom.png)" }}
      />

      {/* 气泡点击区域 - 回复老师（讲台右侧指向老师） */}
      <button
        onClick={() => handleNavigate("/generate?scene=teacher")}
        className="absolute top-[10%] right-[28%] w-48 h-24
                   bg-pink-100/90 backdrop-blur-sm rounded-3xl shadow-lg
                   flex items-center justify-center text-lg font-bold tracking-wide text-gray-800
                   hover:bg-pink-100 hover:shadow-xl transition-all duration-200
                   active:scale-95
                   before:content-[] before:absolute before:top-1/2 before:right-full
                   before:-translate-y-1/2 before:border-8 before:border-transparent
                   before:border-r-pink-100/90"
      >
        回复老师
      </button>

      {/* 气泡点击区域 - 回复家长群（家长位置 - 左下） */}
      <button
        onClick={() => handleNavigate("/generate?scene=parent-chat")}
        className="absolute bottom-[60%] left-[10%] w-56 h-24
                   bg-pink-100/90 backdrop-blur-sm rounded-3xl shadow-lg
                   flex items-center justify-center text-lg font-bold tracking-wide text-gray-800
                   hover:bg-pink-100 hover:shadow-xl transition-all duration-200
                   active:scale-95
                   before:content-[] before:absolute before:top-full before:left-[30%]
                   before:border-8 before:border-transparent
                   before:border-t-pink-100/90"
      >
        与同学家长交流心得
      </button>

      {/* 气泡点击区域 - 和孩子沟通（学生位置 - 右下偏上） */}
      <button
        onClick={() => handleNavigate("/generate?scene=child")}
        className="absolute bottom-[45%] right-[10%] w-48 h-24
                   bg-pink-100/90 backdrop-blur-sm rounded-3xl shadow-lg
                   flex items-center justify-center text-lg font-bold tracking-wide text-gray-800
                   hover:bg-pink-100 hover:shadow-xl transition-all duration-200
                   active:scale-95
                   before:content-[] before:absolute before:top-full before:left-[30%]
                   before:border-8 before:border-transparent
                   before:border-t-pink-100/90"
      >
        和孩子沟通
      </button>
    </div>
  );
}
