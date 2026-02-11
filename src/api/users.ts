import type { ApiResponse } from "@/types/api";
import type { ClubListResponse } from "@/types/club";
import {
  buildAuthHeaders,
  buildHeaders,
  getApiResultType,
  getResponseMessage
} from "@/api/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

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

export type PresignedDomain =
  | "reviews"
  | "facilities"
  | "clubs"
  | "user-profile";
export type PresignedOperation = "PUT" | "GET";

export type IssuePresignedUrlPayload = {
  domain: PresignedDomain;
  operation: PresignedOperation;
  fileName: string;
  fileType: string;
};

export type IssuePresignedUrlSuccess = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  expiresIn?: number;
};

type IssuePresignedUrlResponse = ApiResponse<IssuePresignedUrlSuccess>;

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

// API: POST /presigned-url
export const issuePresignedUrl = async (payload: IssuePresignedUrlPayload) => {
  const res = await fetch(`${API_BASE_URL}/presigned-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to issue presigned url"));
  }

  // 오탈자 확인: 백엔드 응답에서 resultType 대신 resultTyle이 내려올 수 있음.
  const resultType = getApiResultType(body);
  if (resultType !== "SUCCESS") {
    throw new Error(getResponseMessage(body, "Failed to issue presigned url"));
  }

  return body as IssuePresignedUrlResponse;
};

export const uploadFileToPresignedUrl = async (
  file: File,
  presigned: IssuePresignedUrlSuccess
) => {
  const uploadHeaders = {
    ...(presigned.headers ?? {}),
    ...(!presigned.headers?.["Content-Type"] && file.type
      ? { "Content-Type": file.type }
      : {})
  };

  const uploadRes = await fetch(presigned.url, {
    method: presigned.method || "PUT",
    headers: uploadHeaders,
    body: file
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to storage");
  }

  return presigned.url.split("?")[0];
};
