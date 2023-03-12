import type { PaginationResult } from "paginate-prisma";

export interface ApiResponseMeta {
  success: boolean;
  message: string;
}

export type ApiResponsePaginated = ApiResponseMeta & PaginationResult;