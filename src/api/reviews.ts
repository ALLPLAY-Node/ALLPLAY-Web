import axiosInstance from "./axiosInstance";

export type CreateSpotReviewPayload = {
  text: string;
  photoUrl?: string[];
};

// 시설 리뷰 조회
export const getSpotReview = async (id: string) => {
  const res = await axiosInstance.get(`/facilities/${id}/reviews`);
  return res.data;
};

// 시설 리뷰 등록
export const createSpotReview = async (
  id: string,
  payload: CreateSpotReviewPayload
) => {
  const res = await axiosInstance.post(`/facilities/${id}/reviews`, payload);
  return res.data;
};
