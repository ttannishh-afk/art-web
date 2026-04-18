"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export function Reveal({ 
  children, 
  width = "fit-content", 
  delay = 0,
  yOffset = 50,
  duration = 1.2
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: yOffset },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // when the top of the element hits 85% of the viewport height
            toggleActions: "play none none reverse", // play on enter, reverse on leave back
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width, position: "relative" }}>
      {children}
    </div>
  );
}
