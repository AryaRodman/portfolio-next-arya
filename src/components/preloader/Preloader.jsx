"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Anton } from "next/font/google";
import "./preloader.css";

const anton = Anton({ subsets: ["latin"], weight: "400" });

const IMAGES = [
  "/assets/preload/1.jpg",
  "/assets/preload/2.jpg",
  "/assets/preload/3.jpg",
  "/assets/preload/4.jpg",
];

// ms = berapa lama frame tampil. Putaran 1 lambat, putaran 2 cepat.
const SEQUENCE = [
  { type: "word", text: "NEED", ms: 380 },
  { type: "img", src: 0, ms: 260 },
  { type: "word", text: "MONEY", ms: 300 },
  { type: "img", src: 1, ms: 260 },
  { type: "word", text: "FOR", ms: 300 },
  { type: "img", src: 2, ms: 260 },
  { type: "word", text: "MY", ms: 300 },
  { type: "word", text: "PORSCHE", ms: 380 },

  { type: "img", src: 3, ms: 130 },
  { type: "word", text: "NEED", ms: 130 },
  { type: "img", src: 0, ms: 110 },
  { type: "word", text: "MONEY", ms: 130 },
  { type: "word", text: "FOR", ms: 170, invert: true },
  { type: "img", src: 2, ms: 110 },
  { type: "word", text: "MY", ms: 130 },
  { type: "word", text: "PORSCHE", ms: 200 },
  { type: "img", src: 1, ms: 130 },
];

const COLLAPSE_MS = 380;
const OPEN_MS = 800;

export default function Preloader({ onComplete }) {
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("run"); // run | collapse | open

  const wordRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const frame = SEQUENCE[Math.min(idx, SEQUENCE.length - 1)];

  // kunci scroll selama preload
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // preload gambar dulu (maks 2 detik) supaya tidak kedip kosong
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    let loaded = 0;
    IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (++loaded === IMAGES.length) finish();
      };
      img.src = src;
    });
    const t = setTimeout(finish, 2000);
    return () => clearTimeout(t);
  }, []);

  // jalankan urutan frame dengan hard cut
  useEffect(() => {
    if (!ready) return;

    if (idx >= SEQUENCE.length) {
      setPhase("collapse");
      const t1 = setTimeout(() => setPhase("open"), COLLAPSE_MS);
      const t2 = setTimeout(
        () => onCompleteRef.current?.(),
        COLLAPSE_MS + OPEN_MS
      );
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const t = setTimeout(() => setIdx((i) => i + 1), SEQUENCE[idx].ms);
    return () => clearTimeout(t);
  }, [idx, ready]);

  // kata dibuat selebar layar (maks 80% tinggi layar)
  useLayoutEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    el.style.fontSize = "100px";
    const w = el.getBoundingClientRect().width || 1;
    const size = Math.min(
      (100 * window.innerWidth * 0.9) / w,
      window.innerHeight * 0.8
    );
    el.style.fontSize = `${size}px`;
  }, [idx, ready]);

  const showWord = ready && idx < SEQUENCE.length && frame.type === "word";
  const showImg = ready && idx < SEQUENCE.length && frame.type === "img";
  const invert = showWord && frame.invert;

  return (
    <div className={`preloader ${anton.className} is-${phase}`} aria-hidden="true">
      <div className="preloader-panel top" />
      <div className="preloader-panel bottom" />

      <div className={`preloader-stage ${invert ? "invert" : ""}`}>
        {showWord && (
          <span ref={wordRef} className="preloader-word">
            {frame.text}
          </span>
        )}

        {showImg && (
          <img
            className="preloader-img"
            src={IMAGES[frame.src]}
            alt=""
            draggable={false}
          />
        )}

        <div className="preloader-grain" />
      </div>
    </div>
  );
}