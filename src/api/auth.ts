import { useAuthStore } from "@/stores/authStore";

type LegacyMessageBody = {
  message?: string;
  // Keep compatibility with backend typo field name: messege
  messege?: string;
  error?: string | null;
} | null;

type LegacyResultTypeBody = {
  resultType?: "SUCCESS" | "FAIL";
  // Keep compatibility with backend typo field name: resultTyle
  resultTyle?: "SUCCESS" | "FAIL";
} | null;

export const getAccessToken = () => {
  const storeToken = useAuthStore.getState().accessToken;
  return storeToken ?? localStorage.getItem("accessToken");
};

export const getResponseMessage = (body: unknown, fallback: string) => {
  const parsed = body as LegacyMessageBody;
  return parsed?.message ?? parsed?.messege ?? parsed?.error ?? fallback;
};

export const buildAuthHeaders = (withJsonContentType = false) => {
  const token = getAccessToken();
  const authorization =
    token && token.toLowerCase().startsWith("bearer ")
      ? token
      : token
        ? `Bearer ${token}`
        : undefined;

  return {
    ...(withJsonContentType ? { "Content-Type": "application/json" } : {}),
    ...(authorization ? { Authorization: authorization } : {})
  };
};

export const buildHeaders = () => {
  return buildAuthHeaders(true);
};

export const getApiResultType = (body: unknown) => {
  const parsed = body as LegacyResultTypeBody;
  return parsed?.resultType ?? parsed?.resultTyle;
};
