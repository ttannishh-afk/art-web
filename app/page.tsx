"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Heart,
  MoveRight,
  Newspaper,
  Palette,
  PanelTop,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroVideos = [
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/river.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/beer.mp4",
];

const serviceItems = [
  {
    id: "murals",
    title: "Murals & Spatial Art",
    subtitle: "Walls With A Voice",
    description:
      "Walls have always had something to say. We help them say it in colour, expression, and a way you cannot ignore, turning blank surfaces into stories people stop for.",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1200",
    color: "text-amber-800",
    bg: "bg-amber-100",
    icon: PanelTop,
    align: "left",
    href: "/murals-spatial-art",
  },
  {
    id: "corporate",
    title: "Corporate Art Experiences",
    subtitle: "Culture In Motion",
    description:
      "Live art activations and hands-on workshops that break routine, encourage collaboration, and build genuine engagement. Because the companies that invest in culture, build it.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    color: "text-zinc-700",
    bg: "bg-zinc-100",
    icon: BriefcaseBusiness,
    align: "right",
    href: "/corporate-art-experiences",
  },
  {
    id: "weddings",
    title: "Weddings & Private Events",
    subtitle: "Celebrations That Stay",
    description:
      "The flowers will fade. The food will be forgotten. But the art stays. We create interactive guest experiences that become the most talked-about moment of your celebration.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    color: "text-rose-600",
    bg: "bg-rose-100",
    icon: Heart,
    align: "left",
    href: "/weddings-private-events",
  },
  {
    id: "canvases",
    title: "Commissioned Canvases",
    subtitle: "Made Only For You",
    description:
      "Art made for you should feel like it could never belong to anyone else. We take commissions from anyone with a vision, a feeling, or simply a wall that deserves better.",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1200",
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    icon: Palette,
    align: "right",
    href: "/commissioned-canvases",
  },
];

const awards = [
  {
    title: "Distinguished Alumna",
    source: "Maitreyi College",
    icon: Trophy,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Chief Guest",
    source: "Ramjas International School",
    icon: Star,
    tone: "bg-rose-100 text-rose-600",
  },
  {
    title: "Creative Educator",
    source: "Featured mural and workshop artist",
    icon: ShieldCheck,
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const testimonials = [
  {
    title: "Event Experience",
    source: "A regular event became something people genuinely remembered.",
    icon: Quote,
    tone: "bg-rose-100 text-rose-600",
  },
  {
    title: "Spatial Shift",
    source: "The mural changed how the space felt the moment people walked in.",
    icon: PanelTop,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Creative Partnership",
    source: "Warm, organised, and wildly creative from first call to final brushstroke.",
    icon: Heart,
    tone: "bg-blue-100 text-blue-700",
  },
];

const press = [
  {
    title: "Delhi Times",
    source: "Press feature",
    icon: Newspaper,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    title: "The Financial Express",
    source: "Editorial mention",
    icon: Building2,
    tone: "bg-zinc-100 text-zinc-700",
  },
  {
    title: "So Delhi & ABP News",
    source: "Culture coverage",
    icon: Sparkles,
    tone: "bg-purple-100 text-purple-700",
  },
];

const clients = [
  "Bain & Co.",
  "Google",
  "BCG",
  "Amex",
  "Reckitt",
  "Protiviti",
  "Dhruva Advisors",
  "Houlihan Lokey",
  "Incuspaze",
  "RHI Magnesita",
  "Go Live Global",
  "T&A Consulting",
  "Gartner",
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const founderEndRef = useRef<HTMLDivElement>(null);
  const founderSectionRef = useRef<HTMLElement>(null);
  const founderNameRef = useRef<HTMLHeadingElement>(null);

  const anchorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setAnchor = (index: number) => (el: HTMLDivElement | null) => {
    anchorsRef.current[index] = el;
  };

  const [activeVideo, setActiveVideo] = useState(0);
  const [pathStr, setPathStr] = useState("");
  const [samples, setSamples] = useState<{ x: number; y: number; angle: number; progress: number; virtualY: number }[]>([]);
  const [pathLength, setPathLength] = useState(0);
  const [drips, setDrips] = useState<{ x: number; y: number; r: number; progress: number }[]>([]);
  const dripsState = useRef<{ active: boolean }[]>([]);
  const [splashes, setSplashes] = useState<
    { id: number; x: number; y: number; size: number; color: string; blur: number }[]
  >([]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVideo((current) => (current + 1) % heroVideos.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const colors = [
      "bg-rose-300/30",
      "bg-blue-300/30",
      "bg-amber-300/30",
      "bg-emerald-300/30",
      "bg-purple-300/30",
      "bg-fuchsia-300/30",
      "bg-cyan-300/30",
      "bg-teal-300/30",
      "bg-pink-300/30",
      "bg-indigo-300/30",
    ];
    const newSplashes = Array.from({ length: 6 + Math.floor(Math.random() * 4) }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: 80 + Math.random() * 60,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSplashes(newSplashes);
  }, []);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const calculate = useCallback(() => {
    const validAnchors = anchorsRef.current.filter((anchor): anchor is HTMLDivElement => Boolean(anchor));
    if (validAnchors.length < 2 || !mainRef.current) return;

    const getCenter = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const parentRect = mainRef.current!.getBoundingClientRect();
      return {
        x: Math.round(rect.left - parentRect.left + rect.width / 2),
        y: Math.round(rect.top - parentRect.top + rect.height / 2),
      };
    };

    const lastIndex = validAnchors.length - 1;
    const newPathStr = validAnchors.reduce((acc, ref, i) => {
      const pos = getCenter(ref);
      if (i === 0) return `M ${pos.x},${pos.y}`;
      const prev = getCenter(validAnchors[i - 1]);
      const dy = Math.abs(pos.y - prev.y);

      if (ref.dataset.pathMode === "circle" || validAnchors[i - 1].dataset.pathMode === "circle") {
        const dx = pos.x - prev.x;
        return `${acc} C ${prev.x + dx * 0.65},${prev.y} ${pos.x - dx * 0.65},${pos.y} ${pos.x},${pos.y}`;
      }

      if (i === lastIndex) {
        return `${acc} C ${prev.x},${pos.y - dy * 0.7} ${pos.x},${prev.y + dy * 0.3} ${pos.x},${pos.y}`;
      }

      const cy1 = Math.round(prev.y + dy * 0.4);
      const cy2 = Math.round(pos.y - dy * 0.4);
      return `${acc} C ${prev.x},${cy1} ${pos.x},${cy2} ${pos.x},${pos.y}`;
    }, "");

    setPathStr((prev) => (prev === newPathStr ? prev : newPathStr));
  }, []);

  useEffect(() => {
    calculate();
    let lastWidth = 0;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      if (Math.abs(width - lastWidth) > 2) {
        lastWidth = width;
        requestAnimationFrame(calculate);
      }
    });
    if (mainRef.current) observer.observe(mainRef.current);
    window.addEventListener("load", calculate);
    return () => {
      observer.disconnect();
      window.removeEventListener("load", calculate);
    };
  }, [calculate]);

  useEffect(() => {
    if (!pathStr || !pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    if (length === 0) return;
    setPathLength(length);

    const numSamples = 1500;
    const newSamples: { x: number; y: number; angle: number; progress: number; virtualY: number }[] = [];
    let prevPt = pathRef.current.getPointAtLength(0);

    for (let i = 0; i <= numSamples; i++) {
      const progress = i / numSamples;
      const pt = pathRef.current.getPointAtLength(progress * length);
      let angle = 90;
      if (i > 0) {
        const dx = pt.x - prevPt.x;
        const dy = pt.y - prevPt.y;
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
      }
      newSamples.push({ x: pt.x, y: pt.y, angle, progress, virtualY: pt.y });
      prevPt = pt;
    }
    if (newSamples.length > 1) newSamples[0].angle = newSamples[1].angle;

    // Ensure strictly monotonically increasing for the rest of the array
    let currentMaxY = newSamples[0].virtualY;
    for (let i = 1; i <= numSamples; i++) {
        currentMaxY = Math.max(currentMaxY, newSamples[i].y);
        newSamples[i].virtualY = currentMaxY;
    }

    setSamples(newSamples);

    const numDrips = 90;
    const newDrips = [];
    for (let i = 1; i < numDrips; i++) {
      const pt = pathRef.current.getPointAtLength((i / numDrips) * length);
      const randX = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const randY = (Math.sin(i * 78.233) * 43758.5453) % 1;
      const rx = Math.round(pt.x + (randX - 0.5) * 140);
      const ry = Math.round(pt.y + (randY - 0.5) * 140);
      const r = Math.max(3, Math.round(Math.abs(randX) * 14));
      newDrips.push({ x: rx, y: ry, r, progress: i / numDrips });
    }
    setDrips(newDrips);
    dripsState.current = newDrips.map(() => ({ active: false }));

    const founderName = founderNameRef.current;
    if (founderName && pathRef.current && mainRef.current) {
       const pathBBox = pathRef.current.getBBox();
       const rect = founderName.getBoundingClientRect();
       const mainTop = mainRef.current.getBoundingClientRect().top;
       const founderNameMiddleY = (rect.top - mainTop) + (rect.height / 2);
       const percent = Math.min(100, Math.max(0, ((founderNameMiddleY - pathBBox.y) / pathBBox.height) * 100));
       gsap.set(".trail-grad-split", { attr: { offset: `${percent}%` } });
       gsap.set("stop:nth-child(3)", { attr: { offset: `${percent + 5}%` } });
    }
  }, [pathStr]);

  useGSAP(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = window.innerWidth / 2;
    let trailY = window.innerHeight / 2;
    let currentIsBlue = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorRef.current, { x: mouseX, y: mouseY, duration: 0, ease: "none" });
    };
    window.addEventListener("mousemove", onMouseMove);

    const updateCursor = () => {
      if (!cursorTrailRef.current) return;
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      gsap.set(cursorTrailRef.current, { x: trailX, y: trailY });
    };
    gsap.ticker.add(updateCursor);

    const links = document.querySelectorAll("a, button");
    const onHover = () => {
      if (!cursorTrailRef.current || !cursorRef.current) return;
      gsap.to(cursorTrailRef.current, { scale: 1.5, borderColor: currentIsBlue ? "#2563eb" : "#e11d48", duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 });
    };
    const onLeave = () => {
      if (!cursorTrailRef.current || !cursorRef.current) return;
      gsap.to(cursorTrailRef.current, { scale: 1, borderColor: currentIsBlue ? "#93c5fd" : "#fca5a5", duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    };
    links.forEach((link) => {
      link.addEventListener("mouseenter", onHover);
      link.addEventListener("mouseleave", onLeave);
    });

    if (samples.length === 0 || !mainRef.current || !dropRef.current || !pathRef.current) return;

    gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const scrollObj = { target: window.scrollY, current: window.scrollY };
    const onScroll = () => (scrollObj.target = window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });

    const absoluteParentTop = window.scrollY + mainRef.current.getBoundingClientRect().top;

    const update = () => {
      scrollObj.current += (scrollObj.target - scrollObj.current) * 0.08;
      const smoothedParentTop = absoluteParentTop - scrollObj.current;
      let docY = window.innerHeight / 2 - smoothedParentTop;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, Math.max(0, scrollObj.current / maxScroll));

      if (scrollProgress > 0.85) {
        const finalY = samples[samples.length - 1].y;
        const factor = Math.pow((scrollProgress - 0.85) * (1 / 0.15), 1.5);
        docY += (finalY - docY) * Math.min(1, factor);
      }

      let left = 0;
      let right = samples.length - 1;
      let closest = samples[0];
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (samples[mid].virtualY === docY) {
          closest = samples[mid];
          break;
        } else if (samples[mid].virtualY < docY) {
          closest = samples[mid];
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      if (docY <= samples[0].virtualY) closest = samples[0];
      if (docY >= samples[samples.length - 1].virtualY) closest = samples[samples.length - 1];

      const founderName = founderNameRef.current;
      if (founderName) {
         const rect = founderName.getBoundingClientRect();
         const mainTop = mainRef.current!.getBoundingClientRect().top;
         const founderNameMiddleY = (rect.top - mainTop) + (rect.height / 2);
         const newIsBlue = docY > founderNameMiddleY;
         if (newIsBlue !== currentIsBlue) {
            currentIsBlue = newIsBlue;
            gsap.to(cursorRef.current, { backgroundColor: currentIsBlue ? "#2563eb" : "#e11d48", duration: 0.5 });
            gsap.to(cursorTrailRef.current, { borderColor: currentIsBlue ? "#93c5fd" : "#fca5a5", duration: 0.5 });
            if (dropRef.current) gsap.to(dropRef.current.querySelector("path"), { fill: currentIsBlue ? "#2563eb" : "#e11d48", duration: 0.5 });
            gsap.to("[class^='drip-']", { fill: currentIsBlue ? "#2563eb" : "#e11d48", duration: 0.5 });
            
            // Transition the trail-grad bottom parts
            gsap.to(".trail-grad-bottom", { stopColor: currentIsBlue ? "#2563eb" : "#e11d48", duration: 0.5 });
         }
      }

      gsap.set(dropRef.current, {
        x: closest.x,
        y: closest.y,
        rotation: closest.angle + "_short",
      });

      gsap.set(pathRef.current, {
        strokeDashoffset: pathLength * (1 - closest.progress),
      });

      drips.forEach((drip, i) => {
        const state = dripsState.current[i];
        if (!state) return;
        if (closest.progress >= drip.progress && !state.active) {
          state.active = true;
          gsap.to(`.drip-${i}`, {
            opacity: 0.9,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1.2, 0.4)",
            overwrite: "auto",
          });
        } else if (closest.progress < drip.progress && state.active) {
          state.active = false;
          gsap.to(`.drip-${i}`, { opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
        }
      });
    };

    gsap.ticker.add(update);

    const revealElements = gsap.utils.toArray<HTMLElement>(".reveal-element");
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    const fadeElements = gsap.utils.toArray<HTMLElement>(".reveal-fade");
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(update);
      gsap.ticker.remove(updateCursor);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onHover);
        link.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [samples, pathLength, drips]);

  return (
    <div
      ref={mainRef}
      className="relative w-full bg-[#fdfbf7] overflow-hidden text-zinc-900 selection:bg-rose-500 selection:text-white font-sans md:cursor-none"
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-rose-600 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={cursorTrailRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-rose-300 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-60"
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {splashes.map((splash) => (
          <div
            key={splash.id}
            className={`absolute rounded-full ${splash.color} mix-blend-multiply`}
            style={{
              left: `${splash.x}vw`,
              top: `${splash.y}vh`,
              width: `${splash.size}vw`,
              height: `${splash.size}vw`,
              transform: "translate(-50%, -50%)",
              filter: `blur(${splash.blur}px)`,
            }}
          />
        ))}
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        <path
          ref={pathRef}
          d={pathStr}
          stroke="url(#trail-grad)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-90"
        />
        <defs>
          <linearGradient id="trail-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="50%" stopColor="#e11d48" className="trail-grad-split" />
            <stop offset="55%" stopColor="#e11d48" className="trail-grad-bottom" />
            <stop offset="100%" stopColor="#e11d48" className="trail-grad-bottom" />
          </linearGradient>
        </defs>
        {drips.map((drip, i) => (
          <circle
            key={i}
            cx={drip.x}
            cy={drip.y}
            r={drip.r}
            fill="#e11d48"
            className={`drip-${i} opacity-0 drop-shadow-sm`}
          />
        ))}
      </svg>

      <div
        ref={dropRef}
        className="absolute top-0 left-0 w-[40px] h-[40px] -mt-[20px] -ml-[20px] z-10 pointer-events-none opacity-0"
        style={{ opacity: pathStr ? 1 : 0, transition: "opacity 0.5s" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M 32 20 C 32 20 14 6 10 12 C 6 18 6 22 10 28 C 14 34 32 20 32 20 Z" fill="#e11d48" />
        </svg>
      </div>

      <div className="relative z-20 w-full pointer-events-none">
        <section className="min-h-screen w-full pt-16 pointer-events-auto relative">
          <div className="relative h-[calc(100vh-4rem)] min-h-[620px] overflow-hidden bg-zinc-950">
            {heroVideos.map((src, index) => (
              <video
                key={src}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  activeVideo === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </section>

        <section className="relative px-6 md:px-10 py-24 md:py-32 pointer-events-auto overflow-hidden">
          <div className="relative max-w-5xl mx-auto text-center">
            <svg
              viewBox="0 0 420 380"
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 z-0 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 text-rose-600 opacity-20"
            >
              <motion.path
                d="M210 342 C122 270 49 210 47 130 C45 70 90 36 139 45 C169 50 194 72 210 104 C226 72 251 50 281 45 C330 36 375 70 373 130 C371 210 298 270 210 342 Z"
                fill="currentColor"
                animate={{
                  d: [
                    "M210 342 C122 270 49 210 47 130 C45 70 90 36 139 45 C169 50 194 72 210 104 C226 72 251 50 281 45 C330 36 375 70 373 130 C371 210 298 270 210 342 Z",
                    "M210 348 C118 272 52 214 45 134 C40 73 88 34 140 47 C173 55 194 76 210 108 C226 76 247 55 280 47 C332 34 380 73 375 134 C368 214 302 272 210 348 Z",
                    "M210 342 C122 270 49 210 47 130 C45 70 90 36 139 45 C169 50 194 72 210 104 C226 72 251 50 281 45 C330 36 375 70 373 130 C371 210 298 270 210 342 Z",
                  ],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>

            <div className="relative z-10">
              <p className="reveal-element font-serif text-4xl md:text-6xl leading-tight text-zinc-900">
                Each project we undertake carries a story.
                <br />
                Every experience we host is done with intention.
              </p>
              <div className="reveal-element mt-10 max-w-3xl mx-auto space-y-5 text-lg md:text-2xl text-zinc-600 font-light leading-relaxed">
                <p>We believe the world needs more art. More feeling. More expression.</p>
                <p>
                  Because without it, everything feels a little too monochrome. Follow the flow of
                  creativity.
                </p>
              </div>
            </div>
            <div ref={setAnchor(0)} className="absolute left-1/2 top-[calc(50%+260px)] z-30 h-1 w-1 -translate-x-1/2 max-md:top-[calc(50%+34vw)]" />
          </div>
        </section>

        <div className="w-full flex flex-col gap-32 md:gap-48 py-20 pointer-events-auto overflow-hidden">
          {serviceItems.map((item, index) => {
            const isLeft = item.align === "left";
            const anchorIndex = index + 1;

            return (
              <section
                key={item.id}
                className="relative w-full px-6 md:px-12 flex items-center justify-center min-h-[70vh]"
              >
                <div
                  ref={setAnchor(anchorIndex)}
                  className={`absolute top-1/2 w-1 h-1 ${
                    isLeft ? "right-[15%] md:right-[25%]" : "left-[15%] md:left-[25%]"
                  }`}
                />

                <div
                  className={`max-w-7xl mx-auto w-full flex flex-col ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-12 lg:gap-24`}
                >
                  <div className="w-full md:w-1/2 reveal-element">
                    <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/60">
                      <Image
                        src={item.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.03] group-hover:-rotate-1 transition-transform duration-[1.5s] ease-out"
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  <div
                    className={`w-full md:w-1/2 flex flex-col ${
                      isLeft ? "items-start text-left" : "items-end text-right md:items-start md:text-left"
                    } reveal-element`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-8 ${item.color} shadow-sm border border-white/50`}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>

                    <span className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${item.color}`}>
                      {item.subtitle}
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 text-zinc-900 tracking-tight hover:translate-x-2 transition-transform duration-300 cursor-default">
                      {item.title}
                    </h2>
                    <p className="text-zinc-600 font-light text-lg md:text-xl leading-relaxed max-w-md mb-10 hover:text-zinc-800 transition-colors duration-300 cursor-default">
                      {item.description}
                    </p>

                    <Link
                      href={item.href}
                      className={`group flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${item.color} hover:opacity-70 transition-opacity`}
                    >
                      Explore <MoveRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <section ref={founderSectionRef} className="relative min-h-screen px-6 md:px-12 py-24 pointer-events-auto">
          <div ref={setAnchor(5)} className="absolute top-[18%] right-[18%] h-1 w-1" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr_0.85fr] gap-12 items-center">
            <div className="reveal-element order-3 lg:order-1">
              <Quote className="w-10 h-10 text-rose-400 mb-8" />
              <p className="font-serif text-3xl md:text-4xl leading-tight text-zinc-900 mb-8">
                I was never supposed to be an artist, at least not on paper. But here I am, adding
                more colours and design into our monochrome world.
              </p>
              <p className="text-zinc-600 leading-relaxed text-lg">
                Entirely self taught, Tanvi built LEHER one project, one wall, and one experience
                at a time. Her work now lives across offices, homes, events, galleries, and
                collaborations across India.
              </p>
            </div>

            <div className="relative reveal-element order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2.5rem] border border-white/70 bg-rose-50 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200"
                  alt="Founder portrait placeholder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative reveal-element order-2 lg:order-3 text-left lg:text-right">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-rose-600 block mb-5">
                Meet Our Founder
              </span>
              <div className="relative mb-8 inline-block py-10 pl-10 pr-12 lg:pl-12 lg:pr-10">
                <div ref={setAnchor(6)} className="absolute top-[30%] left-[18%] h-1 w-1" />
                <h2 ref={founderNameRef} className="relative font-serif text-5xl md:text-7xl leading-[0.92] mb-6">Tanvi Bansal</h2>
                <p className="relative text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Founder & Artist
                </p>
                <div ref={setAnchor(7)} className="absolute bottom-[0%] right-[18%] h-1 w-1" />
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-rose-600 hover:text-rose-800 transition-colors"
              >
                Click to know more <MoveRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div ref={founderEndRef} className="absolute bottom-0 left-0 w-full h-1" />
        </section>

        <section className="relative px-6 md:px-10 py-24 pointer-events-auto">
          <div ref={setAnchor(9)} className="absolute top-1/2 left-[22%] w-1 h-1" />
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { title: "Awards", icon: Award, items: awards, color: "text-amber-700", bg: "bg-amber-50" },
              { title: "Testimonials", icon: Quote, items: testimonials, color: "text-rose-600", bg: "bg-rose-50" },
              { title: "Press & Articles", icon: Newspaper, items: press, color: "text-blue-700", bg: "bg-blue-50" },
            ].map((column) => (
              <div
                key={column.title}
                className="pause-on-hover reveal-element bg-white/80 backdrop-blur border border-white/70 rounded-2xl p-8 shadow-sm overflow-hidden"
              >
                <div className={`${column.bg} ${column.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-8`}>
                  <column.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl mb-6">{column.title}</h3>
                <div className="h-64 overflow-y-auto pr-2">
                  <div className="vertical-showcase-track">
                    {[...column.items, ...column.items].map((item, index) => (
                      <article
                        key={`${item.title}-${index}`}
                        className="flex h-64 flex-col justify-center rounded-2xl border border-zinc-100 bg-white/80 p-6 text-center"
                      >
                        <div className={`${item.tone} mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl`}>
                          <item.icon className="h-8 w-8" />
                        </div>
                        <h4 className="font-serif text-3xl leading-tight text-zinc-900">{item.title}</h4>
                        <p className="mt-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
                          {item.source}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative py-24 pointer-events-auto overflow-hidden">
          <div ref={setAnchor(10)} className="absolute top-1/2 right-[22%] w-1 h-1" />
          <div className="text-center px-6 mb-12 reveal-fade">
            <Building2 className="w-8 h-8 mx-auto mb-5 text-zinc-400" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Who We&apos;ve Worked With</h2>
            <p className="text-zinc-500">A moving archive of teams, spaces, and stories shaped through art.</p>
          </div>

          <div className="pause-on-hover relative overflow-x-auto pb-4">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#fdfbf7] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fdfbf7] to-transparent z-10" />
            <div className="logo-marquee-track flex w-max gap-4">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client}-${index}`}
                  className="h-20 min-w-48 rounded-full border border-zinc-200 bg-white/80 px-8 flex items-center justify-center text-sm font-bold uppercase tracking-widest text-zinc-600 shadow-sm"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-10 pointer-events-auto">
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h2 className="reveal-fade font-serif text-6xl md:text-8xl lg:text-[8.5rem] mb-10 leading-[0.92] tracking-tight text-zinc-900 hover:scale-[1.02] hover:rotate-1 transition-transform duration-500 cursor-default">
              Got a wall,
              <br />
              an event or an idea?
            </h2>
            <p className="reveal-fade text-zinc-600 mb-10 text-xl md:text-2xl font-light max-w-2xl mx-auto hover:text-zinc-900 transition-colors duration-300 cursor-default">
              We&apos;re here to chat. Every great project starts with a conversation.
            </p>
            <div className="reveal-fade flex flex-col items-center">
              <div ref={setAnchor(11)} className="w-1 h-1 mb-10 relative z-30" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-zinc-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-blue-600 shadow-xl hover:shadow-[0_10px_40px_rgba(37,99,235,0.3)] transition-all duration-500"
              >
                Let&apos;s connect <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
