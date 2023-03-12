// @ts-ignore
import type { PaginationResult } from "paginate-prisma";

export interface ApiResponseMeta<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: PaginationResult | null
}

export type ApiResponse<T> = ApiResponseMeta<T>;