import axiosInstance from "./axiosInstance";

// 시설 리뷰 조회
export const getSpotReview = async (id: string) => {
  const res = await axiosInstance.get(`/facilities/${id}/reviews`);
  return res.data;
};
