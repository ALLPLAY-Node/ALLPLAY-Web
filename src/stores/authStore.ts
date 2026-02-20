import { create } from "zustand";
import { persist } from "zustand/middleware";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const getLegacyToken = (key: string) => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

const setLegacyTokens = (
  accessToken: string | null,
  refreshToken?: string | null
) => {
  if (typeof window === "undefined") {
    return;
  }

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  } else if (refreshToken === null) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken?: string | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: getLegacyToken(ACCESS_TOKEN_KEY),
      refreshToken: getLegacyToken(REFRESH_TOKEN_KEY),
      setTokens: (accessToken, refreshToken) => {
        setLegacyTokens(accessToken, refreshToken ?? undefined);
        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken
        }));
      },
      clearAuth: () => {
        setLegacyTokens(null, null);
        set({
          accessToken: null,
          refreshToken: null
        });
      }
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }
        setLegacyTokens(state.accessToken, state.refreshToken);
      }
    }
  )
);
