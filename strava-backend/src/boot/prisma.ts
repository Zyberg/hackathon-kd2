import { PrismaClient } from "@prisma/client";
export { paginate } from "paginate-prisma";
export type { PAGINATION_ORDER } from "paginate-prisma";

const prismaClient = new PrismaClient();

export const prisma = prismaClient;
