"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const TABLER = [
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
const YOZMGG = [
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

// 대표 이미지 + tabler/요즘곡간 피드 교차 배치
const ITEMS = [
  { src: "/image/tkceo_gall01.webp", title: "김태경" },
  { src: "/image/tkceo_gall02.webp", title: "김태경" },
  ...Array.from({ length: Math.max(TABLER.length, YOZMGG.length) }, (_, i) => [
    TABLER[i] && { src: TABLER[i], title: "테블러" },
    YOZMGG[i] && { src: YOZMGG[i], title: "요즘곡간" },
  ])
    .flat()
    .filter(Boolean),
];

export default function BentoGallery({ items = ITEMS, variant }) {
  const [active, setActive] = useState(null);
  const scroller = useRef(null);
  const drag = useRef({ down: false, startX: 0, left: 0, moved: false });

  const onDown = (e) => {
    drag.current = {
      down: true,
      startX: e.clientX,
      left: scroller.current.scrollLeft,
      moved: false,
    };
    scroller.current.classList.add("is-dragging");
  };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    scroller.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    scroller.current?.classList.remove("is-dragging");
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div
        className={`bento${variant === "mini" ? " bento-mini" : ""}`}
        aria-label="갤러리"
        ref={scroller}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            className={`bento-item${it.span ? ` bento-${it.span}` : ""}`}
            onClick={() => {
              if (drag.current.moved) return;
              setActive(i);
            }}
            aria-label={it.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={encodeURI(it.src)} alt={it.title} loading="lazy" />
            <span className="bento-cap">{it.title}</span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="bento-modal" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className="bento-modal-close" aria-label="닫기" onClick={() => setActive(null)}>
            <Icon name="ti-x" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeURI(items[active].src)}
            alt={items[active].title}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="bento-modal-cap">{items[active].title}</span>
        </div>
      )}
    </>
  );
}
