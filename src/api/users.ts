import type { ApiResponse } from "@/types/api";
import type { ClubListResponse } from "@/types/club";
import { buildAuthHeaders, buildHeaders, getResponseMessage } from "@/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const USERS_API_BASE_URL = `${API_BASE_URL}/api/v1/users`;

type CursorResponse<T> = {
  items: T[];
  cursor?: number;
  nextCursor?: number;
  hasNext?: boolean;
};

export type ReviewPhoto = {
  photoId: string;
  photoUrl: string;
};

export type MyReviewListItem = {
  reviewId?: string;
  facilityID?: string;
  facilityId?: string;
  facilityName?: string;
  text?: string;
  createdAt?: string;
  created_at?: string;
  photos?: ReviewPhoto[];
};

type MyReviewListResponse = ApiResponse<CursorResponse<MyReviewListItem>>;

type MyReviewDetailSuccess = {
  item?: MyReviewListItem;
  items?: MyReviewListItem[];
} & MyReviewListItem;

type MyReviewDetailResponse = ApiResponse<MyReviewDetailSuccess>;

export type UpdateMyReviewPayload = {
  text: string;
  photos?: ReviewPhoto[];
};

type UpdateMyReviewResponse = ApiResponse<{
  updatedAt: string;
}>;

export type MyRegion = {
  city?: string;
  district?: string;
};

export type MyInfo = {
  id?: string;
  userId?: string;
  birth?: string;
  profilePhotoUrl?: string;
  introduce?: string;
  region?: MyRegion;
  // NOTE: 오탈자/확장 가능성: API 명세에 없지만 화면에서 필요한 필드
  name?: string;
  phoneNumber?: string;
  gender?: string;
};

type GetMyInfoResponse = ApiResponse<MyInfo>;

export type UpdateMyInfoPayload = {
  name: string;
  phoneNumber: string;
  introduce: string;
  profilePhotoUrl: string;
  regionId: number;
};

type UpdateMyInfoResponse = ApiResponse<{
  updatedAt: string;
}>;

export const getMyClubs = async () => {
  const res = await fetch(`${USERS_API_BASE_URL}/me/clubs`, {
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
  const res = await fetch(`${USERS_API_BASE_URL}/me/clubs/managed`, {
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

// API: GET /api/v1/users/me
export const getMyInfo = async () => {
  const res = await fetch(`${USERS_API_BASE_URL}/me`, {
    method: "GET",
    headers: buildAuthHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to fetch my info"));
  }

  return body as GetMyInfoResponse;
};

// API: PUT /api/v1/users/me
export const updateMyInfo = async (payload: UpdateMyInfoPayload) => {
  const res = await fetch(`${USERS_API_BASE_URL}/me`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(payload)
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to update my info"));
  }

  return body as UpdateMyInfoResponse;
};

// API: GET /api/v1/users/me/reviews
export const getMyReviews = async (cursor?: number) => {
  const params = new URLSearchParams();
  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const query = params.toString();
  const endpoint = `${USERS_API_BASE_URL}/me/reviews${query ? `?${query}` : ""}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: buildAuthHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to fetch my reviews"));
  }

  return body as MyReviewListResponse;
};

// API: GET /api/v1/users/me/reviews/{reviewId}
export const getMyReviewDetail = async (reviewId: string) => {
  const res = await fetch(`${USERS_API_BASE_URL}/me/reviews/${reviewId}`, {
    method: "GET",
    headers: buildAuthHeaders()
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      getResponseMessage(body, "Failed to fetch my review detail")
    );
  }

  return body as MyReviewDetailResponse;
};

// API: PUT /api/v1/users/me/reviews/{reviewId}
export const updateMyReview = async (
  reviewId: string,
  payload: UpdateMyReviewPayload
) => {
  const res = await fetch(`${USERS_API_BASE_URL}/me/reviews/${reviewId}`, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(payload)
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to update my review"));
  }

  return body as UpdateMyReviewResponse;
};
