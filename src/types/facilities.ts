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
