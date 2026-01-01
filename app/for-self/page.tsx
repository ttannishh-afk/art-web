import Link from "next/link";
import { Sun, Heart, Feather, Coffee, Palette, Map, Sparkles } from "lucide-react";

export default function ForSelfPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-32 pb-20">
      
      {/* === HERO SECTION === */}
      <section className="px-6 md:px-10 mb-24 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center justify-center text-center px-6">
          
          {/* Background Layer - Soft Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-stone-100 opacity-80 z-0"></div>
          
          {/* Optional: Add a texture or image behind the gradient */}
          {/* <Image src="/meditation-art.jpg" fill className="object-cover -z-10 opacity-20" /> */}

          <div className="relative z-10 max-w-3xl">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-xs font-bold tracking-widest uppercase mb-8 text-stone-500">
                <Sun className="w-4 h-4 text-orange-400" />
                Mindful Art Experiences
             </div>
             
             <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight text-stone-800">
               Art for Calm, <br/> Clarity & Connection.
             </h1>
             
             <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-xl mx-auto leading-relaxed font-light">
               Step away from the noise. We use creative expression as a tool for healing, mindfulness, and discovering your inner voice.
             </p>
             
             <Link href="#sessions" className="inline-block bg-stone-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-stone-600 transition-colors shadow-lg">
               Join a Session
             </Link>
          </div>
        </div>
      </section>

      {/* === WHO IT'S FOR === */}
      <section className="py-20 px-6 md:px-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
           <h2 className="font-serif text-4xl mb-6">Created For You If...</h2>
           <p className="text-stone-500 italic">No artistic experience required. Just an open mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Point 1 */}
           <div className="bg-white p-8 rounded-2xl border border-stone-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-orange-50 p-3 rounded-full text-orange-800">
                <Feather className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-stone-800">You Seek Emotional Release</h3>
                <p className="text-sm text-stone-500 leading-relaxed">Words aren't always enough. Art provides a safe container to process complex feelings without judgment.</p>
              </div>
           </div>

           {/* Point 2 */}
           <div className="bg-white p-8 rounded-2xl border border-stone-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-green-50 p-3 rounded-full text-green-800">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-stone-800">You Need to Slow Down</h3>
                <p className="text-sm text-stone-500 leading-relaxed">Combat burnout and anxiety. The tactile act of creating forces you into the present moment.</p>
              </div>
           </div>

           {/* Point 3 */}
           <div className="bg-white p-8 rounded-2xl border border-stone-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-3 rounded-full text-blue-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-stone-800">You Want to Reignite Creativity</h3>
                <p className="text-sm text-stone-500 leading-relaxed">Reconnect with your inner child and playfulness. Break through creative blocks in life and work.</p>
              </div>
           </div>

           {/* Point 4 */}
           <div className="bg-white p-8 rounded-2xl border border-stone-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-purple-50 p-3 rounded-full text-purple-800">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-stone-800">You Are Healing</h3>
                <p className="text-sm text-stone-500 leading-relaxed">A gentle, non-verbal way to navigate grief, change, or personal growth.</p>
              </div>
           </div>
        </div>
      </section>

      {/* === OFFERINGS (The Sessions) === */}
      <section id="sessions" className="py-24 px-6 md:px-10 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-100 pb-8">
               <div>
                  <span className="text-stone-400 text-xs font-bold tracking-widest uppercase block mb-2">Offerings</span>
                  <h2 className="font-serif text-4xl text-stone-800">Ways to Experience</h2>
               </div>
               <p className="text-stone-500 max-w-md text-right md:text-left mt-4 md:mt-0">
                  From 2-hour workshops to multi-day immersive retreats.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               
               {/* Card 1 */}
               <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-stone-200 rounded-xl overflow-hidden relative mb-6">
                     {/* <Image src="..." /> */}
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                     <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Most Popular
                     </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-stone-500 text-xs uppercase tracking-widest font-bold">
                     <Palette className="w-4 h-4" /> Workshop
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-stone-800 group-hover:underline decoration-stone-400 underline-offset-4">Art & Mindfulness</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                     A guided session combining meditation with painting. Focus on breath, stroke, and flow rather than the final result.
                  </p>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">Book Spot →</Link>
               </div>

               {/* Card 2 */}
               <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-stone-200 rounded-xl overflow-hidden relative mb-6">
                     {/* <Image src="..." /> */}
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-stone-500 text-xs uppercase tracking-widest font-bold">
                     <Map className="w-4 h-4" /> Immersion
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-stone-800 group-hover:underline decoration-stone-400 underline-offset-4">Creative Retreats</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                     Weekend getaways in nature. Disconnect from technology and reconnect with yourself through immersive art-making.
                  </p>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">Join Waitlist →</Link>
               </div>

               {/* Card 3 */}
               <div className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-stone-200 rounded-xl overflow-hidden relative mb-6">
                     {/* <Image src="..." /> */}
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-stone-500 text-xs uppercase tracking-widest font-bold">
                     <Heart className="w-4 h-4" /> 1:1 Session
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-stone-800 group-hover:underline decoration-stone-400 underline-offset-4">Private Coaching</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                     Personalized sessions to unblock creative energy or explore personal themes through visual expression.
                  </p>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">Inquire →</Link>
               </div>

            </div>
         </div>
      </section>

      {/* === CREDIBILITY === */}
      <section className="bg-stone-100 py-16 px-6 text-center">
         <div className="max-w-2xl mx-auto">
            <h4 className="font-bold uppercase tracking-widest text-xs text-stone-400 mb-6">Designed With Care</h4>
            <p className="font-serif text-2xl md:text-3xl text-stone-700 leading-relaxed mb-8">
               "Our sessions are co-created with certified therapists and retreat facilitators to ensure a space that is not just creative, but emotionally safe and grounded."
            </p>
            {/* Optional: Partner Logos */}
            <div className="flex justify-center gap-8 opacity-50 grayscale">
               {/* <div className="h-8 w-24 bg-stone-300 rounded"></div> */}
               {/* <div className="h-8 w-24 bg-stone-300 rounded"></div> */}
            </div>
         </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="py-24 px-6 text-center">
         <h2 className="font-serif text-5xl md:text-6xl text-stone-800 mb-8">Begin Your Journey</h2>
         <p className="text-stone-500 mb-10 max-w-lg mx-auto">
            You don't need to be an artist to make art. You just need to begin.
         </p>
         <Link href="/contact" className="inline-block bg-stone-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-700 transition-colors shadow-xl">
            Explore Sessions
         </Link>
      </section>

    </div>
  );
}