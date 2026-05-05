"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { X, Shield, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Reset via key prop from parent — no useEffect needed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: email.trim().toLowerCase(),
      password,
    });

    if (res?.error) {
      toast.error("Incorrect admin credentials.");
      setIsLoading(false);
      return;
    }

    // Now verify the user is actually an admin
    const check = await fetch("/api/auth/session");
    const sessionData = await check.json();
    const sessionEmail = sessionData?.user?.email;

    if (!sessionEmail) {
      toast.error("Incorrect admin credentials.");
      setIsLoading(false);
      return;
    }

    // Check role via a lightweight endpoint
    const roleCheck = await fetch("/api/admin-check");
    const roleData = await roleCheck.json() as { isAdmin?: boolean };

    if (!roleData.isAdmin) {
      // Sign them back out — not an admin
      await fetch("/api/auth/signout", { method: "POST" });
      toast.error("Incorrect admin credentials.");
      setIsLoading(false);
      return;
    }

    toast.success("Welcome to the Studio.");
    onClose();
    router.refresh();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="relative w-full max-w-sm bg-white text-zinc-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400" />

            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon + Title */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 ring-1 ring-rose-100">
                  <Shield className="w-7 h-7 text-rose-600" />
                </div>
                <h2 className="font-serif text-2xl text-center">Studio Access</h2>
                <p className="text-xs text-zinc-400 text-center mt-1 tracking-wide">
                  Restricted to authorised administrators only
                </p>
              </div>


              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    placeholder="admin@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-zinc-900 text-white py-3 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-rose-600 transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                  ) : (
                    "Enter Studio"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
