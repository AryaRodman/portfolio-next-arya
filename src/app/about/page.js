import React from "react";
import Image from "next/image";
import styles from "./about.module.css";

/* Foto untuk strip yang bergerak. Taruh file di: public/about/
   Tambah/ganti nama file di sini. Minimal 4 foto supaya terlihat bagus. */
const photos = [
    { src: "/about/arya.png", alt: "Arya Rodman" },
    { src: "/about/arya.png", alt: "Arya Rodman" },
    { src: "/about/arya.png", alt: "Arya Rodman" },
    { src: "/about/arya.png", alt: "Arya Rodman" },
];

/* Daftar link di bagian "Know me better" */
const links = [
    {
        label: "LinkedIn",
        desc: "Formal version: experience and what I am currently working on.",
        href: "https://www.linkedin.com/in/aryarodman/",
    },
    {
        label: "GitHub",
        desc: "Code, projects, and experiments that I create every day.",
        href: "https://github.com/AryaRodman",
    },
    {
        label: "Instagram",
        desc: "The other side of me off-screen.",
        href: "https://www.instagram.com/aryasqnzy/",
    },
    {
        label: "X",
        desc: "Random thoughts and brief notes.",
        href: "https://x.com/nonsensesko",
    },
];

const page = () => {
    return (
        <div className={styles.page}>
            {/* 2. PERKENALAN */}
            <section className={styles.intro}>
                <p>
                    Hello! I'm Arya Rodman Karale, you can call me Arya or Rodman. I'm a Software Engineering student at IPB University with a passion for building web and mobile applications. I enjoy turning ideas into functional, user-friendly digital experiences through clean code, creative problem-solving, and continuous learning.
                </p>
            </section>

             {/* 5. KNOW ME BETTER */}
            <section className={styles.know}>
                <h2>#KnowMeBetter</h2>
                <ul>
                    {links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                <span className={styles.linkLabel}>{link.label} &#8599;</span>
                                <span className={styles.linkDesc}>{link.desc}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* 6. AJAKAN KONTAK */}
            <section className={styles.cta}>
                <h2>Let's work together.</h2>
                <a
                    href="https://mail.google.com/mail/u/0/?fs=1&to=aryarodman@gmail.com&tf=cm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                >
                    Send message
                </a>
            </section>
        </div>
    );
};

export default page;