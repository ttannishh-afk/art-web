import Link from "next/link";
import { ArrowRight, PanelTop } from "lucide-react";

export default function MuralsSpatialArtPage() {
  return (
    <div className="min-h-screen bg-[#f5efe5] pt-32 pb-20 px-6">
      <section className="max-w-5xl mx-auto">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
          <PanelTop className="h-7 w-7" />
        </div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-800">
          Details Coming Soon
        </p>
        <h1 className="mb-8 font-serif text-5xl leading-tight md:text-7xl">
          Murals & Spatial Art
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl">
          Walls have always had something to say. This service page will soon carry project formats,
          process, timelines, and past work for murals and spatial interventions.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-800"
        >
          Start a conversation <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
