import axiosInstance from "./axiosInstance";

export const logout = async () => {
  const res = await axiosInstance.get("/auth/logout");
  return res.data;
};
