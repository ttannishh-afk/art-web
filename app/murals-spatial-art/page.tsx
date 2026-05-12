"use client";

import { MouseEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Home,
  MessageCircle,
  PenTool,
  Ruler,
  Sparkles,
} from "lucide-react";

const openingStatement =
  "A wall is never just a wall. It is the first thing people see. The last thing they remember.";

const journeys = [
  {
    label: "Corporate & Commercial",
    eyebrow: "Offices, boardrooms, cafes, retail, restaurants",
    description:
      "Your people spend more time inside your walls than almost anywhere else. Those walls should mean something (breathe in).",
    href: "/murals-spatial-art/corporate",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600",
    icon: Building2,
    accent: "text-blue-700",
    border: "hover:border-blue-300",
  },
  {
    label: "Residential",
    eyebrow: "Homes, apartments, personal spaces",
    description:
      "Every home has a feeling the moment you walk in. We make sure that feeling is exactly yours.",
    href: "/murals-spatial-art/residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600",
    icon: Home,
    accent: "text-rose-700",
    border: "hover:border-rose-300",
  },
];

const processSteps = [
  {
    number: "01",
    title: "The Brief",
    icon: MessageCircle,
    description:
      "Every great wall starts with a conversation. We sit with you, understand your space, your vision and the feeling you want to create. No assumptions. But a detailed discussion on your requirements.",
  },
  {
    number: "02",
    title: "The Design",
    icon: Ruler,
    description:
      "We translate everything we heard into something you can see - moodboards, blueprints and a design built specifically for your space.",
  },
  {
    number: "03",
    title: "The Execution",
    icon: PenTool,
    description:
      "This is where your space comes alive. We show up, we set up and we get to work - sketching, painting, building. You watch something go from blank to extraordinary.",
  },
  {
    number: "04",
    title: "The Handover",
    icon: Sparkles,
    description:
      "The most awaited moment. We step back. You step in into your newly designed space.",
  },
];

const faqs = [
  {
    question: "How long does a mural take to complete?",
    answer:
      "It depends on the scale and complexity of the work. We give you a clear timeline before we begin.",
  },
  {
    question: "Do we need to prepare the wall before you arrive?",
    answer:
      "We assess the wall condition as part of our initial process. Generally, the walls should be primed up properly with the basic paint coat done. Rest, if any, we discuss it beforehand.",
  },
  {
    question: "How involved can we be in the design process?",
    answer:
      "We work collaboratively - your brief, references and feedback shape the design at every stage. Nothing goes on the wall without your approval first.",
  },
  {
    question: "What materials and paints do you use?",
    answer: "We use high quality, professional grade paints appropriate to the surface and location.",
  },
  {
    question: "Do you travel for projects outside Delhi?",
    answer: "Yes - we work across India and are open to international projects depending on scope.",
  },
  {
    question: "What if I don't know exactly what I want?",
    answer:
      "That is completely fine - and honestly more common than you'd think. Many of our best projects started with a client who just had a feeling, not a brief. We help you find the vision through conversation.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Every project is unique. Pricing depends on the size of the wall, complexity of the design, materials required and timeline. We share a detailed quote after our first conversation - no surprises.",
  },
];

function HandwrittenStatement({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <span
      className="relative block pb-8"
      style={{ fontFamily: "'Bradley Hand', 'Segoe Print', 'Comic Sans MS', cursive" }}
    >
      <span aria-label={text}>
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            aria-hidden="true"
            initial={{ opacity: 0, y: 18, rotate: -4, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.22, delay: 0.25 + index * 0.035, ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <motion.span
        aria-hidden="true"
        initial={{ left: "0%", opacity: 0, rotate: -20 }}
        animate={{ left: "96%", opacity: [0, 1, 1, 0], rotate: -6 }}
        transition={{ duration: 3.5, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-2 hidden h-9 w-1.5 rounded-full bg-zinc-950 md:block"
      >
      </motion.span>
      <svg
        viewBox="0 0 620 44"
        aria-hidden="true"
        className="absolute -bottom-2 left-1/2 h-10 w-[min(88vw,620px)] -translate-x-1/2 text-zinc-900/60"
      >
        <motion.path
          d="M8 28 C98 5 155 38 245 20 C340 1 405 39 509 18 C558 9 590 15 612 25"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 1.4, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

export default function MuralsSpatialArtPage() {
  const router = useRouter();
  const [transition, setTransition] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const openJourney = (event: MouseEvent<HTMLElement>, href: string, color: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTransition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color,
    });
    window.setTimeout(() => router.push(href), 660);
    window.setTimeout(() => setTransition(null), 980);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9f6] text-zinc-950">
      <AnimatePresence>
        {transition && (
          <motion.div
            initial={{ scale: 0, opacity: 1, x: "-50%", y: "-50%" }}
            animate={{ scale: 95, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
            className="fixed z-[160] h-12 w-12 rounded-full pointer-events-none"
            style={{
              left: transition.x,
              top: transition.y,
              backgroundColor: transition.color,
            }}
          />
        )}
      </AnimatePresence>

      <section className="relative px-6 pb-20 pt-32 md:px-10 md:pb-28">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-zinc-200/45 blur-3xl" />
        <div className="absolute right-0 top-64 h-80 w-80 rounded-full bg-rose-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-5xl text-center">
            <h1 className="font-serif text-4xl italic leading-tight tracking-tight text-zinc-950 md:text-6xl lg:text-7xl">
              <HandwrittenStatement text={openingStatement} />
            </h1>
          </div>

          <div className="grid min-h-[560px] grid-cols-1 gap-5 md:grid-cols-2">
            {journeys.map((journey) => (
              <button
                key={journey.href}
                onClick={(event) =>
                  openJourney(
                    event,
                    journey.href,
                    journey.href.includes("corporate") ? "#93c5fd" : "#fda4af",
                  )
                }
                className={`group relative flex min-h-[460px] overflow-hidden rounded-[2rem] border border-white/70 bg-zinc-950 text-left shadow-2xl transition-all duration-500 ${journey.border}`}
              >
                <Image
                  src={journey.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute left-8 top-8 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 md:left-10 md:top-10">
                  <journey.icon className="h-5 w-5" />
                </span>
                <div className="relative mt-auto flex w-full flex-col p-8 text-white md:p-10">
                  <span className="mb-7 text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">
                    {journey.eyebrow}
                  </span>
                  <h2 className="font-serif text-4xl leading-none md:text-6xl">{journey.label}</h2>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-white/78 md:text-lg">
                    {journey.description}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white">
                    Choose this journey
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-3" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-800">
              Our Process
            </p>
            <h2 className="font-serif text-5xl leading-tight md:text-7xl">
              From blank walls to extraordinary spaces.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                className="group relative min-h-[330px] overflow-hidden rounded-2xl border border-zinc-100 bg-[#fbf8f2] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-900 hover:bg-zinc-950 hover:text-white hover:shadow-2xl"
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="font-serif text-4xl text-zinc-300 transition-colors group-hover:text-white/30">
                    {step.number}
                  </span>
                  <motion.div
                    animate={
                      activeStep === index
                        ? { rotate: [0, -12, 12, 0], scale: [1, 1.12, 1] }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.8, repeat: activeStep === index ? Infinity : 0 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-zinc-950 shadow-sm"
                  >
                    <step.icon className="h-5 w-5" />
                  </motion.div>
                </div>
                <h3 className="font-serif text-3xl leading-tight">{step.title}</h3>
                <div className="mt-6 overflow-hidden">
                  <p
                    className={`text-sm leading-relaxed transition-all duration-500 ${
                      activeStep === index
                        ? "max-h-56 translate-y-0 opacity-100"
                        : "max-h-0 translate-y-4 opacity-0"
                    } text-white/75`}
                  >
                    {step.description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f6] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 ml-auto max-w-3xl text-right">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-amber-800">
              FAQs
            </p>
            <h2 className="font-serif text-5xl md:text-6xl">Before we begin.</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:border-zinc-950 hover:shadow-xl"
              >
                <div className="flex items-center justify-between gap-6 p-6 md:p-7">
                  <h3 className="font-serif text-xl leading-snug md:text-2xl">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-zinc-950" />
                </div>
                <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-56">
                  <p className="border-t border-zinc-100 px-6 pb-6 pt-5 text-sm leading-relaxed text-zinc-600 md:px-7 md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zinc-950 px-6 py-24 text-white md:px-10 md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2000"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-zinc-950/70" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
            Let&apos;s Connect
          </p>
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">
            You know the wall.
            <br />
            We know what to do with it.
          </h2>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_18px_60px_rgba(251,191,36,0.25)]"
          >
            Let&apos;s connect <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
