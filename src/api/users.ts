import type { ApiResponse } from "@/types/api";
import type { ClubListResponse } from "@/types/club";
import {
  buildAuthHeaders,
  buildHeaders,
  getResponseMessage
} from "@/api/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

type CursorResponse<T> = {
  items: T[];
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

  return body as ApiResponse<Record<string, never>>;
};

// API: GET /users/me/reviews
export const getMyReviews = async (cursor?: number) => {
  const params = new URLSearchParams();
  if (cursor !== undefined) {
    params.set("cursor", String(cursor));
  }

  const query = params.toString();
  const endpoint = `${API_BASE_URL}/users/me/reviews${query ? `?${query}` : ""}`;

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

// API: GET /users/me/review/{reviewId}
export const getMyReviewDetail = async (reviewId: string) => {
  const res = await fetch(`${API_BASE_URL}/users/me/review/${reviewId}`, {
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

// API: PUT /users/me/reviews/{reviewId}
export const updateMyReview = async (
  reviewId: string,
  payload: UpdateMyReviewPayload
) => {
  const res = await fetch(`${API_BASE_URL}/users/me/reviews/${reviewId}`, {
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
