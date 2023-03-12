import type { PaginationResult } from "paginate-prisma";

export interface ApiResponseMeta<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: PaginationResult
}

export type ApiResponsePaginated<T> = ApiResponseMeta<T>;