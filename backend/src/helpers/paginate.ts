import { paginate as paginatePrisma } from "paginate-prisma";
import { PaginationOptions } from "paginate-prisma";
import type { KeysFromPrismaModel } from "paginate-prisma";
import { DataTableQuery } from "../types/generic/DataTable";

export const mapQuery = <T>(searchableFields: string[], q: string | null) =>
  q !== null
    ? {
        OR: searchableFields.map((field) => ({ [field]: { contains: q } })),
      }
    : {};

export const makePaginateOptions = ({
  field,
  order,
  perPage: limit,
  page,
}: DataTableQuery) => ({
  page: +(page ?? 1),
  limit: +(limit ?? 10),
  sort: {
    field,
    order,
  },
});

export const paginate = <T>(
  prismaModel: T,
  searchableFields: string[] = [],
  whereQuery: any = {}
) => {
  return async (
    paginateParams: DataTableQuery,
    //@ts-ignore
    additionalPrismaQuery: Omit<
      //@ts-ignore
      Exclude<Parameters<(typeof prismaModel)["findMany"]>[0], undefined>,
      "where" | "skip" | "take" | "orderBy"
    > = {}
  ) => {
    //@ts-ignore
    let query: Exclude<
      //@ts-ignore
      Exclude<
        //@ts-ignore
        Parameters<(typeof prismaModel)["findMany"]>[0],
        undefined
      >["where"],
      undefined
    > = {
      AND: [
        mapQuery(searchableFields, paginateParams.q || null),
        whereQuery,
      ],
    };


    //@ts-ignore
    const paginateOptions: PaginationOptions<
      KeysFromPrismaModel<typeof prismaModel>
    > = makePaginateOptions(paginateParams);

    const { data, pages, page, limit, items } = await paginatePrisma(
      prismaModel
    )(query, paginateOptions, additionalPrismaQuery);

    return {
      data,
      meta: {
        pages,
        page,
        limit,
        items,
      },
    };
  };
};
