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
/*
  .$extends({
    name: "SearchableFields",
    model: {
      $allModels: {
        searchableFields: () => [],
      },
    },
  })
  .$extends({
    name: "ModelExtension",
    query: {
      user: {
        $allOperations({ model, operation, args, query }) {
          // handle all operations

          //@ts-ignore
          if (args.where) {
            const dynamicWhere = {};



            //@ts-ignore
            args.where = { ...dynamicWhere, ...args.where };
          }
          return query(args);
        },
      },
    },
  });
  */
