export interface FacilityItem {
  id: number;
  facilityName: string;
  city: string;
  district: string;
  address: string;
  isResevable: boolean;
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
  resultType: "SUCCESS" | "ERROR";
  message: string;
  error: string | null;
  success: FacilitiesSuccess | null;
}
