import type {
  ClubsQueryParams,
  ClubsResponse,
  ClubDetailResponse,
  JoinClubResponse,
  CreateClubRequest,
  CreateClubResponse,
  UpdateClubRequest,
  UpdateClubResponse
} from "@/types/clubs";

type ApiClubsResponse = {
  resultType?: "SUCCESS" | "ERROR";
  resultTyle?: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: {
    items: Array<{
      id: number;
      clubName: string;
      clubPhotoUrl?: string;
      description: string;
      joinRequirement: string;
      region: string;
      maxMemberCount: string | number;
      currentMemberCount: string | number;
    }>;
    cursor: number | string | null;
    hasNext: boolean;
  } | null;
};

type ApiEnvelope<T> = {
  resultType?: "SUCCESS" | "ERROR";
  resultTyle?: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: T | null;
};

const getResultType = (data: { resultType?: string; resultTyle?: string }) =>
  data.resultType ?? data.resultTyle ?? "ERROR";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const getClubs = async (
  params: ClubsQueryParams = {}
): Promise<ClubsResponse> => {
  const queryParams = new URLSearchParams();

  if (params.regionId) {
    queryParams.append("regionId", params.regionId);
  }
  if (params.ageGroup) {
    queryParams.append("ageGroup", params.ageGroup);
  }
  if (params.keyword) {
    queryParams.append("keyword", params.keyword);
  }
  if (params.sportId !== undefined && params.sportId !== null) {
    queryParams.append("sportId", params.sportId.toString());
  }
  if (params.cursor) {
    queryParams.append("cursor", params.cursor);
  }

  const url = `${API_BASE_URL}/clubs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

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
    const message = `Failed to fetch clubs: ${response.status} ${response.statusText}${errorDetail ? ` - ${errorDetail}` : ""}`;
    console.error(message, { url });
    throw new Error(message);
  }

  const data = (await response.json()) as ApiClubsResponse;
  if (getResultType(data) !== "SUCCESS" || !data.success) {
    const message = `Failed to fetch clubs: ${data.message || "Unknown error"}${data.error ? ` - ${data.error}` : ""}`;
    console.error(message, { url, data });
    throw new Error(message);
  }

  return {
    clubs: data.success.items.map((item) => ({
      id: item.id,
      name: item.clubName,
      description: item.description,
      place: item.region,
      currentCount: Number.isFinite(Number(item.currentMemberCount))
        ? Number(item.currentMemberCount)
        : 0,
      maxCount: Number.isFinite(Number(item.maxMemberCount))
        ? Number(item.maxMemberCount)
        : 0,
      tags: [],
      imageUrl: item.clubPhotoUrl
    })),
    cursor: data.success.cursor ? String(data.success.cursor) : undefined,
    hasMore: data.success.hasNext
  };
};

export const getClubDetail = async (
  clubId: string
): Promise<ClubDetailResponse> => {
  const encodedId = encodeURIComponent(clubId);
  const url = `${API_BASE_URL}/clubs/${encodedId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch club detail: ${response.statusText}`);
  }

  const data = (await response.json()) as ApiEnvelope<{
    id: number;
    clubName: string;
    clubPhotoUrl?: string;
    operator: { name: string; introduce: string };
    region: string;
    level: string;
    maxMemberCount: number;
    currentMenberCount?: number;
    currentMemberCount?: number;
    joinRequirement: string;
    contact: string;
    homePageUrl?: string;
  }>;

  if (getResultType(data) !== "SUCCESS" || !data.success) {
    const message = `Failed to fetch club detail: ${data.message || "Unknown error"}${data.error ? ` - ${data.error}` : ""}`;
    console.error(message, { url, data });
    throw new Error(message);
  }

  const currentMemberCount =
    data.success.currentMemberCount ?? data.success.currentMenberCount ?? 0;

  return {
    resultType: "SUCCESS",
    message: data.message,
    error: null,
    success: {
      id: data.success.id,
      clubName: data.success.clubName,
      clubPhotoUrl: data.success.clubPhotoUrl,
      operator: data.success.operator,
      region: data.success.region,
      level: data.success.level,
      maxMemberCount: data.success.maxMemberCount,
      currentMemberCount,
      joinRequirement: data.success.joinRequirement,
      contact: data.success.contact,
      homePageUrl: data.success.homePageUrl
    }
  };
};

export const joinClub = async (
  clubId: string,
  accessToken: string
): Promise<JoinClubResponse> => {
  const encodedId = encodeURIComponent(clubId);
  const url = `${API_BASE_URL}/clubs/${encodedId}/join`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to join club: ${response.statusText}`);
  }

  const data = (await response.json()) as ApiEnvelope<{
    clubId: string;
    userId: string;
    createdAt: string;
  }>;

  if (getResultType(data) !== "SUCCESS" || !data.success) {
    const message = `Failed to join club: ${data.message || "Unknown error"}${data.error ? ` - ${data.error}` : ""}`;
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

export const createClub = async (
  data: CreateClubRequest,
  accessToken: string
): Promise<CreateClubResponse> => {
  const url = `${API_BASE_URL}/clubs`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Failed to create club: ${response.statusText}`);
  }

  const responseData = (await response.json()) as ApiEnvelope<{
    id: string;
    clubName: string;
    createdAt: string;
  }>;

  if (getResultType(responseData) !== "SUCCESS" || !responseData.success) {
    const message = `Failed to create club: ${responseData.message || "Unknown error"}${responseData.error ? ` - ${responseData.error}` : ""}`;
    console.error(message, { url, responseData });
    throw new Error(message);
  }

  return {
    resultType: "SUCCESS",
    message: responseData.message,
    error: null,
    success: responseData.success
  };
};

export const updateClub = async (
  clubId: string,
  data: UpdateClubRequest,
  accessToken: string
): Promise<UpdateClubResponse> => {
  const encodedId = encodeURIComponent(clubId);
  const url = `${API_BASE_URL}/clubs/${encodedId}`;

  // FormData를 사용하여 파일 업로드 지원
  const formData = new FormData();
  formData.append("clubName", data.clubName);
  formData.append("sportType", data.sportType);
  formData.append("city", data.city);
  formData.append("district", data.district);
  formData.append("ageGroup", data.ageGroup);
  formData.append("maxMembers", data.maxMembers.toString());
  formData.append("activityFrequency", data.activityFrequency);
  formData.append("level", data.level);
  formData.append("description", data.description);
  formData.append("joinRequirement", data.joinRequirement);
  formData.append("contact", data.contact);

  if (data.hompageUrl) {
    formData.append("hompageUrl", data.hompageUrl);
  }

  // 이미지 파일 추가
  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Failed to update club: ${response.statusText}`);
  }

  const responseData = (await response.json()) as ApiEnvelope<{
    id: string;
    clubName: string;
    createdAt: string;
  }>;

  if (getResultType(responseData) !== "SUCCESS" || !responseData.success) {
    const message = `Failed to update club: ${responseData.message || "Unknown error"}${responseData.error ? ` - ${responseData.error}` : ""}`;
    console.error(message, { url, responseData });
    throw new Error(message);
  }

  return {
    resultType: "SUCCESS",
    message: responseData.message,
    error: null,
    success: responseData.success
  };
};
