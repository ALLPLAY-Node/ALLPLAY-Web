import type { ApiResponse } from "@/types/api";
import { buildAuthHeaders, getResponseMessage } from "@/api/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export type ClubAgeGroup =
  | "TEENS"
  | "TWENTIES"
  | "THIRTIES"
  | "FORTIES"
  | "FIFTIES"
  | "OVER_SIXTIES";

export type ClubLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type UpdateClubInfoPayload = {
  clubName: string;
  sportType: string;
  city: string;
  district: string;
  ageGroup: ClubAgeGroup;
  images?: File[];
  maxMembers: number;
  activityFrequency: string;
  level: ClubLevel;
  description: string;
  joinRequirement: string;
  contact: string;
  // NOTE: backend compatibility - request key is intentionally "hompageUrl" (typo).
  hompageUrl?: string;
};

export type ClubJoinRequestStatus = "APPROVED" | "REJECTED";

export type ClubJoinRequestItem = {
  id: string | number;
  club_id: string;
  user_id: string;
  applicationDate: string;
};

type CursorResponse<T> = {
  items: T[];
  nextCursor?: number;
  hasNext?: boolean;
};

type UpdateClubInfoSuccess = {
  id: string;
  clubName: string;
  createdAt: string;
};

type UpdateClubInfoResponse = ApiResponse<UpdateClubInfoSuccess>;

type ClubJoinRequestListResponse = ApiResponse<
  CursorResponse<ClubJoinRequestItem>
>;

type ClubJoinDecisionResponse = ApiResponse<Record<string, never>>;

const buildUpdateClubFormData = (payload: UpdateClubInfoPayload) => {
  const formData = new FormData();

  formData.append("clubName", payload.clubName);
  formData.append("sportType", payload.sportType);
  formData.append("city", payload.city);
  formData.append("district", payload.district);
  formData.append("ageGroup", payload.ageGroup);
  formData.append("maxMembers", String(payload.maxMembers));
  formData.append("activityFrequency", payload.activityFrequency);
  formData.append("level", payload.level);
  formData.append("description", payload.description);
  formData.append("joinRequirement", payload.joinRequirement);
  formData.append("contact", payload.contact);

  if (payload.hompageUrl) {
    // NOTE: backend compatibility - request key is intentionally "hompageUrl" (typo).
    formData.append("hompageUrl", payload.hompageUrl);
  }

  payload.images?.forEach((file) => {
    formData.append("images", file);
  });

  return formData;
};

// API: PUT /clubs/{clubId}
export const updateClubInfo = async (
  clubId: string,
  payload: UpdateClubInfoPayload
) => {
  const res = await fetch(`${API_BASE_URL}/clubs/${clubId}`, {
    method: "PUT",
    headers: buildAuthHeaders(),
    body: buildUpdateClubFormData(payload)
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      getResponseMessage(body, "Failed to update club information.")
    );
  }

  return body as UpdateClubInfoResponse;
};

// API: POST /clubs/{clubId}/join
export const requestJoinClub = async (clubId: string) => {
  const res = await fetch(`${API_BASE_URL}/clubs/${clubId}/join`, {
    method: "POST",
    headers: buildAuthHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to request club join."));
  }

  return body as ApiResponse<{
    clubId: string;
    userId: string;
    createdAt: string;
  }>;
};

// API: GET /clubs/{clubId}/join-requests
export const getClubJoinRequests = async (clubId: string, cursor?: number) => {
  const params = new URLSearchParams();
  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const query = params.toString();
  const endpoint = `${API_BASE_URL}/clubs/${clubId}/join-requests${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: buildAuthHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      getResponseMessage(body, "Failed to fetch join request status.")
    );
  }

  return body as ClubJoinRequestListResponse;
};

// API: POST /clubs/{clubId}/join-requests/{requestId}
export const processClubJoinRequest = async (
  clubId: string,
  requestId: string,
  status: ClubJoinRequestStatus
) => {
  const res = await fetch(
    `${API_BASE_URL}/clubs/${clubId}/join-requests/${requestId}`,
    {
      method: "POST",
      headers: buildAuthHeaders(true),
      body: JSON.stringify({ status })
    }
  );

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      getResponseMessage(body, "Failed to process join request.")
    );
  }

  return body as ClubJoinDecisionResponse;
};
