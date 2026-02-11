export const uploadToS3 = async (file: File, presignedUrl: string) => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type
    },
    body: file
  });

  if (!res.ok) {
    throw new Error(`S3 업로드 실패: ${res.status} ${res.statusText}`);
  }
};
