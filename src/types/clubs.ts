export interface Club {
  id: number;
  name: string;
  description: string;
  place: string;
  currentCount: number;
  maxCount: number;
  tags: string[];
  imageUrl?: string;
}

export interface ClubsResponse {
  clubs: Club[];
  cursor?: string;
  hasMore: boolean;
}

export interface ClubsQueryParams {
  regionId?: string;
  ageGroup?: string;
  keyword?: string;
  sportId?: number;
  cursor?: string;
}

export interface ClubDetail {
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
}

export interface ClubDetailResponse {
  resultType: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: ClubDetail;
}

export interface JoinClubSuccess {
  clubId: string;
  userId: string;
  createdAt: string;
}

export interface JoinClubResponse {
  resultType: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: JoinClubSuccess;
}

export type AgeGroup =
  | "TEENS"
  | "TWENTIES"
  | "THIRTIES"
  | "FORTIES"
  | "FIFTIES"
  | "OVER_SIXTIES";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface CreateClubRequest {
  clubName: string;
  sportType: string;
  city: string;
  district: string;
  ageGroup: AgeGroup;
  imageURL?: string[];
  maxMembers: number;
  activityFrequency: string;
  level: SkillLevel;
  description: string;
  joinRequirement: string;
  contact: string;
  hompageUrl?: string;
}

export interface CreateClubSuccess {
  id: string;
  clubName: string;
  createdAt: string;
}

export interface CreateClubResponse {
  resultType: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: CreateClubSuccess;
}

export interface UpdateClubRequest {
  clubName: string;
  sportType: string;
  city: string;
  district: string;
  ageGroup: AgeGroup;
  images?: File[];
  maxMembers: number;
  activityFrequency: string;
  level: SkillLevel;
  description: string;
  joinRequirement: string;
  contact: string;
  hompageUrl?: string;
}

export interface UpdateClubSuccess {
  id: string;
  clubName: string;
  createdAt: string;
}

export interface UpdateClubResponse {
  resultType: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: UpdateClubSuccess;
}
