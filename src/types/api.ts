export type ApiResponse<T> = {
  resultType: "SUCCESS" | "FAIL";
  message: string;
  error: unknown;
  success: T;
};
