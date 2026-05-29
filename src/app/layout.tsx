import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "캣닢 대탈환 작전",
  description: "시온 & 코코 & 규종: 캣닢 대탈환 작전 — 8비트 레트로 아케이드 액션 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
