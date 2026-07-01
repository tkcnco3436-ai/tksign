"use client";

import { useEffect, useState } from "react";
import Icon from "../_components/Icon";

const LINKS = [
  {
    href: "https://smartstore.naver.com/yozmgokgan",
    icon: "ti-shopping-bag",
    title: "스마트스토어",
    sub: "네이버 스마트스토어",
  },
  {
    href: "https://www.instagram.com/yozmgg_com/",
    icon: "ti-brand-instagram",
    title: "인스타그램",
    sub: "@yozmgg_com",
  },
];

const FEED = [
  "/image/발효청_01.webp",
  "/image/발효청_05.webp",
  "/image/발효청_06.webp",
  "/image/발효청_07.webp",
  "/image/발효청_08.webp",
  "/image/발효청_09.webp",
  "/image/발효청_10.webp",
  "/image/발효청_11.webp",
  "/image/발효청_12.webp",
];

export default function YozmggCard() {
  const [lbSrc, setLbSrc] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLbSrc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="light">
      <main className="app">
        <header className="hero hero-photo">
          <div className="brand-mark">
            <span className="verified">
              <Icon name="ti-rosette-discount-check-filled" /> 공식 브랜드
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo-img" src="/image/yozmgglogo.svg" alt="YOZMGG 로고" />
          </div>
        </header>

        <div className="meta">
          <p className="tagline">
            NEW VALHYO SYRUP BRAND <span>YOZMGOKGAN</span>
          </p>
          <p className="desc">
            부산 강서구 대저동에서 자란
            <br />
            토마토를 가지고 인공색소와 방부제 없이 발효라는 정직한 방법으로 만든
            <br />
            토마토 발효청을 중심으로 다양한 식품을 만드는 브랜드입니다.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <b>2025</b>
            <span>설립</span>
          </div>
          <div className="stat">
            <b>2+</b>
            <span>제품 라인</span>
          </div>
        </div>

        <p className="hl-line">
          즐거운 먹거리를 만드는
          <br />
          <span className="highlight">요즘곡간</span>
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

        <p className="foot">© 2026 YOZMGG · Brand Profile</p>
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
    </div>
  );
}
