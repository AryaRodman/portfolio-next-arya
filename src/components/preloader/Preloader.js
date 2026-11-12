
"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

import "./preloader.css";

gsap.registerPlugin(useGSAP, CustomEase);

CustomEase.create("hop", "0.8, 0, 0.2, 1");

const images = [
    "/images/01.jpg",
    "/images/02.jpg",
    "/images/03.jpg",
    "/images/04.jpg",
    "/images/05.jpg",
];

const Preloader = ({ onComplete }) => {
    const container = useRef(null);
    const imageRefs = useRef([]);
    const counterColumns = useRef([]);

    useGSAP(() => {
        const columns = counterColumns.current;

        // Set initial image state
        gsap.set(imageRefs.current, {
            scale: 0.08,
            autoAlpha: 0,
            transformOrigin: "center center",
        });

        // Measure counter digit height
        const digitHeight = columns[0]
            .querySelector("span")
            .getBoundingClientRect().height;

        // Initial counter position
        gsap.set(columns, { y: 0 });

        // Main timeline
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(container.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: "power4.inOut",
                    onComplete,
                });
            },
        });

        // Image animations
        imageRefs.current.forEach((image, index) => {
            const startTime = index * 0.9;

            tl.to(
                image,
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.85,
                    ease: "hop",
                },
                startTime
            );

            // Hide previous image
            if (index !== images.length - 1) {
                tl.to(
                    image,
                    {
                        autoAlpha: 0,
                        duration: 0.2,
                        ease: "none",
                    },
                    startTime + 0.75
                );
            }
        });

        // Counter animation
        const progress = { value: 0 };
        const imageDuration = tl.duration();

        tl.to(
            progress,
            {
                value: 100,
                duration: imageDuration,
                ease: "none",

                onUpdate: () => {
                    const value = Math.floor(progress.value);

                    const hundreds = Math.floor(value / 100);
                    const tens = Math.floor(value / 10) % 10;
                    const ones = value % 10;

                    const digits = [hundreds, tens, ones];

                    digits.forEach((digit, index) => {
                        gsap.set(columns[index], {
                            y: -digit * digitHeight,
                        });
                    });
                },

                onComplete: () => {
                    [1, 0, 0].forEach((digit, index) => {
                        gsap.set(columns[index], {
                            y: -digit * digitHeight,
                        });
                    });
                },
            },
            0
        );

    }, { scope: container });

    return (
        <div className="preloader" ref={container}>
            <div className="preloader-content">

                <div className="preloader-frame">
                    {images.map((src, index) => (
                        <div
                            className="preloader-image"
                            key={src}
                            ref={(el) => {
                                imageRefs.current[index] = el;
                            }}
                        >
                            <img
                                src={src}
                                alt={`Preloader ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                <div className="preloader-counter">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            className="counter-column"
                            key={index}
                            ref={(el) => {
                                counterColumns.current[index] = el;
                            }}
                        >
                            {Array.from({ length: 10 }).map((_, digit) => (
                                <span key={digit}>{digit}</span>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Preloader;
