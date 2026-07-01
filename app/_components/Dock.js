"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";

const LINKS = [
  { href: "tel:010-1234-1234", icon: "ti-phone", title: "전화" },
  { href: "mailto:info@tkcnco.com", icon: "ti-mail", title: "이메일" },
  {
    href: "https://www.instagram.com/yojm.taekyoung",
    icon: "ti-brand-instagram",
    title: "인스타그램",
    external: true,
  },
];

/* 연혁 (편집 가능) */
const HISTORY = [
  { year: "2016", text: "태경씨앤코 설립" },
  { year: "2019", text: "테블러(TABLER) 브랜드 런칭" },
  { year: "2021", text: "요즘곡간(YOZMGG) 브랜드 런칭" },
  { year: "2023", text: "요즘랩스 설립" },
  { year: "2026", text: "소상공인 브랜드 파트너십 확대" },
];

/* macOS-style dock with pointer-distance magnification (no deps) */
export default function Dock() {
  const ref = useRef(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  // 클릭 시 잠깐 커졌다 원상태로 (transition으로 팝 연출)
  const pop = (e) => {
    const item = e.currentTarget;
    item.style.setProperty("--s", "1.4");
    setTimeout(() => item.style.setProperty("--s", "1"), 170);
  };

  const share = async () => {
    const data = { title: "김태경 · TKC&Co.", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url);
        alert("링크가 복사되었습니다.");
      } else {
        window.prompt("링크 복사:", data.url);
      }
    } catch {
      /* 사용자 취소/미지원 무시 */
    }
  };

  return (
    <>
      <nav
        className="dock"
        ref={ref}
        aria-label="연락처"
      >
        {LINKS.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="dock-item"
            style={{ "--s": 1 }}
            aria-label={it.title}
            onClick={pop}
            {...(it.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <span className="dock-tip">{it.title}</span>
            <span className="dock-ico">
              <Icon name={it.icon} />
            </span>
          </a>
        ))}

        <button
          type="button"
          className="dock-item"
          style={{ "--s": 1 }}
          aria-label="공유하기"
          onClick={(e) => {
            pop(e);
            share();
          }}
        >
          <span className="dock-tip">공유하기</span>
          <span className="dock-ico">
            <Icon name="ti-arrow-up" />
          </span>
        </button>

        <button
          type="button"
          className="dock-item"
          style={{ "--s": 1 }}
          aria-label="연혁"
          onClick={(e) => {
            pop(e);
            setHistoryOpen(true);
          }}
        >
          <span className="dock-tip">연혁</span>
          <span className="dock-ico">
            <Icon name="ti-history" />
          </span>
        </button>
      </nav>

      <div
        className={`sheet-backdrop${historyOpen ? " is-open" : ""}`}
        onClick={() => setHistoryOpen(false)}
        aria-hidden={!historyOpen}
      />
      <div
        className={`sheet${historyOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="연혁"
      >
        <div className="sheet-grip" />
        <div className="sheet-head">
          <h3>연혁</h3>
          <button
            type="button"
            className="sheet-close"
            aria-label="닫기"
            onClick={() => setHistoryOpen(false)}
          >
            <Icon name="ti-x" />
          </button>
        </div>
        <ul className="timeline">
          {HISTORY.map((h) => (
            <li key={h.year} className="timeline-row">
              <span className="timeline-year">{h.year}</span>
              <span className="timeline-dot" />
              <span className="timeline-text">{h.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
