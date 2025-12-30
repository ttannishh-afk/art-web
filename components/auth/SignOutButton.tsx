"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors border border-gray-200 px-4 py-2 rounded-full hover:border-red-200"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
}