"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Sun, Palette, Users, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2800",
    alt: "Creative Flow"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2800",
    alt: "Team Collaboration"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2800",
    alt: "Mindfulness"
  }
];

const pathCards = [
  {
    href: "/for-work",
    icon: Briefcase,
    title: "For Work",
    description:
      "Corporate workshops, office murals, and culture-building programs to engage your team.",
    cta: "Building Culture",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000",
    theme: "dark" as const,
  },
  {
    href: "/for-self",
    icon: Sun,
    title: "For Self",
    description:
      "Mindful art experiences, therapy collaborations, and creative retreats for healing.",
    cta: "Find Calm",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000",
    theme: "light" as const,
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* === HERO SECTION === */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900 text-white">
        
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-40" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
              The Art Movement
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none drop-shadow-xl">
              Transforming People <br /> & Spaces Through Art
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              We create experiential art for workplaces, communities, and personal wellbeing—turning creativity into connection, culture, and calm.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link 
                href="#paths"
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
              >
                Explore Experiences
              </Link>
              <Link 
                href="/contact"
                className="border border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Book a Session
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-10">
            {slides.map((_, idx) => (
                <button 
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-1 rounded-full transition-all duration-300 ${current === idx ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                />
            ))}
        </div>
      </section>

      {/* === CHOOSE YOUR PATH === */}
      <section id="paths" className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {pathCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group relative h-[500px] rounded-2xl overflow-hidden flex items-end p-10 hover:shadow-2xl transition-all duration-500 ${
                card.theme === "dark" ? "bg-gray-900 text-white" : "bg-stone-100 text-stone-900"
              }`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                  card.theme === "dark" ? "opacity-40" : "opacity-60"
                }`}
              />
              <div
                className={`absolute inset-0 opacity-80 ${
                  card.theme === "dark"
                    ? "bg-gradient-to-t from-black via-transparent to-transparent"
                    : "bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"
                }`}
              />

              <div className="relative z-10 w-full">
                <div
                  className={`mb-4 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                    card.theme === "dark"
                      ? "bg-white/10 group-hover:bg-white group-hover:text-black"
                      : "bg-white/80 group-hover:bg-stone-900 group-hover:text-white"
                  }`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-4xl mb-2">{card.title}</h2>
                <p
                  className={`text-sm mb-6 max-w-md ${
                    card.theme === "dark" ? "text-gray-300" : "text-stone-800 font-medium"
                  }`}
                >
                  {card.description}
                </p>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* === PHILOSOPHY === */}
      <section className="bg-stone-50 py-24 px-6 md:px-10 text-center">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-8 h-8 mx-auto mb-6 text-stone-400" />
          <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight text-stone-800">
            &ldquo;We believe creativity is a human need, not a luxury. When guided with intention, art becomes a powerful tool for transformation.&rdquo;
          </h2>
          <Link href="/about" className="text-xs font-bold uppercase tracking-widest border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
            Read Our Philosophy
          </Link>
        </div>
      </section>

      {/* === SIGNATURE EXPERIENCES === */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-12">
            <div>
               <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2 block">What We Do</span>
               <h2 className="font-serif text-4xl text-black">Signature Experiences</h2>
            </div>
            <Link href="/contact" className="hidden md:block text-xs font-bold uppercase tracking-widest bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">
              View All
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Team Workshops", icon: Users, desc: "Collaborative painting sessions for corporate teams." },
              { title: "Office Murals", icon: Palette, desc: "Custom large-scale art for your workspace." },
              { title: "Wellness Retreats", icon: Sun, desc: "Immersive weekends focused on mindfulness." },
              { title: "Art Coaching", icon: Sparkles, desc: "1:1 sessions to unblock creative energy." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 rounded-xl hover:shadow-lg transition-shadow group">
                 <item.icon className="w-8 h-8 mb-6 text-gray-400 group-hover:text-black transition-colors" />
                 <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                 <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
                 <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black">Learn More</Link>
              </div>
            ))}
         </div>
         
         <div className="mt-8 text-center md:hidden">
            <Link href="/contact" className="inline-block text-xs font-bold uppercase tracking-widest bg-black text-white px-6 py-3 rounded-full">
              View All
            </Link>
         </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="bg-black text-white py-24 px-6 text-center">
         <h2 className="font-serif text-4xl md:text-6xl mb-8">Let’s Create Something Meaningful</h2>
         <p className="text-gray-400 mb-10 text-lg">Start a conversation with us today.</p>
         <Link href="/contact" className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
            Get in Touch
         </Link>
      </section>
    </div>
  );
}
