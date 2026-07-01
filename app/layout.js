import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = {
  title: "TKC&Co. · 브랜드 프로필",
  description: "ANYTIME, ANYWHERE PLAY WITH TABLER — 테이블형 아이스박스 브랜드",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={figtree.variable}>
      <body>{children}</body>
    </html>
  );
}
