"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name?: string;
  phone?: string;
  email: string;
  password: string;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    reset();
    setIsLogin(true);
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (res?.error) {
          toast.error("Invalid email or password.");
        } else {
          toast.success("Welcome back!");
          onClose();
          router.refresh();
        }
      } else {
        const res = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const json = await res.json() as { error?: string };
        if (res.ok) {
          await signIn("credentials", { redirect: false, email: data.email, password: data.password });
          toast.success("Account created! Welcome.");
          onClose();
          router.refresh();
        } else {
          toast.error(json.error || "Registration failed. Try a different email.");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${errors.name ? "border-red-400" : "border-gray-200"}`}
                  {...register("name", { required: !isLogin })}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">Name is required</p>}
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                {...register("phone")}
              />
            </>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${errors.email ? "border-red-400" : "border-gray-200"}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className={`w-full p-3 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${errors.password ? "border-red-400" : "border-gray-200"}`}
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>

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
            onClick={() => { setIsLogin(!isLogin); reset(); }}
            className="text-black font-semibold hover:underline"
          >
            {isLogin ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
