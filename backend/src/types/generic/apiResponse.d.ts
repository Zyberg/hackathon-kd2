import type { PaginationResult } from "paginate-prisma";

interface ApiResponsePaginationMeta {
  meta: PaginationResult;
}

export interface ApiResponse<T> {
  data: T,
  status: {
    success: boolean;
    message: string;
  }
}

export type ApiResponsePaginated<T> = ApiResponse<T> & ApiResponsePaginationMeta