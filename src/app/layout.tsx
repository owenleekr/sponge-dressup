import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sponge dressup · 스폰지타임즈 캐릭터 옷입히기",
  description:
    "스폰지타임즈 캐릭터에 모자·옷·액세서리·이름표를 골라 나만의 마스코트를 만들어보세요.",
  openGraph: {
    title: "sponge dressup",
    description: "스폰지타임즈 캐릭터 옷입히기",
    images: ["/mascot-portrait.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
