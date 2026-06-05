import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "高情商家长回复器",
  description: "帮家长高情商回复老师、家长群、孩子的 AI 工具。不讨好、不攻击、不推责。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
