export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export interface ErrorResponse {
  code: number;
  message: string;
  errors?: any;
}
