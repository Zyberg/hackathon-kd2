import { PrismaClient } from "@prisma/client";
import { PAGINATION_ORDER } from "paginate-prisma";
export { paginate } from "../helpers/paginate";
export type { PAGINATION_ORDER } from "paginate-prisma";

const prismaClient = new PrismaClient();

export const prisma = prismaClient;
