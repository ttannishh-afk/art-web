import Link from "next/link";
import { Zap, Users, Layout, Briefcase, BarChart } from "lucide-react";

export default function ForWorkPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* === HERO SECTION === */}
      <section className="px-6 md:px-10 mb-24 max-w-7xl mx-auto">
        <div className="bg-gray-900 text-white rounded-2xl overflow-hidden relative min-h-[500px] flex items-center">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 bg-gray-800 opacity-50 z-0">
             {/* <Image src="/office-art.jpg" fill className="object-cover" /> */}
          </div>
          
          <div className="relative z-10 p-8 md:p-16 max-w-3xl">
             <span className="inline-block py-1 px-3 rounded bg-white/20 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-6">
                Corporate Solutions
             </span>
             <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">
               Building Culture <br/> Through Creativity.
             </h1>
             <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
               Art-led experiences for teams, leaders, and workspaces. We turn generic offices into hubs of connection and innovation.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors text-center">
                  Request a Proposal
                </Link>
                <Link href="#offerings" className="border border-white text-white px-8 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors text-center">
                  View Offerings
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* === PROBLEM / SOLUTION === */}
      <section className="py-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3 sticky top-32">
             <h2 className="font-serif text-4xl mb-4">Why Art at Work?</h2>
             <p className="text-gray-500 mb-8">
               Modern teams don&apos;t suffer from a lack of tools. They suffer from a lack of connection.
             </p>
             <div className="h-1 w-20 bg-black"></div>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
             {/* Card 1 */}
             <div className="p-6 bg-gray-50 rounded-xl">
               <Zap className="w-8 h-8 text-yellow-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">Combat Burnout</h3>
               <p className="text-sm text-gray-600">Standard team-building feels like a chore. Art provides a genuine mental break and restores creative energy.</p>
             </div>
             {/* Card 2 */}
             <div className="p-6 bg-gray-50 rounded-xl">
               <Users className="w-8 h-8 text-blue-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">Deep Connection</h3>
               <p className="text-sm text-gray-600">Creating something together builds trust faster than any seminar. It levels the playing field.</p>
             </div>
             {/* Card 3 */}
             <div className="p-6 bg-gray-50 rounded-xl">
               <Briefcase className="w-8 h-8 text-purple-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">Identity & Culture</h3>
               <p className="text-sm text-gray-600">Generic offices create generic work. Custom art gives your team a shared sense of identity.</p>
             </div>
             {/* Card 4 */}
             <div className="p-6 bg-gray-50 rounded-xl">
               <BarChart className="w-8 h-8 text-green-600 mb-4" />
               <h3 className="font-bold text-lg mb-2">Engagement</h3>
               <p className="text-sm text-gray-600">Companies that invest in creative wellbeing see higher retention and happier teams.</p>
             </div>
          </div>
        </div>
      </section>

      {/* === OFFERINGS === */}
      <section id="offerings" className="bg-black text-white py-24 px-6 md:px-10">
         <div className="max-w-7xl mx-auto">
            <div className="mb-16">
               <span className="text-gray-400 text-xs font-bold tracking-widest uppercase block mb-2">Our Services</span>
               <h2 className="font-serif text-4xl md:text-5xl">What We Offer</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               
               {/* Service 1 */}
               <div className="group border border-gray-800 p-8 rounded-2xl hover:bg-gray-900 transition-colors">
                  <div className="mb-8 p-4 bg-gray-800 rounded-lg w-fit group-hover:bg-white group-hover:text-black transition-colors">
                     <Layout className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Workshops</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                     Hands-on painting, sculpting, or sketching sessions designed for non-artists. Perfect for offsites and team days.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 mb-8">
                     <li>• Guided by professional artists</li>
                     <li>• All materials provided</li>
                     <li>• 2-4 hour sessions</li>
                  </ul>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-1 hover:text-white hover:border-white transition-colors">
                     Book Workshop
                  </Link>
               </div>

               {/* Service 2 */}
               <div className="group border border-gray-800 p-8 rounded-2xl hover:bg-gray-900 transition-colors">
                  <div className="mb-8 p-4 bg-gray-800 rounded-lg w-fit group-hover:bg-white group-hover:text-black transition-colors">
                     <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Office Murals</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                     Transform blank walls into visual stories. We can paint for you, or design a &ldquo;Paint-by-Numbers&rdquo; mural your team paints together.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 mb-8">
                     <li>• Custom design process</li>
                     <li>• Brand-aligned themes</li>
                     <li>• Collaborative options</li>
                  </ul>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-1 hover:text-white hover:border-white transition-colors">
                     Commission Art
                  </Link>
               </div>

               {/* Service 3 */}
               <div className="group border border-gray-800 p-8 rounded-2xl hover:bg-gray-900 transition-colors">
                  <div className="mb-8 p-4 bg-gray-800 rounded-lg w-fit group-hover:bg-white group-hover:text-black transition-colors">
                     <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Culture as Service</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                     Ongoing creative programming for your office. Monthly art rotations, wellness sessions, and creative challenges.
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 mb-8">
                     <li>• Quarterly or Annual plans</li>
                     <li>• Venue partnerships</li>
                     <li>• CSR & Community art</li>
                  </ul>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest border-b border-gray-700 pb-1 hover:text-white hover:border-white transition-colors">
                     Start Subscription
                  </Link>
               </div>

            </div>
         </div>
      </section>

      {/* === CASE STUDIES (Visual Proof) === */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">Work That Speaks</h2>
            <p className="text-gray-500">Real transformations for real teams.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer">
               <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">
                     [BEFORE / AFTER IMAGE]
                  </div>
               </div>
               <div className="p-8">
                  <h3 className="font-bold text-xl mb-2">Tech Startup HQ</h3>
                  <p className="text-sm text-gray-600 mb-4">Converted a sterile white cafeteria into a vibrant jungle-themed collaborative zone.</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-900">View Project</span>
               </div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer">
               <div className="relative aspect-video bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-mono text-xs">
                     [TEAM WORKSHOP PHOTO]
                  </div>
               </div>
               <div className="p-8">
                  <h3 className="font-bold text-xl mb-2">Annual Leadership Offsite</h3>
                  <p className="text-sm text-gray-600 mb-4">Facilitated a &ldquo;Vision Board&rdquo; painting session for 50 executives to align on company goals.</p>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-900">View Project</span>
               </div>
            </div>
         </div>
      </section>

      {/* === CTA === */}
      <section className="bg-blue-900 text-white py-24 px-6 md:px-10 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl mb-8">Let’s Design Your Next Experience</h2>
            <p className="text-blue-200 text-lg mb-10">Whether you need a one-off mural or a year-long culture strategy, we are ready to collaborate.</p>
            <Link href="/contact" className="inline-block bg-white text-blue-900 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors">
               Book a Discovery Call
            </Link>
         </div>
      </section>

    </div>
  );
}
