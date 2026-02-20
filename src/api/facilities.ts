import { buildAuthHeaders, getResponseMessage } from "@/api/auth";
import type {
  FacilitiesQueryParams,
  FacilitiesResponse,
  FacilityDetailResponse,
  CreateFacilityRequest,
  CreateFacilityResponse
} from "@/types/facilities";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

type ApiEnvelope<T> = {
  resultType?: "SUCCESS" | "ERROR" | "FAIL";
  resultTyle?: "SUCCESS" | "ERROR" | "FAIL";
  message: string;
  error: string | null;
  success: T | null;
};

const getResultType = (data: { resultType?: string; resultTyle?: string }) =>
  data.resultType ?? data.resultTyle ?? "ERROR";

export const getFacilities = async (
  params: FacilitiesQueryParams = {}
): Promise<FacilitiesResponse> => {
  const queryParams = new URLSearchParams();

  if (typeof params.isPublic === "boolean") {
    queryParams.append("isPublic", String(params.isPublic));
  }
  if (params.regionId) {
    queryParams.append("regionId", params.regionId);
  }
  if (typeof params.isReservable === "boolean") {
    queryParams.append("isReservable", String(params.isReservable));
  }
  if (typeof params.isFree === "boolean") {
    queryParams.append("isFree", String(params.isFree));
  }
  if (params.keyword) {
    queryParams.append("keyword", params.keyword);
  }
  if (typeof params.sportId === "number") {
    queryParams.append("sportId", params.sportId.toString());
  }
  if (typeof params.cursor !== "undefined" && params.cursor !== null) {
    queryParams.append("cursor", String(params.cursor));
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/facilities${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    let errorDetail = "";
    try {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        errorDetail = JSON.stringify(data);
      } else {
        errorDetail = await response.text();
      }
    } catch {
      // Ignore parsing errors and fall back to status text only.
    }
    const message = `Failed to fetch facilities: ${response.status} ${response.statusText}${errorDetail ? ` - ${errorDetail}` : ""}`;
    console.error(message, { url });
    throw new Error(message);
  }

  const data = (await response.json()) as ApiEnvelope<{
    items: Array<{
      id: number;
      facilityName: string;
      city: string;
      district: string;
      address: string;
      isReservable: boolean;
      isPublic: boolean;
      homepageUrl: string;
    }>;
    cursor: number | null;
    hasNext: boolean;
  }>;

  if (getResultType(data) !== "SUCCESS" || !data.success) {
    const message = `Failed to fetch facilities: ${data.message || "Unknown error"}${data.error ? ` - ${data.error}` : ""}`;
    console.error(message, { url, data });
    throw new Error(message);
  }

  return {
    resultType: "SUCCESS",
    message: data.message,
    error: null,
    success: data.success
  };
};

export const getFacilityDetail = async (
  facilityId: string
): Promise<FacilityDetailResponse> => {
  const encodedId = encodeURIComponent(facilityId);
  const url = `${API_BASE_URL}/facilities/${encodedId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    let errorDetail = "";
    try {
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        errorDetail = JSON.stringify(data);
      } else {
        errorDetail = await response.text();
      }
    } catch {
      // Ignore parsing errors and fall back to status text only.
    }
    const message = `Failed to fetch facility detail: ${response.status} ${response.statusText}${errorDetail ? ` - ${errorDetail}` : ""}`;
    console.error(message, { url });
    throw new Error(message);
  }

  const data = (await response.json()) as ApiEnvelope<{
    id: string;
    sportType: string;
    facilityName: string;
    isPublic: boolean;
    city: string;
    district: string;
    address: string;
    cost: string;
    imageUrl: string;
    operatingHours: string;
    introduction: string;
    information: string;
    usageGuide: string;
    contact: string;
    homepageUrl: string;
  }>;

  if (getResultType(data) !== "SUCCESS" || !data.success) {
    const message = `Failed to fetch facility detail: ${data.message || "Unknown error"}${data.error ? ` - ${data.error}` : ""}`;
    console.error(message, { url, data });
    throw new Error(message);
  }

  return {
    resultType: "SUCCESS",
    message: data.message,
    error: null,
    success: data.success
  };
};

export const createFacility = async (
  payload: CreateFacilityRequest
): Promise<CreateFacilityResponse> => {
  const url = `${API_BASE_URL}/facilities`;

  const response = await fetch(url, {
    method: "POST",
    headers: buildAuthHeaders(true),
    body: JSON.stringify(payload)
  });

  const body = (await response.json().catch(() => ({}))) as ApiEnvelope<{
    id: string;
    facilityName: string;
    createdAt: string;
  }>;

  const resultType = getResultType(body);

  if (!response.ok || resultType !== "SUCCESS") {
    throw new Error(getResponseMessage(body, "Failed to create facility"));
  }

  return {
    resultType: "SUCCESS",
    message: body.message,
    error: body.error,
    success: body.success
  };
};
