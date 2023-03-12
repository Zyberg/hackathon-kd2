import { paginate as paginatePrisma } from "paginate-prisma";
import { PaginationOptions, KeysFromPrismaModel } from "paginate-prisma";

export const paginate =
  <T>(prismaModel: T) =>
  async (
    //@ts-ignore
    query: Exclude<
      //@ts-ignore
      Exclude<
        //@ts-ignore
        Parameters<(typeof prismaModel)["findMany"]>[0],
        undefined
      >["where"],
      undefined
    > = {},
    paginateOptions: PaginationOptions<
      KeysFromPrismaModel<typeof prismaModel>
    > = {},
    //@ts-ignore
    additionalPrismaQuery: Omit<
      //@ts-ignore
      Exclude<Parameters<(typeof prismaModel)["findMany"]>[0], undefined>,
      "where" | "skip" | "take" | "orderBy"
    > = {}
  ) => {
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
