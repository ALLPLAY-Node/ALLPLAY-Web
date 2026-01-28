import type { ApiResponse } from "@/types/api";
import type { ClubListResponse } from "@/types/club";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const buildHeaders = () => {
  const token = getAccessToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: token } : {})
  };
};

export const getMyClubs = async () => {
  const res = await fetch(`${API_BASE_URL}/users/me/clubs`, {
    method: "GET",
    headers: buildHeaders()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my clubs");
  }

  return (await res.json()) as ApiResponse<ClubListResponse>;
};

export const getManagedClubs = async () => {
  const res = await fetch(`${API_BASE_URL}/users/me/clubs/managed`, {
    method: "GET",
    headers: buildHeaders()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch managed clubs");
  }

  return (await res.json()) as ApiResponse<ClubListResponse>;
};
