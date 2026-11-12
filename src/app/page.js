"use client";

import Copy from "@/components/Copy";
import { useState } from "react";
import { ReactLenis } from "lenis/react";

import Preloader from "@/components/preloader/Preloader";
import Menu from "@/components/menu/Menu";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWorks";

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ReactLenis root options={{ lerp: 0.085, wheelMultiplier: 1 }}>
            <>
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

                <Menu />

                <Hero />

                <section className="intro">
                    <div className="page-content hero">
                        <div className="section-bg">
                            <img
                                src="/assets/home.jpg"
                                alt="Arya Rodman"
                            />
                        </div>
                        <Copy blockColor="#fe0100">
                            <h1>
                                Welcome to my portfolio.
                            </h1>
                        </Copy>
                    </div>
                </section>

                <SelectedWork />
            </>
        </ReactLenis>
    );
}