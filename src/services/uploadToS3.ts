export const uploadToS3 = async (file: File, presigned: string) => {
  await fetch(presigned, {
    method: "PUT",
    headers: {
      "Content-Type": file.type
    },
    body: file
  });
};
