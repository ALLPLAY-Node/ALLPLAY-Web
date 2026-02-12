import { getPresignedUrl } from "@/api/image";
import { uploadToS3 } from "@/services/uploadToS3";

export const uploadImages = async (files: File[]) => {
  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      const fileName = `${crypto.randomUUID()}-${file.name}`;

      const presigned = await getPresignedUrl(fileName, file.type);

      const presignedUrl: string = presigned.success.url;

      await uploadToS3(file, presignedUrl);

      return presignedUrl.split("?")[0];
    })
  );

  return uploadedUrls;
};
