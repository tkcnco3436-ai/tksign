"use client";

import { useEffect, useState } from "react";
import Icon from "../_components/Icon";

const LINKS = [
  {
    href: "https://tabler-tabler.com/",
    icon: "ti-building-store",
    title: "공식몰",
    sub: "제품 구매 · tabler-tabler.com",
  },
  {
    href: "https://smartstore.naver.com/tabler_tabler",
    icon: "ti-shopping-bag",
    title: "스마트스토어",
    sub: "네이버 스마트스토어",
  },
  {
    href: "https://www.instagram.com/tabler.tabler_com/",
    icon: "ti-brand-instagram",
    title: "인스타그램",
    sub: "@tabler.tabler_com",
  },
];

const FEED = [
  "/image/hf_20260624_050329_e6929c65-9e36-48e3-b1b9-2c350bbf5db1.webp",
  "/image/hf_20260624_031304_521161b1-4241-402f-ac04-269c77faa46e.webp",
  "/image/hf_20260624_034927_b8bb8221-9ca7-40d3-8e79-2dde12a4b71a.webp",
  "/image/hf_20260624_021555_35069d3c-f0e3-4daa-a324-f61ace435bd1 (1).webp",
  "/image/테블러_표지01.webp",
  "/image/테블러_10.webp",
  "/image/테블러_10-1.webp",
  "/image/테블러_10-2.webp",
  "/image/테블러_10_0.webp",
];

export default function TablerCard() {
  const [lbSrc, setLbSrc] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLbSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <main className="app">
        <header className="hero">
          <div className="brand-mark">
            <span className="verified">
              <Icon name="ti-rosette-discount-check-filled" /> 공식 브랜드
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img" src="/image/logo.svg" alt="TKC&Co. 로고" />
          </div>
        </header>

        <div className="meta">
          <p className="tagline">
            ANYTIME, ANYWHERE <span>PLAY WITH TABLER</span>
          </p>
          <p className="desc">
            즐거움이 있는 곳을 따라 세계로 뻗어나간다는 미션으로 전개하고 있는
            <br />
            100% 국내생산! 테이블형 아이스박스 브랜드입니다.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <b>2025</b>
            <span>설립</span>
          </div>
          <div className="stat">
            <b>8+</b>
            <span>제품 라인</span>
          </div>
        </div>

        <p className="hl-line">
          즐거움과 함께하는
          <br />
          테이블형 아이스박스 <span className="highlight">테블러</span>
        </p>

        <h2 className="section-title">바로가기</h2>
        <nav className="links">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              className="link"
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="num">{i + 1}</span>
              <span className="ico">
                <Icon name={l.icon} />
              </span>
              <span className="meta-txt">
                <b>{l.title}</b>
                <small>{l.sub}</small>
              </span>
              <span className="dur">
                <Icon name="ti-chevron-right" />
              </span>
            </a>
          ))}
        </nav>

        <h2
          className="section-title"
          style={{ display: "flex", alignItems: "center", gap: 7 }}
        >
          <Icon
            name="ti-brand-instagram"
            style={{ fontSize: 18, color: "var(--green)" }}
          />{" "}
          피드
        </h2>
        <div className="feed">
          {FEED.map((src) => (
            <button
              key={src}
              type="button"
              className="feed-item"
              onClick={() => setLbSrc(src)}
              aria-label="이미지 확대"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
              <span className="feed-ov">
                <Icon name="ti-zoom-in" />
              </span>
            </button>
          ))}
        </div>

        <p className="foot">© 2026 TKC&amp;Co. · Tabler Brand Profile</p>
      </main>

      <div
        className={`lightbox${lbSrc ? " open" : ""}`}
        onClick={() => setLbSrc(null)}
      >
        <button className="lb-close" aria-label="닫기">
          <Icon name="ti-x" />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {lbSrc && <img src={lbSrc} alt="" />}
      </div>
    </>
  );
}
