export type ClubSummary = {
  id: string;
  name: string;
  sportType: string;
  regionCity: string;
  logoUrl?: string;
  summary?: string;
  level?: string;
  capacity?: number;
  joinRequirement?: string;
  contact?: string;
  url?: string;
  joinStatus?: "PENDING" | "APPROVED" | "REJECTED";
};

export type ClubListResponse = {
  items: ClubSummary[];
  nextCursor?: number;
  hasNext?: boolean;
};
