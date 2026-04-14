"use client";

import { useState } from "react";
import { Mail, MapPin, Instagram } from "lucide-react";

const inquiryOptions = [
  { label: "Corporate Workshops / Culture", value: "CORPORATE_WORKSHOPS" },
  { label: "Office Murals / Space Design", value: "OFFICE_MURALS" },
  { label: "Wellness Retreats / Sessions", value: "WELLNESS_RETREATS" },
  { label: "Purchasing Art", value: "PURCHASING_ART" },
  { label: "Other Inquiry", value: "OTHER" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      inquiryType: formData.get("inquiryType"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your inquiry.");
      }

      form.reset();
      setSuccess(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send your inquiry.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-4 block">Get In Touch</span>
          <h1 className="font-serif text-5xl mb-6">Let&apos;s Create Together</h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            Whether you are a company looking to build culture, an individual seeking creative healing, or a collector interested in our gallery, we are ready to listen.
          </p>

          <div className="space-y-8 border-t border-gray-100 pt-8">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Inquiries</h3>
                <p className="text-gray-500">hello@theartmovement.com</p>
                <p className="text-gray-400 text-sm">For proposals and bookings</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Studio HQ</h3>
                <p className="text-gray-500">Dehradun, Uttarakhand</p>
                <p className="text-gray-400 text-sm">Visits by appointment only</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-3 rounded-full">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl mb-1">Follow Us</h3>
                <p className="text-gray-500">@tanishgupta.art</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl">Message Received</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Thank you for reaching out. Your inquiry is now in our system and a member of the team will follow up soon.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  setError(null);
                }}
                className="mt-6 text-xs font-bold uppercase tracking-widest underline hover:text-blue-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    maxLength={80}
                    className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    maxLength={120}
                    className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm"
                    placeholder="Organization"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={320}
                  className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">I am interested in...</label>
                <select
                  name="inquiryType"
                  defaultValue={inquiryOptions[0].value}
                  className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm appearance-none cursor-pointer"
                >
                  {inquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  minLength={20}
                  maxLength={3000}
                  className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors resize-none text-sm"
                  placeholder="Tell us about your project, timeline, or goals..."
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded font-bold tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 text-xs uppercase"
              >
                {loading ? "Sending Request..." : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
