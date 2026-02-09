import type { ApiResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const getResponseMessage = (body: unknown, fallback: string) => {
  const parsed = body as { message?: string; messege?: string } | null;
  return parsed?.message ?? parsed?.messege ?? fallback;
};

const buildAuthHeaders = (withJsonContentType = false) => {
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

type UpdateClubInfoResponse = ApiResponse<UpdateClubInfoSuccess> & {
  resultTyle?: "SUCCESS" | "FAIL";
};

type ClubJoinRequestListResponse = ApiResponse<
  CursorResponse<ClubJoinRequestItem>
> & {
  resultTyle?: "SUCCESS" | "FAIL";
};

type ClubJoinDecisionResponse = ApiResponse<Record<string, never>> & {
  resultTyle?: "SUCCESS" | "FAIL";
};

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
      getResponseMessage(body, "동호회 정보 수정 중 오류가 발생했습니다.")
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
    throw new Error(
      getResponseMessage(body, "가입 신청 중 오류가 발생했습니다.")
    );
  }

  return body as ApiResponse<{
    clubId: string;
    userId: string;
    createdAt: string;
  }> & { resultTyle?: "SUCCESS" | "FAIL" };
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
      getResponseMessage(body, "가입 신청 현황 조회 중 오류가 발생했습니다.")
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
      getResponseMessage(body, "가입 신청 처리 중 오류가 발생했습니다.")
    );
  }

  return body as ClubJoinDecisionResponse;
};
