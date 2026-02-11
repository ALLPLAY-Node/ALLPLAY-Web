type ApiSuccessPayload<T> = {
  message: string;
  // 백엔드 응답 오탈자 호환(messege)
  messege?: string;
  error: null;
  success: T;
};

type ApiFailPayload = {
  message: string;
  // 백엔드 응답 오탈자 호환(messege)
  messege?: string;
  error: unknown;
  success?: never;
};

export type ApiResponse<T> =
  | ({ resultType: "SUCCESS"; resultTyle?: never } & ApiSuccessPayload<T>)
  | ({ resultType: "FAIL"; resultTyle?: never } & ApiFailPayload)
  // 백엔드 응답 오탈자 호환(resultTyle): 정상 필드(resultType)로 전환 전까지 유지
  | ({ resultType?: never; resultTyle: "SUCCESS" } & ApiSuccessPayload<T>)
  | ({ resultType?: never; resultTyle: "FAIL" } & ApiFailPayload);
