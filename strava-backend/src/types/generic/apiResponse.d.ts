import type { PaginationResult } from "paginate-prisma";

export interface ApiResponseMeta<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export type ApiResponsePaginated<T> = ApiResponseMeta<T> & PaginationResult;