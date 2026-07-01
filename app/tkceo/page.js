"use client";

import Dock from "../_components/Dock";
import BentoGallery from "../_components/BentoGallery";
import Icon from "../_components/Icon";

const LINKS = [
  {
    href: "https://www.tkcnco.com/",
    icon: "ti-building-skyscraper",
    title: "태경씨앤코",
    sub: "tkcnco.com",
  },
  {
    href: "https://yojm.co.kr/",
    icon: "ti-flask",
    title: "요즘랩스",
    sub: "yojm.co.kr",
  },
];

const BRANDS = [
  {
    href: "https://tabler-tabler.com/",
    icon: "ti-building-store",
    title: "테블러 공식몰",
    sub: "tabler-tabler.com",
  },
  {
    href: "https://tabler-tabler.com/",
    icon: "ti-shopping-bag",
    title: "테블러 스마트스토어",
    sub: "네이버 스마트스토어",
  },
  {
    href: "https://smartstore.naver.com/yozmgokgan",
    icon: "ti-shopping-bag",
    title: "요즘곡간 스마트스토어",
    sub: "네이버 스마트스토어",
  },
];

const BRAND_LOGOS = [
  "/image/logo.svg",
  "/image/yozmgglogo.svg",
  "/image/tklogo.svg",
];

function VerticalCutReveal({ text, className, highlights = [] }) {
  const chars = [...text];
  const hl = new Set();
  highlights.forEach((w) => {
    let from = 0;
    let idx;
    while ((idx = text.indexOf(w, from)) !== -1) {
      for (let k = 0; k < w.length; k++) hl.add(idx + k);
      from = idx + w.length;
    }
  });
  return (
    <span className={`vcr${className ? ` ${className}` : ""}`} aria-label={text}>
      {chars.map((ch, i) =>
        ch === "\n" ? (
          <span className="vcr-break" key={i} aria-hidden="true" />
        ) : (
        <span className="vcr-char" key={i} aria-hidden="true">
          <span
            className={`vcr-inner${hl.has(i) ? " vcr-hl" : ""}`}
            style={{ animationDelay: `${i * 0.045}s` }}
          >
            {ch === " " ? " " : ch}
          </span>
        </span>
        )
      )}
    </span>
  );
}

export default function TkceoCard() {
  return (
    <>
      <main className="app tkceo-app">
        <header className="hero hero-tkceo">
          <video
            className="hero-video"
            src="/image/tkceo01.webm"
            poster="/image/tkceo.webp"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="brand-mark">
            <span className="ceo-name">
              <span className="ceo-title">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ceo-title-logo" src="/image/tklogo.svg" alt="태경씨앤코" />
                <span className="ceo-badge">
                  <span className="ceo-badge-dot" />
                  CEO
                </span>
              </span>
              <span className="ceo-name-row">
                <b>Kimtaekyoung</b>
                <span className="verified verified-sky">
                  <Icon name="ti-rosette-discount-check-filled" />
                </span>
              </span>
              <p className="ceo-greet">
                <VerticalCutReveal
                  text={"안녕하세요 소상공인을 위한\n브랜드를 만드는 김태경입니다."}
                  highlights={["소상공인", "김태경"]}
                />
              </p>
            </span>
          </div>
        </header>

        <div className="logo-marquee" aria-label="브랜드 로고">
          <div className="logo-track">
            {[0, 1].map((g) => (
              <div className="logo-group" key={g} aria-hidden={g === 1}>
                {BRAND_LOGOS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    className={`logo-slide${src.endsWith("/logo.svg") ? " logo-slide-sm" : ""}`}
                    src={src}
                    alt=""
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <BentoGallery />

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

        <h2 className="section-title">브랜드</h2>
        <nav className="links">
          {BRANDS.map((l, i) => (
            <a
              key={l.title}
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

        <p className="foot">© 2026 TKC&amp;Co. · Corporate Profile</p>
      </main>

      <Dock />
    </>
  );
}
