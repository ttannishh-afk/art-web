"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { X, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // New: Store error messages
  const [form, setForm] = useState({ email: "", password: "", phone: "", name: "" });
  const router = useRouter();

  // Reset state when modal opens/closes or switches modes
  useEffect(() => {
    setError("");
    setForm({ email: "", password: "", phone: "", name: "" });
  }, [isOpen, isLogin]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const res = await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });
        
        if (res?.error) {
          setError("Invalid email or password.");
        } else {
          onClose();
          router.refresh();
        }
      } else {
        // --- REGISTER LOGIC ---
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(form),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok) {
          // Auto login after register
          await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
          });
          onClose();
          router.refresh();
        } else {
          setError(data.error || "Registration failed. Try a different email.");
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-xl relative shadow-2xl">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-serif font-bold mb-2 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          {isLogin ? "Enter your details to access your account" : "Join us to start collecting art"}
        </p>

        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
              />
            </>
          )}
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            value={form.email}
            onChange={(e) => {
                setForm({...form, email: e.target.value});
                if(error) setError(""); // Clear error when typing
            }}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            value={form.password}
            onChange={(e) => {
                setForm({...form, password: e.target.value});
                if(error) setError(""); // Clear error when typing
            }}
            required 
          />

          <button 
            disabled={isLoading}
            className="w-full bg-black text-white py-4 font-medium rounded-lg hover:bg-gray-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              isLogin ? "Sign In" : "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          {isLogin ? "New here? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-black font-semibold hover:underline"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
