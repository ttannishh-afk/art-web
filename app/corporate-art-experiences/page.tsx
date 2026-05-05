import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

export default function CorporateArtExperiencesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-32 pb-20 px-6">
      <section className="max-w-5xl mx-auto">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-200 text-zinc-800">
          <BriefcaseBusiness className="h-7 w-7" />
        </div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
          Details Coming Soon
        </p>
        <h1 className="mb-8 font-serif text-5xl leading-tight md:text-7xl">
          Corporate Art Experiences
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 md:text-xl">
          Live art activations, workshops, and creative culture moments for teams and events. This
          page will soon include formats, outcomes, and booking details.
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-zinc-900 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-zinc-700"
        >
          Request a proposal <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
