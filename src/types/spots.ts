export type spotQuery = {
  regionId?: number;
  sportId?: number;
  keyword?: string;
  isPublic?: boolean;
  isReservable?: boolean;
  isFree?: boolean;
  cursor?: number;
};

export type Spot = {
  id: string;
  address: string;
  city: string;
  contact: string;
  cost: string;
  district: string;
  facilityName: string;
  homepageUrl: string;
  imageUrl: string[];
  information: string;
  introduction: string;
  isPublic: boolean;
  operatingHours: string;
  sportType: string;
  usageGuide: string;
  isReservable: boolean;
};

export type SpotReview = {
  id: number;
  userId: string;
  facilityId: string;
  text: string;
  photoUrl: string[];
  created_at: string;
};
