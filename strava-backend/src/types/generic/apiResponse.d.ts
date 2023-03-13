// @ts-ignore
import { Request } from "express";
import type { PaginationResult } from "paginate-prisma";

export interface ApiResponseMeta<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: PaginationResult | null
}

export type RequestBody<T> = Request<{}, {}, T>;

export type ApiResponse<T> = ApiResponseMeta<T>;