"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import SmokeBackground from "@/components/SmokeBackground";
import "./hero.css";

export default function Hero() {
  const ref = useRef(null);

  // progress 0 -> 1 selama hero tertutup section berikutnya
  useLenis(({ scroll }) => {
    const el = ref.current;
    if (!el) return;
    const p = Math.min(Math.max(scroll / window.innerHeight, 0), 1);
    el.style.setProperty("--p", p.toFixed(4));
  });

  return (
    <section className="hero" ref={ref}>
      <SmokeBackground />
      <div className="name">
        <h1>Arya Rodman</h1>
      </div>
    </section>
  );
}