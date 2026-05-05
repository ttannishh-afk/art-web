"use client";

import { useState } from "react";
import { Mail, MapPin, Instagram } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const inquiryOptions = [
  { label: "Corporate Workshops / Culture", value: "CORPORATE_WORKSHOPS" },
  { label: "Office Murals / Space Design", value: "OFFICE_MURALS" },
  { label: "Wellness Retreats / Sessions", value: "WELLNESS_RETREATS" },
  { label: "Purchasing Art", value: "PURCHASING_ART" },
  { label: "Other Inquiry", value: "OTHER" },
];

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  inquiryType: string;
  message: string;
  website?: string;
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    defaultValues: { inquiryType: inquiryOptions[0].value },
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(json.error || "Unable to send your inquiry.");
      }

      reset();
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to send your inquiry.");
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
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-10">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl">Message Received</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Thank you for reaching out. Your inquiry is now in our system and a member of the team will follow up soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-bold uppercase tracking-widest underline hover:text-blue-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot */}
              <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    maxLength={80}
                    placeholder="Full Name"
                    className={`w-full bg-white border p-3 rounded focus:outline-none focus:border-black transition-colors text-sm ${errors.name ? "border-red-400" : "border-gray-200"}`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Company (Optional)</label>
                  <input
                    type="text"
                    maxLength={120}
                    placeholder="Organization"
                    className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm"
                    {...register("company")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  maxLength={320}
                  placeholder="name@example.com"
                  className={`w-full bg-white border p-3 rounded focus:outline-none focus:border-black transition-colors text-sm ${errors.email ? "border-red-400" : "border-gray-200"}`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">I am interested in...</label>
                <select
                  className="w-full bg-white border border-gray-200 p-3 rounded focus:outline-none focus:border-black transition-colors text-sm appearance-none cursor-pointer"
                  {...register("inquiryType")}
                >
                  {inquiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Message</label>
                <textarea
                  rows={4}
                  maxLength={3000}
                  placeholder="Tell us about your project, timeline, or goals..."
                  className={`w-full bg-white border p-3 rounded focus:outline-none focus:border-black transition-colors resize-none text-sm ${errors.message ? "border-red-400" : "border-gray-200"}`}
                  {...register("message", { required: "Message is required", minLength: { value: 20, message: "Please write at least 20 characters" } })}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

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
