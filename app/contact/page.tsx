"use client";

import { useState } from "react";
import { Mail, MapPin, Instagram } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left Column: Info */}
        <div>
          <h1 className="font-serif text-5xl mb-6">Get in Touch</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-12">
            I am currently open for commissions and collaborative projects. 
            Whether you are interested in a specific piece or just want to discuss art, 
            I'd love to hear from you.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Email</h3>
                <p className="text-gray-500">hello@tanishgupta.com</p>
                <p className="text-gray-400 text-sm">Response time: 24-48 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Studio</h3>
                <p className="text-gray-500">Dehradun, Uttarakhand</p>
                <p className="text-gray-400 text-sm">Visits by appointment only</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Social</h3>
                <p className="text-gray-500">@tanishgupta.art</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-lg">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl">Message Sent!</h3>
              <p className="text-gray-500">Thank you for reaching out. I will get back to you shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 text-sm underline hover:text-black"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-white border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 font-bold tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}