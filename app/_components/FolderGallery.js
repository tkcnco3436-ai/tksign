"use client";

import Link from "next/link";
import { useState } from "react";

export const CARDS = [
  {
    href: "/tabler",
    logo: "/image/logo.svg",
    title: "테블러 · TABLER",
    sub: "테이블형 아이스박스 브랜드",
    meta: "브랜드 명함",
  },
  {
    href: "/yozmgg",
    logo: "/image/landing_val.svg",
    title: "요즘곡간 · YOZMGG",
    sub: "발효 라이프스타일 브랜드",
    meta: "브랜드 명함",
  },
  {
    href: "/tkceo",
    logo: "/image/logo.svg",
    title: "TKC&Co.",
    sub: "대표이사 프로필",
    meta: "대표 명함",
  },
];

/* ---- interactive folder gallery (macOS-style open + fan-out) ---- */
export default function FolderGallery({ cards = CARDS }) {
  const [open, setOpen] = useState(false);
  const [front, setFront] = useState(null);
  const n = cards.length;
  const mid = (n - 1) / 2;

  return (
    <div
      className={`folder-stage${open ? " is-open" : ""}`}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      aria-label={open ? "명함 폴더 닫기" : "명함 폴더 열기"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      <span className="folder-back" aria-hidden="true" />

      <ul className="folder-cards">
        {cards.map((c, i) => {
          const off = i - mid;
          const style = {
            "--tx": `${off * 118}px`,
            "--ty": `${-176 + Math.abs(off) * 16}px`,
            "--rot": `${off * 11}deg`,
            "--d": `${0.04 + i * 0.06}s`,
            "--i": i,
            "--z": 12 - Math.abs(off),
          };
          return (
            <li
              key={c.href}
              className={`folder-card${front === i ? " is-front" : ""}`}
              style={style}
              onMouseEnter={() => setFront(i)}
              onMouseLeave={() => setFront((f) => (f === i ? null : f))}
            >
              <Link
                href={c.href}
                className="fc-link"
                onFocus={() => setFront(i)}
                onClick={(e) => {
                  if (!open) {
                    e.preventDefault();
                    setFront(i);
                    return;
                  }
                  e.stopPropagation();
                }}
              >
                <span className="fc-ico">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="fc-logo" src={c.logo} alt="" />
                </span>
                <span className="fc-txt">
                  <b>{c.title}</b>
                  <small>{c.sub}</small>
                </span>
                <span className="fc-meta">{c.meta}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <span className="folder-front" aria-hidden="true" />
    </div>
  );
}
