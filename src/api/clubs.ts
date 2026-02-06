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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

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
  if (params.sportId) {
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
    throw new Error(`Failed to fetch clubs: ${response.statusText}`);
  }

  return response.json();
};

export const getClubDetail = async (
  clubId: string
): Promise<ClubDetailResponse> => {
  const url = `${API_BASE_URL}/clubs/${clubId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch club detail: ${response.statusText}`);
  }

  return response.json();
};

export const joinClub = async (
  clubId: string,
  accessToken: string
): Promise<JoinClubResponse> => {
  const url = `${API_BASE_URL}/clubs/${clubId}/join`;

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

  return response.json();
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

  return response.json();
};

export const updateClub = async (
  clubId: string,
  data: UpdateClubRequest,
  accessToken: string
): Promise<UpdateClubResponse> => {
  const url = `${API_BASE_URL}/clubs/${clubId}`;

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

  return response.json();
};
