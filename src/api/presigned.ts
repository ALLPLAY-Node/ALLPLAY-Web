import type { ApiResponse } from "@/types/api";
import {
  buildAuthHeaders,
  getApiResultType,
  getResponseMessage
} from "@/api/common";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export type PresignedDomain =
  | "reviews"
  | "facilities"
  | "clubs"
  | "user-profile";
export type PresignedOperation = "PUT" | "GET";

export type IssuePresignedUrlPayload = {
  domain: PresignedDomain;
  operation: PresignedOperation;
  fileName: string;
  fileType: string;
};

export type IssuePresignedUrlSuccess = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  expiresIn?: number;
};

type IssuePresignedUrlResponse = ApiResponse<IssuePresignedUrlSuccess>;

// API: POST /presigned-url
export const issuePresignedUrl = async (payload: IssuePresignedUrlPayload) => {
  const res = await fetch(`${API_BASE_URL}/presigned-url`, {
    method: "POST",
    headers: buildAuthHeaders(true),
    body: JSON.stringify(payload)
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(getResponseMessage(body, "Failed to issue presigned url"));
  }

  // 오탈자 확인: 백엔드 응답에서 resultType 대신 resultTyle이 내려올 수 있음.
  const resultType = getApiResultType(body);
  if (resultType !== "SUCCESS") {
    throw new Error(getResponseMessage(body, "Failed to issue presigned url"));
  }

  return body as IssuePresignedUrlResponse;
};

export const uploadFileToPresignedUrl = async (
  file: File,
  presigned: IssuePresignedUrlSuccess
) => {
  const uploadHeaders = {
    ...(presigned.headers ?? {}),
    ...(!presigned.headers?.["Content-Type"] && file.type
      ? { "Content-Type": file.type }
      : {})
  };

  const uploadRes = await fetch(presigned.url, {
    method: presigned.method || "PUT",
    headers: uploadHeaders,
    body: file
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to storage");
  }

  return presigned.url.split("?")[0];
};
