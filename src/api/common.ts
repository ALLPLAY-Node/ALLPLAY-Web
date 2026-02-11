type LegacyMessageBody = {
  message?: string;
  // 백엔드 응답 오탈자 호환용 필드(messege)
  messege?: string;
} | null;

type LegacyResultTypeBody = {
  resultType?: "SUCCESS" | "FAIL";
  // 백엔드 응답 오탈자 호환용 필드(resultTyle)
  resultTyle?: "SUCCESS" | "FAIL";
} | null;

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getResponseMessage = (body: unknown, fallback: string) => {
  const parsed = body as LegacyMessageBody;
  return parsed?.message ?? parsed?.messege ?? fallback;
};

export const buildAuthHeaders = (withJsonContentType = false) => {
  const token = getAccessToken();
  const authorization =
    token && token.toLowerCase().startsWith("bearer ")
      ? token
      : token
        ? `Bearer ${token}`
        : undefined;

  return {
    ...(withJsonContentType ? { "Content-Type": "application/json" } : {}),
    ...(authorization ? { Authorization: authorization } : {})
  };
};

export const buildHeaders = () => {
  return buildAuthHeaders(true);
};

export const getApiResultType = (body: unknown) => {
  const parsed = body as LegacyResultTypeBody;
  return parsed?.resultType ?? parsed?.resultTyle;
};
