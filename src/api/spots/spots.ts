import type { spotQuery } from "@/types/spots";
import axiosInstance from "../axiosInstance";

// 시설 목록 조회
export const getSpots = async (params?: spotQuery) => {
  const res = await axiosInstance.get("/facilities", {
    params
  });
  return res.data;
};

// 시설 상세 조회
export const getSpot = async (id: string) => {
  const res = await axiosInstance.get(`/facilities/${id}`);
  return res.data;
};
