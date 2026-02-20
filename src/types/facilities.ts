export interface FacilityItem {
  id: number;
  facilityName: string;
  city: string;
  district: string;
  address: string;
  isReservable: boolean;
  isPublic: boolean;
  homepageUrl: string;
}

export interface FacilitiesQueryParams {
  isPublic?: boolean;
  regionId?: string;
  isReservable?: boolean;
  isFree?: boolean;
  keyword?: string;
  sportId?: number;
  cursor?: string | number;
}

export interface FacilitiesSuccess {
  items: FacilityItem[];
  cursor: number | null;
  hasNext: boolean;
}

export interface FacilitiesResponse {
  resultType: "SUCCESS" | "ERROR" | "FAIL";
  message: string;
  error: string | null;
  success: FacilitiesSuccess | null;
}

export interface FacilityDetail {
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

export interface FacilityDetailResponse {
  resultType: "SUCCESS" | "ERROR" | "FAIL";
  message: string;
  error: string | null;
  success: FacilityDetail | null;
}

export interface CreateFacilityRequest {
  facilityName: string;
  sportType: string;
  city: string;
  district: string;
  operatingHours: string;
  imageURL?: string[];
  introduction: string;
  information: string;
  contact: string;
  hompageUrl?: string;
}

export interface CreateFacilitySuccess {
  id: string;
  facilityName: string;
  createdAt: string;
}

export interface CreateFacilityResponse {
  resultType: "SUCCESS" | "ERROR" | "FAIL";
  message: string;
  error: string | null;
  success: CreateFacilitySuccess | null;
}
