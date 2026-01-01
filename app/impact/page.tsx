import Link from "next/link";
import { Target, Users, Heart, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* === HERO === */}
      <section className="px-6 md:px-10 mb-20 max-w-7xl mx-auto text-center">
        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 block">Our Approach</span>
        <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
          Designed for <br/> Meaningful Impact.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          We don't just "do art." We design experiences backed by psychology, facilitated with care, and measured by the connection it creates.
        </p>
      </section>

      {/* === METHODOLOGY (The Framework) === */}
      <section className="bg-gray-50 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">The Experience Design Framework</h2>
              <p className="text-gray-500">Every session follows a deliberate arc to ensure safety and depth.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10"></div>

              {[
                { 
                  icon: Target, 
                  step: "01. Intention", 
                  desc: "We set a clear container. Why are we here? What outcome are we seeking?" 
                },
                { 
                  icon: Lightbulb, 
                  step: "02. Creation", 
                  desc: "The flow state. Participants engage in tactile, non-verbal expression." 
                },
                { 
                  icon: Heart, 
                  step: "03. Reflection", 
                  desc: "Stepping back to observe. Finding meaning in the metaphors of the art." 
                },
                { 
                  icon: CheckCircle2, 
                  step: "04. Integration", 
                  desc: "Bridging the gap. How do we take this feeling back to our work or life?" 
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative group hover:-translate-y-1 transition-transform duration-300">
                   <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-6 mx-auto ring-4 ring-white">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <h3 className="font-bold text-lg mb-3 text-center">{item.step}</h3>
                   <p className="text-sm text-gray-500 text-center leading-relaxed">
                      {item.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* === METRICS === */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
           <div className="md:w-1/2">
              <h2 className="font-serif text-4xl mb-6">Measuring What Matters</h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                 While art is subjective, impact is tangible. We track engagement and sentiment to ensure our programs deliver real ROI for organizations and individuals.
              </p>
              
              <ul className="space-y-6">
                 <li className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full text-green-700 mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                    <div>
                       <h4 className="font-bold text-lg">Engagement Scores</h4>
                       <p className="text-sm text-gray-500">Active participation rates compared to standard events.</p>
                    </div>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-700 mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                    <div>
                       <h4 className="font-bold text-lg">Wellbeing Feedback</h4>
                       <p className="text-sm text-gray-500">Self-reported reduction in stress levels post-session.</p>
                    </div>
                 </li>
                 <li className="flex items-start gap-4">
                    <div className="bg-purple-100 p-2 rounded-full text-purple-700 mt-1"><CheckCircle2 className="w-4 h-4" /></div>
                    <div>
                       <h4 className="font-bold text-lg">Connection Index</h4>
                       <p className="text-sm text-gray-500">Qualitative data on team bonding and psychological safety.</p>
                    </div>
                 </li>
              </ul>
           </div>

           <div className="md:w-1/2 bg-gray-900 text-white p-10 md:p-16 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[60px] opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600 blur-[60px] opacity-50"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-12 text-center">
                 <div>
                    <span className="block text-5xl md:text-6xl font-serif mb-2">50+</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Murals Created</span>
                 </div>
                 <div>
                    <span className="block text-5xl md:text-6xl font-serif mb-2">500+</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Participants</span>
                 </div>
                 <div className="col-span-2 pt-8 border-t border-gray-800">
                    <span className="block text-5xl md:text-6xl font-serif mb-2">100%</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Creative Flow</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* === PARTNER CTA === */}
      <section className="bg-black text-white py-24 px-6 md:px-10">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Partner With Us</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
               We are always looking to collaborate with like-minded creators and venues.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
               <Link href="/contact" className="group bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-600">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-blue-400 transition-colors">For Artists</h3>
                  <p className="text-sm text-gray-500 mb-4">Join our collective of facilitators and muralists.</p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest">Apply <ArrowRight className="w-3 h-3 ml-2" /></div>
               </Link>
               
               <Link href="/contact" className="group bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-600">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-green-400 transition-colors">For Therapists</h3>
                  <p className="text-sm text-gray-500 mb-4">Co-create wellness-focused art sessions.</p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest">Connect <ArrowRight className="w-3 h-3 ml-2" /></div>
               </Link>

               <Link href="/contact" className="group bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800 hover:border-gray-600">
                  <h3 className="font-serif text-xl mb-2 group-hover:text-purple-400 transition-colors">For Venues</h3>
                  <p className="text-sm text-gray-500 mb-4">Host art workshops or retreats at your space.</p>
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest">Partner <ArrowRight className="w-3 h-3 ml-2" /></div>
               </Link>
            </div>
         </div>
      </section>

    </div>
  );
}