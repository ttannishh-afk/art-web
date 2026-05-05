import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function WeddingsPrivateEventsPage() {
  return (
    <div className="min-h-screen bg-[#fff3ef] pt-32 pb-20 px-6">
      <section className="max-w-5xl mx-auto">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
          <Heart className="h-7 w-7" />
        </div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-rose-600">
          Details Coming Soon
        </p>
        <h1 className="mb-8 font-serif text-5xl leading-tight md:text-7xl">
          Weddings & Private Events
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
          Interactive art activities and guest experiences for celebrations. This page will soon
          outline event concepts, personalization options, and planning details.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-rose-600"
        >
          Plan an experience <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
