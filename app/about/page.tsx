import Link from "next/link";
import { ArrowRight, Brush, Heart, Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* === BLOCK 1: INTRO (Our Story) === */}
      <section className="px-6 md:px-10 mb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 block">Our Story</span>
            <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
              Art is more than <br/> something you see.
            </h1>
            <div className="h-1 w-20 bg-black mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              It is something you feel, share, and remember. At <strong>The Art Movement</strong>, we design immersive art experiences that bring people together—at work, in life, and within themselves.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded by Tanish Gupta, we operate at the intersection of creativity and human connection, turning blank canvases into spaces for culture, calm, and community.
            </p>
          </div>
          
          {/* IMAGE PLACEHOLDER: Founder at Work */}
          <div className="relative aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center group">
             <div className="text-gray-400 text-sm font-mono uppercase tracking-widest">
                [Founder / Artist Image Here]
             </div>
             {/* Use this when ready: <Image src="/path-to-your-photo.jpg" fill className="object-cover" alt="Founder at work" /> */}
          </div>
        </div>
      </section>

      {/* === BLOCK 2: PHILOSOPHY === */}
      <section className="bg-gray-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-serif text-4xl mb-4">Our Philosophy</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">We believe creativity is a human need—not a luxury.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-blue-900">
                <Brush className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Art as Expression</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Giving voice to thoughts and emotions that words often fail to capture. We provide the tools for you to tell your story.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-purple-900">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Art as Connection</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Breaking down silos in workplaces and communities. Art creates a shared language that builds trust and culture.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-6 text-green-900">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Art as Healing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A mindful practice for calm and clarity. Our wellness-focused sessions are designed to reduce burnout and restore balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === BLOCK 3: TEAM === */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-16">
           <div className="md:w-1/3">
              <h2 className="font-serif text-4xl mb-6">The People Behind <br/> The Movement</h2>
              <p className="text-gray-500 mb-8">
                A collective of artists, facilitators, and wellness partners led by a singular vision.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gray-600 transition-colors">
                Work With Us <ArrowRight className="w-4 h-4" />
              </Link>
           </div>
           
           <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Profile 1: You */}
              <div className="group">
                 <div className="aspect-square bg-gray-100 mb-4 rounded overflow-hidden relative">
                    {/* <Image src="..." fill /> */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-xs">PHOTO</div>
                 </div>
                 <h4 className="font-bold text-lg">Tanish Gupta</h4>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Founder & Lead Artist</p>
                 <p className="text-sm text-gray-600">Visual artist exploring the relationship between human emotion and physical space.</p>
              </div>

              {/* Profile 2: Partners */}
              <div className="group">
                 <div className="aspect-square bg-gray-100 mb-4 rounded overflow-hidden relative flex items-center justify-center bg-gray-50">
                    <Sparkles className="w-12 h-12 text-gray-300" />
                 </div>
                 <h4 className="font-bold text-lg">Wellness Partners</h4>
                 <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Facilitators & Therapists</p>
                 <p className="text-sm text-gray-600">We collaborate with certified experts to ensure our wellness sessions are safe, grounded, and impactful.</p>
              </div>
           </div>
        </div>
      </section>

      {/* === BLOCK 4: APPROACH === */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto text-center">
        <h2 className="font-serif text-4xl mb-16">How We Design Experiences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
           {/* Connecting Line (Desktop Only) */}
           <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

           {[
             { title: "Discover", desc: "Understanding your goals, culture, and space." },
             { title: "Design", desc: "Curating a custom theme or visual language." },
             { title: "Create", desc: "The immersive experience—guided and hands-on." },
             { title: "Reflect", desc: "Integration circles to discuss impact and meaning." }
           ].map((step, i) => (
             <div key={i} className="bg-white p-4">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-xl ring-4 ring-white">
                  {i + 1}
                </div>
                <h3 className="font-serif text-xl mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
             </div>
           ))}
        </div>
      </section>

    </div>
  );
}