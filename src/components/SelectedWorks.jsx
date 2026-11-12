"use client";

import { useEffect, useRef, useState } from "react";
import { Instrument_Serif } from "next/font/google";
import "./selected-work.css";
import Copy from "@/components/Copy";


const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const info = [
  {
    label: "Role",
    lines: ["UX/UI & Designer", "Frontend Developer", "Web Developer", "Fullstack Developer", "Mobile Developer"],
  },
  {
    label: "Services",
    lines: [
      "Product & UX",
      "Web & Systems",
    ],
  },
  {
    label: "Recognition",
    lines: [
      "Telkom UI UX Designer Young multimedia designer",
    ],
  },
  {
    label: "Based in",
    lines: ["Bogor, Indonesia"],
  },
];

// Ganti image dengan screenshot project kamu (taruh di /public/assets/work/)
const projects = [
  {
    title: "SaprasApp",
    description:
      "A web-based inventory management system for managing assets, organizing locations and categories, and monitoring borrowed items with dynamic website customization.",
    tags: "Inventory Management · Web Application",
    tools: "Laravel · MySQL",
    image: "/assets/work/sapras.png",
    bg: "#75bfea",
    href: "#",
  },
  {
    title: "RentCourt",
    description:
      "A mobile application designed to simplify sports court reservations, allowing users to explore facilities, book available courts, and manage payments.",
    tags: "Sports · Booking · Mobile Application",
    tools: "Flutter · Dart",
    image: "/assets/work/rentcourt.jpg",
    bg: "#0f6b4f",
    href: "#",
  },
  {
    title: "Cashier",
    description:
      "A web-based point-of-sale system for managing products, categories, invoices, and members, including tracking outstanding bills and transaction histories.",
    tags: "Point of Sale · Inventory · Web Application",
    tools: "Laravel · MySQL",
    image: "/assets/work/cashier.png",
    bg: "#3b3bd6",
    href: "#",
  },
  {
    title: "BukuTamu",
    description:
      "A mobile application UI/UX design that streamlines school visitor registration through an intuitive and user-friendly digital check-in experience.",
    tags: "UI/UX Design · Education · Mobile Application",
    tools: "Figma",
    image: "/assets/work/bukutamu.png",
    bg: "#e9e4da",
    href: "#",
  },
];

export default function SelectedWork() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef([]);

  // Project yang melewati tengah layar jadi "aktif"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const current = projects[active];

  return (
    <section className="work">
      <div className="work-info">
        {info.map((col) => (
          <div className="work-info-col" key={col.label}>
            <span className="work-tag">{col.label}</span>
            {col.lines.map((line) => (
              <Copy blockColor="#fe0100">
                <p key={line}>{line}</p>
              </Copy>
            ))}
          </div>
        ))}
      </div>

      <div className="work-stage">
        {/* KIRI: nempel (sticky) selama project di kanan di-scroll */}
        <aside className="work-left">
          <h2 className={`work-title ${serif.className}`}>Selected work</h2>

          <ul className="work-list">
            {projects.map((project, i) => (
              <li
                key={project.title}
                className={i === active ? "is-active" : ""}
                onClick={() => goTo(i)}
              >
                <span className="work-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="work-name">{project.title}</span>
                {i === active && <span className="work-dot" />}
              </li>
            ))}
          </ul>

          <div className="work-detail" key={active}>
            <p className="work-desc">{current.description}</p>
            <p className="work-meta">{current.tags}</p>
            <p className="work-meta">Tools {current.tools}</p>
            {/* <a className="work-link" href={current.href}>
              View case ↗
            </a> */}
          </div>

          <span className="work-counter">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </aside>

        {/* KANAN: daftar project yang ikut ter-scroll */}
        <div className="work-right">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="work-card"
              data-index={i}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <h3 className="work-card-title">{project.title}</h3>
              <div className="work-preview" style={{ background: project.bg }}>
                <img src={project.image} alt={project.title} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}