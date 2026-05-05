import { create } from "zustand";

interface AccentStore {
  isBlue: boolean;
  setIsBlue: (v: boolean) => void;
}

export const useAccentStore = create<AccentStore>((set) => ({
  isBlue: false,
  setIsBlue: (v) => set({ isBlue: v }),
}));
