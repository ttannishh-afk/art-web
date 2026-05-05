import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";

export default function CommissionedCanvasesPage() {
  return (
    <div className="min-h-screen bg-[#edf8f2] pt-32 pb-20 px-6">
      <section className="max-w-5xl mx-auto">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
          <Palette className="h-7 w-7" />
        </div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
          Details Coming Soon
        </p>
        <h1 className="mb-8 font-serif text-5xl leading-tight md:text-7xl">
          Commissioned Canvases
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-emerald-950/70 md:text-xl">
          Custom canvases for homes, offices, gifting, and personal stories. This page will soon
          explain the commission process, references, sizes, and timelines.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-emerald-950 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
        >
          Commission a canvas <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
