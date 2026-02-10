import type {
  FacilitiesQueryParams,
  FacilitiesResponse
} from "@/types/facilities";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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
    throw new Error(`Failed to fetch facilities: ${response.statusText}`);
  }

  return response.json();
};
