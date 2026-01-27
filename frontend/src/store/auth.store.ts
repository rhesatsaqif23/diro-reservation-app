import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state (client-safe)
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  isAuthenticated:
    typeof window !== "undefined" && Boolean(localStorage.getItem("token")),

  // Simpan token ke state & localStorage
  login: (token) => {
    localStorage.setItem("token", token);
    set({
      token,
      isAuthenticated: true,
    });
  },

  // Hapus token dan reset auth state
  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
