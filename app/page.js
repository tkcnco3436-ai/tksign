"use client";

// online business card platform landing — redeploy 3
import { useEffect, useRef, useState } from "react";
import FolderGallery, { CARDS } from "./_components/FolderGallery";
import Icon from "./_components/Icon";

const ROTATING = ["명함", "포트폴리오", "브랜드 링크", "프로필"];

/* ---- animated dotted surface (flowing wave of dots) ---- */
function DottedSurface() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    const GAP = 30;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (let x = 0; x <= w; x += GAP) {
        for (let y = 0; y <= h; y += GAP) {
          // traveling waves -> simulated surface depth
          const wave =
            Math.sin(x * 0.018 + t) +
            Math.sin(y * 0.022 + t * 0.8) +
            Math.sin((x + y) * 0.012 + t * 1.2);
          const n = (wave + 3) / 6; // 0..1
          const radius = 0.5 + n * 1.7;
          const alpha = 0.06 + n * 0.34;
          ctx.beginPath();
          ctx.arc(x, y - n * 6, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(235, 235, 240, ${alpha})`;
          ctx.fill();
        }
      }
      t += 0.018;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="dotgrid" aria-hidden="true" />;
}

export default function Landing() {
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="nexus">
      <header className="nexus-header">
        <div className="nh-pill">
          <a className="nh-brand" href="#top" aria-label="홈">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nh-mark" src="/image/landinglogo.svg" alt="로고" />
          </a>
          <a href="#cards" className="nh-signup">명함 둘러보기</a>
        </div>
      </header>

      <DottedSurface />

      <section className="nexus-hero">
        <h1 className="nexus-title">
          하나의 링크로 전하는
          <br />
          나만의{" "}
          <span className="nexus-rotate" key={word}>
            {ROTATING[word]}
          </span>
        </h1>

        <p className="nexus-sub">
          브랜드·제품·SNS를 한 페이지에. 카드를 스와이프해 명함을 열어보세요.
        </p>

        <div className="nexus-cta">
          <a className="btn-primary" href="#cards">
            <Icon name="ti-cards" /> 명함 둘러보기
          </a>
        </div>
      </section>

      <section className="nexus-cards" id="cards">
        <h2 className="cards-head">
          <span>명함 목록</span>
          <small>
            <Icon name="ti-hand-finger" /> 폴더를 눌러 펼치기
          </small>
        </h2>
        <FolderGallery cards={CARDS} />
      </section>

      <p className="nexus-foot">© 2026 TKC&amp;Co. · Online Business Card Platform</p>
    </main>
  );
}
