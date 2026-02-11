import axiosInstance from "./axiosInstance";

export const getPresignedUrl = async (fileName: string, fileType: string) => {
  const res = await axiosInstance.post("/presigned-url", {
    domain: "reviews",
    operation: "PUT",
    fileName,
    fileType
  });
  return res.data;
};
