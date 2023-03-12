import { PrismaClient } from "@prisma/client";
import { PAGINATION_ORDER } from "paginate-prisma";
export { paginate } from "../helpers/paginate";
export type { PAGINATION_ORDER } from "paginate-prisma";

const prismaClient = new PrismaClient();

export interface APIRequestAll {
  q?: string;
  field?: string;
  order?: PAGINATION_ORDER;
  page?: number;
  perPage?: number;
}


export const prisma = prismaClient;
