import type { ApiResponse } from "@/types/api";
import type { ClubListResponse } from "@/types/club";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getResponseMessage = (body: unknown, fallback: string) => {
  const parsed = body as { message?: string; messege?: string } | null;
  return parsed?.message ?? parsed?.messege ?? fallback;
};

const buildHeaders = () => {
  const token = getAccessToken();
  const authorization =
    token && token.toLowerCase().startsWith("bearer ")
      ? token
      : token
        ? `Bearer ${token}`
        : undefined;

  return {
    "Content-Type": "application/json",
    ...(authorization ? { Authorization: authorization } : {})
  };
};

export const getMyClubs = async () => {
  const res = await fetch(`${API_BASE_URL}/users/me/clubs`, {
    method: "GET",
    headers: buildHeaders()
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(getResponseMessage(errorBody, "Failed to fetch my clubs"));
  }

  return (await res.json()) as ApiResponse<ClubListResponse>;
};

export const getManagedClubs = async () => {
  const res = await fetch(`${API_BASE_URL}/users/me/clubs/managed`, {
    method: "GET",
    headers: buildHeaders()
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      getResponseMessage(errorBody, "Failed to fetch managed clubs")
    );
  }

  return (await res.json()) as ApiResponse<ClubListResponse>;
};

export const leaveClub = async (clubId: string) => {
  const res = await fetch(`${API_BASE_URL}/clubs/${clubId}/join`, {
    method: "DELETE",
    headers: buildHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to leave club"));
  }

  return body as ApiResponse<Record<string, never>> & {
    resultTyle?: "SUCCESS" | "FAIL";
  };
};
