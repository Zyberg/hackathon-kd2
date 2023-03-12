import { paginate as paginatePrisma, PAGINATION_ORDER } from "paginate-prisma";
import { PaginationOptions, KeysFromPrismaModel } from "paginate-prisma";
import type { APIRequestAll } from "../boot/prisma";

export const mapQuery = (searchableFields: string[], q: string) => ({
  OR: searchableFields.map((field) => ({ [field]: { contains: q } })),
});

export const makePaginateOptions = ({
  field,
  order,
  perPage: limit,
  page,
}: APIRequestAll) => ({
  page,
  limit,
  sort: {
    field,
    order,
  },
});

export const paginate =
  <T>(prismaModel: T) =>
  async (
    //@ts-ignore
    query: string = null,
    paginateParams: APIRequestAll,
    //@ts-ignore
    additionalPrismaQuery: Omit<
      //@ts-ignore
      Exclude<Parameters<(typeof prismaModel)["findMany"]>[0], undefined>,
      "where" | "skip" | "take" | "orderBy"
    > = {},
    searchableFields: string[] = []
  ) => {
    let queryClause = {};
    if (query != null) queryClause = mapQuery(searchableFields, query);

    let paginateOptions = makePaginateOptions(paginateParams);

    const { data, pages, page, limit, items } = await paginatePrisma(
      prismaModel
    )(
      //@ts-ignore
      queryClause as Exclude<Exclude<Parameters<T["findMany"]>[0], undefined>["where"], undefined>,
      //@ts-ignore
      paginateOptions as PaginationOptions<ObjectDotNotation<extractGeneric<Exclude<Parameters<T["findMany"]>[0], undefined>["orderBy"]>, void>>,
      additionalPrismaQuery
    );

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
