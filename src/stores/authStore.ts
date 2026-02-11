import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken?: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (accessToken, refreshToken) =>
        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken
        })),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null
        })
    }),
    { name: "auth-storage" }
  )
);
