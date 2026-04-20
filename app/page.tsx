"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, Sun, Palette, Users, Sparkles, Heart, MoveRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  {
    type: "path",
    id: "work",
    title: "For Work",
    subtitle: "Corporate Culture",
    description: "Transform your workspace with collaborative painting sessions, custom large-scale murals, and creative programs designed to unite your team.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    color: "text-blue-600",
    bg: "bg-blue-50",
    icon: Briefcase,
    align: "left"
  },
  {
    type: "path",
    id: "self",
    title: "For Self",
    subtitle: "Mindful Healing",
    description: "Discover calm through mindful art experiences, therapy collaborations, and immersive creative retreats focused on personal wellbeing.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200",
    color: "text-orange-500",
    bg: "bg-orange-50",
    icon: Heart,
    align: "right"
  },
  {
    type: "philosophy",
    id: "philosophy",
    title: "Our Philosophy",
    subtitle: "The Core Belief",
    description: "“Creativity is a human need, not a luxury. Guided with intention, art becomes a powerful tool for profound transformation.”",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1200",
    color: "text-rose-500",
    bg: "bg-rose-50",
    icon: Sparkles,
    align: "left"
  },
  {
    type: "exp",
    id: "workshops",
    title: "Team Workshops",
    subtitle: "Signature Experience",
    description: "Engaging and highly collaborative painting sessions tailored specifically for corporate teams to break the ice and build lasting bonds.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: Users,
    align: "right"
  },
  {
    type: "exp",
    id: "murals",
    title: "Office Murals",
    subtitle: "Signature Experience",
    description: "Custom large-scale artworks that embody your company's values, painted directly into your workspace to inspire daily.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    color: "text-purple-500",
    bg: "bg-purple-50",
    icon: Palette,
    align: "left"
  },
  {
    type: "exp",
    id: "coaching",
    title: "Art Coaching",
    subtitle: "Signature Experience",
    description: "Intimate 1:1 sessions designed to unblock your creative energy, providing you with the tools to express yourself freely.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200",
    color: "text-amber-500",
    bg: "bg-amber-50",
    icon: Sun,
    align: "right"
  }
];

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  // We have 1 Hero + 6 Gallery Items + 1 Final CTA = 8 Anchors total
  const anchorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setAnchor = (index: number) => (el: HTMLDivElement | null) => {
    anchorsRef.current[index] = el;
  };

  const [pathStr, setPathStr] = useState("");
  const [samples, setSamples] = useState<{x: number, y: number, angle: number, progress: number}[]>([]);
  const [pathLength, setPathLength] = useState(0);
  const [drips, setDrips] = useState<{x: number, y: number, r: number, progress: number}[]>([]);
  const dripsState = useRef<{active: boolean}[]>([]);
  const [splashes, setSplashes] = useState<{ id: number, x: number, y: number, size: number, color: string, blur: number }[]>([]);

  useEffect(() => {
    // Generate random ambient splashes on load
    const colors = [
      "bg-rose-300/30", "bg-blue-300/30", "bg-amber-300/30", 
      "bg-emerald-300/30", "bg-purple-300/30", "bg-fuchsia-300/30",
      "bg-cyan-300/30", "bg-teal-300/30", "bg-pink-300/30", "bg-indigo-300/30"
    ];
    // Create 6 to 9 random splashes
    const newSplashes = Array.from({ length: 6 + Math.floor(Math.random() * 4) }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 0 to 100vw
      y: Math.random() * 100, // 0 to 100vh
      size: 30 + Math.random() * 40, // 30vw to 70vw
      color: colors[Math.floor(Math.random() * colors.length)],
      blur: 80 + Math.random() * 60 // 80px to 140px
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSplashes(newSplashes);
  }, []);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const calculate = useCallback(() => {
      const validAnchors = anchorsRef.current.slice(0, 8);
      if (validAnchors.some(a => !a) || !mainRef.current) return;

      const getCenter = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const parentRect = mainRef.current!.getBoundingClientRect();
        return {
          x: Math.round(rect.left - parentRect.left + rect.width / 2),
          y: Math.round(rect.top - parentRect.top + rect.height / 2)
        };
      };

      const newPathStr = validAnchors.reduce((acc, ref, i) => {
         const pos = getCenter(ref!);
         if (i === 0) return `M ${pos.x},${pos.y}`;
         const prev = getCenter(validAnchors[i-1]!);
         
         // Final plunge to the dot of the 'i'
         if (i === 7) {
            const dy = Math.abs(pos.y - prev.y);
            return `${acc} C ${prev.x},${pos.y - dy * 0.7} ${pos.x},${prev.y + dy * 0.3} ${pos.x},${pos.y}`;
         }

         const dy = Math.abs(pos.y - prev.y);
         const cy1 = Math.round(prev.y + dy * 0.4);
         const cy2 = Math.round(pos.y - dy * 0.4);
         return `${acc} C ${prev.x},${cy1} ${pos.x},${cy2} ${pos.x},${pos.y}`;
      }, "");

      setPathStr(prev => prev === newPathStr ? prev : newPathStr);
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
     const newSamples = [];
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
        newSamples.push({ x: pt.x, y: pt.y, angle, progress });
        prevPt = pt;
     }
     if (newSamples.length > 1) newSamples[0].angle = newSamples[1].angle;
     setSamples(newSamples);

     const numDrips = 90;
     const newDrips = [];
     for (let i = 1; i < numDrips; i++) {
        const pt = pathRef.current.getPointAtLength((i / numDrips) * length);
        const randX = Math.sin(i * 12.9898) * 43758.5453 % 1;
        const randY = Math.sin(i * 78.233) * 43758.5453 % 1;
        const rx = Math.round(pt.x + (randX - 0.5) * 140);
        const ry = Math.round(pt.y + (randY - 0.5) * 140);
        const r = Math.max(3, Math.round(Math.abs(randX) * 14));
        newDrips.push({ x: rx, y: ry, r, progress: i / numDrips });
     }
     setDrips(newDrips);
     dripsState.current = newDrips.map(() => ({ active: false }));
  }, [pathStr]);

  useGSAP(() => {
     // Cursor Logic
     let mouseX = window.innerWidth / 2;
     let mouseY = window.innerHeight / 2;
     let trailX = window.innerWidth / 2;
     let trailY = window.innerHeight / 2;

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

     const links = document.querySelectorAll('a, button');
     const onHover = () => {
        if (!cursorTrailRef.current || !cursorRef.current) return;
        gsap.to(cursorTrailRef.current, { scale: 1.5, borderColor: "#e11d48", duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 });
     };
     const onLeave = () => {
        if (!cursorTrailRef.current || !cursorRef.current) return;
        gsap.to(cursorTrailRef.current, { scale: 1, borderColor: "#fca5a5", duration: 0.3 });
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
     };
     links.forEach(link => {
        link.addEventListener('mouseenter', onHover);
        link.addEventListener('mouseleave', onLeave);
     });

     if (samples.length === 0 || !mainRef.current || !dropRef.current || !pathRef.current) return;

     gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

     const scrollObj = { target: window.scrollY, current: window.scrollY };
     const onScroll = () => scrollObj.target = window.scrollY;
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
          if (samples[mid].y === docY) {
            closest = samples[mid];
            break;
          } else if (samples[mid].y < docY) {
            closest = samples[mid];
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
        if (docY <= samples[0].y) closest = samples[0];
        if (docY >= samples[samples.length - 1].y) closest = samples[samples.length - 1];

        // Pure rotation along the path
        gsap.set(dropRef.current, {
           x: closest.x,
           y: closest.y,
           rotation: closest.angle + "_short",
        });

        gsap.set(pathRef.current, {
           strokeDashoffset: pathLength * (1 - closest.progress)
        });

        drips.forEach((drip, i) => {
           const state = dripsState.current[i];
           if (!state) return;
           if (closest.progress >= drip.progress && !state.active) {
              state.active = true;
              gsap.to(`.drip-${i}`, { opacity: 0.9, scale: 1, duration: 0.5, ease: "elastic.out(1.2, 0.4)", overwrite: "auto" });
           } else if (closest.progress < drip.progress && state.active) {
              state.active = false;
              gsap.to(`.drip-${i}`, { opacity: 0, scale: 0, duration: 0.2, overwrite: "auto" });
           }
        });
     };

     gsap.ticker.add(update);

     const revealElements = gsap.utils.toArray<HTMLElement>('.reveal-element');
     revealElements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, duration: 1.4, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
     });

     const fadeElements = gsap.utils.toArray<HTMLElement>('.reveal-fade');
     fadeElements.forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0 },
          {
            opacity: 1, duration: 1.5, ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
     });

     return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("mousemove", onMouseMove);
        gsap.ticker.remove(update);
        gsap.ticker.remove(updateCursor);
        links.forEach(link => {
           link.removeEventListener('mouseenter', onHover);
           link.removeEventListener('mouseleave', onLeave);
        });
     };
  }, [samples, pathLength, drips]);

  return (
    <div ref={mainRef} className="relative w-full bg-[#fdfbf7] overflow-hidden text-zinc-900 selection:bg-rose-500 selection:text-white font-sans md:cursor-none">
      
      {/* Custom Mouse Cursor */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-rose-600 rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div ref={cursorTrailRef} className="fixed top-0 left-0 w-10 h-10 border-2 border-rose-300 rounded-full pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-60" />

      {/* Ambient Light Orbs (Randomized on Load) */}
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
                 transform: 'translate(-50%, -50%)',
                 filter: `blur(${splash.blur}px)`
              }}
            />
         ))}
      </div>

      {/* The Trail Canvas */}
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
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
           </linearGradient>
        </defs>
        {drips.map((drip, i) => (
          <circle key={i} cx={drip.x} cy={drip.y} r={drip.r} fill="#e11d48" className={`drip-${i} opacity-0 drop-shadow-sm`} />
        ))}
      </svg>

      {/* Pure SVG Teardrop (No drop-shadow utility = no bounding box artifacts) */}
      <div 
        ref={dropRef}
        className="absolute top-0 left-0 w-[40px] h-[40px] -mt-[20px] -ml-[20px] z-10 pointer-events-none opacity-0"
        style={{ opacity: pathStr ? 1 : 0, transition: 'opacity 0.5s' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          {/* A clean, sharp teardrop pointing RIGHT. MotionPath automatically rotates it along the path. */}
          <path d="M 32 20 C 32 20 14 6 10 12 C 6 18 6 22 10 28 C 14 34 32 20 32 20 Z" fill="#e11d48" />
        </svg>
      </div>

      <div className="relative z-20 w-full pointer-events-none">
        
        {/* === HERO === */}
        <section className="min-h-screen w-full flex items-center justify-center px-6 pt-20 pointer-events-auto relative">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center mt-[-5vh]">
            <div className="reveal-element mb-8">
               <motion.div 
                 animate={{ y: [0, -6, 0] }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               >
                 <span className="px-6 py-2 border border-rose-200/50 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/40 backdrop-blur-xl text-rose-800 hover:bg-white/60 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default inline-block">
                    The Art Movement
                 </span>
               </motion.div>
            </div>
            <div className="reveal-element z-10 relative">
               <motion.h1 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                 className="font-serif text-6xl md:text-[8rem] lg:text-[11rem] -mt-4 md:-mt-8 mb-6 tracking-tighter leading-[0.8] text-zinc-900 drop-shadow-sm hover:scale-[1.02] hover:-rotate-1 transition-transform duration-500 cursor-default"
               >
                 Art as <br/> <span className="italic text-rose-600">Journey</span>
               </motion.h1>
            </div>
            <div className="reveal-element z-10 relative">
               <motion.p 
                 animate={{ y: [0, 8, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                 className="text-lg md:text-2xl text-zinc-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed hover:text-zinc-800 transition-colors duration-300 cursor-default"
               >
                 Follow the flow of creativity. We design experiential art for workplaces, communities, and deep personal wellbeing.
               </motion.p>
            </div>
            {/* The Drop Starts Here */}
            <div ref={setAnchor(0)} className="w-1 h-1 relative z-30" />
          </div>
        </section>

        {/* === GALLERY ZIG-ZAG === */}
        <div className="w-full flex flex-col gap-32 md:gap-48 py-20 pointer-events-auto overflow-hidden">
          {galleryItems.map((item, index) => {
            const isLeft = item.align === "left";
            const anchorIndex = index + 1; // 1 through 6
            
            return (
              <section key={item.id} className="relative w-full px-6 md:px-12 flex items-center justify-center min-h-[70vh]">
                {/* The Anchor for the path is on the OPPOSITE side of the content */}
                <div ref={setAnchor(anchorIndex)} className={`absolute top-1/2 w-1 h-1 ${isLeft ? 'right-[15%] md:right-[25%]' : 'left-[15%] md:left-[25%]'}`} />

                <div className={`max-w-7xl mx-auto w-full flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
                   
                   {/* Image Block */}
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

                   {/* Text Block */}
                   <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? 'items-start text-left' : 'items-end text-right md:items-start md:text-left'} reveal-element`}>
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
                      
                      <Link href="/contact" className={`group flex items-center gap-4 text-sm font-bold uppercase tracking-widest ${item.color} hover:opacity-70 transition-opacity`}>
                        Explore <MoveRight className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-500" />
                      </Link>
                   </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* === FINAL CTA === */}
        <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-10 pointer-events-auto">
           <div className="text-center max-w-4xl mx-auto relative z-10">
              <h2 className="reveal-fade font-serif text-6xl md:text-8xl lg:text-[9rem] mb-12 leading-[0.9] tracking-tight text-zinc-900 hover:scale-[1.02] hover:rotate-1 transition-transform duration-500 cursor-default">
                Let’s Create <br/>
                <span className="italic text-zinc-800">
                  Meaningful
                </span>
              </h2>
              <p className="reveal-fade text-zinc-600 mb-10 text-xl md:text-2xl font-light max-w-xl mx-auto hover:text-zinc-900 transition-colors duration-300 cursor-default">
                Ready to start the journey? Let&apos;s bring profound creativity into your space.
              </p>
              <div className="reveal-fade flex flex-col items-center">
                 {/* The Drop Ends Here */}
                 <div ref={setAnchor(7)} className="w-1 h-1 mb-10 relative z-30" />
                 <Link href="/contact" className="inline-block bg-zinc-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-rose-600 shadow-xl hover:shadow-[0_10px_40px_rgba(225,29,72,0.3)] transition-all duration-500">
                    Get in Touch
                 </Link>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}