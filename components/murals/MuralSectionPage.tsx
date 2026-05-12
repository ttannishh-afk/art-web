"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb, Megaphone, Sparkles, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

interface CaseItem {
  title: string;
  image: string;
  summary: string;
}

interface WhyItem {
  number: string;
  title: string;
  description: string;
}

interface MuralSectionPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  accentClass: string;
  accentBgClass: string;
  ctaTitle: string;
  ctaText: string;
  cases: CaseItem[];
  whyTitle: string;
  whyItems: WhyItem[];
}

const icons = [Target, Users, Sparkles, Megaphone, Lightbulb];

export default function MuralSectionPage({
  eyebrow,
  title,
  intro,
  accentClass,
  accentBgClass,
  ctaTitle,
  ctaText,
  cases,
  whyTitle,
  whyItems,
}: MuralSectionPageProps) {
  const [activeCase, setActiveCase] = useState<number | null>(0);
  const [activeWhy, setActiveWhy] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#faf9f6] text-zinc-950">
      <section className="pt-16">
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col md:flex-row">
          {cases.map((item, index) => {
            const isActive = activeCase === index;

            return (
              <button
                key={item.title}
                onMouseEnter={() => setActiveCase(index)}
                onFocus={() => setActiveCase(index)}
                className={`group relative min-h-[230px] overflow-hidden border-b border-white/20 bg-zinc-950 text-left text-white transition-[flex] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:min-h-0 md:border-b-0 md:border-r ${
                  isActive ? "md:flex-[2.4]" : "md:flex-[0.72]"
                }`}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className={`object-cover transition duration-700 ${
                    isActive ? "scale-105 opacity-80 grayscale-0" : "opacity-35 grayscale"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="relative flex h-full min-h-[230px] flex-col justify-end p-6 md:p-8">
                  <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
                    Case 0{index + 1}
                  </span>
                  <h2
                    className={`font-serif leading-tight transition-all duration-500 ${
                      isActive ? "text-4xl md:text-6xl" : "text-3xl md:[writing-mode:vertical-rl] md:rotate-180"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? "mt-6 max-h-52 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                      {item.summary}
                    </p>
                    <span
                      className={`mt-6 inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 ${accentBgClass}`}
                    >
                      Know more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-4xl">
            <p className={`mb-4 text-xs font-bold uppercase tracking-[0.24em] ${accentClass}`}>
              {eyebrow}
            </p>
            <h1 className="font-serif text-5xl leading-tight md:text-7xl">{title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
              {intro}
            </p>
          </div>

          <div className="mb-16 max-w-3xl">
            <p className={`mb-4 text-xs font-bold uppercase tracking-[0.24em] ${accentClass}`}>
              Why this matters
            </p>
            <h2 className="font-serif text-5xl leading-tight md:text-7xl">{whyTitle}</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {whyItems.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <article
                  key={item.number}
                  onMouseEnter={() => setActiveWhy(index)}
                  onMouseLeave={() => setActiveWhy(null)}
                  className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white hover:shadow-2xl"
                >
                  <div className="mb-10 flex items-center justify-between">
                    <span className="font-serif text-4xl text-zinc-300 transition-colors group-hover:text-white/30">
                      {item.number}
                    </span>
                    <motion.div
                      animate={
                        activeWhy === index
                          ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.8, repeat: activeWhy === index ? Infinity : 0 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accentBgClass} text-zinc-950 shadow-sm`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight md:text-3xl">{item.title}</h3>
                  <div className="mt-6 overflow-hidden">
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        activeWhy === index
                          ? "max-h-72 translate-y-0 opacity-100"
                          : "max-h-0 translate-y-4 opacity-0"
                      } text-white/75`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1 w-0 ${accentBgClass} transition-all duration-500 group-hover:w-full`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white md:px-10 md:py-32">
        <Image
          src={cases[0].image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-zinc-950/75" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className={`mb-5 text-xs font-bold uppercase tracking-[0.24em] ${accentClass}`}>
            Open to Ideas
          </p>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">{ctaTitle}</h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
            {ctaText}
          </p>
          <Link
            href="/contact"
            className={`mt-10 inline-flex items-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all duration-300 ${accentBgClass}`}
          >
            Let&apos;s connect <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
