//@ts-nocheck
import type { PaginationResult } from "paginate-prisma";
import type { PAGINATION_ORDER } from "../../boot/prisma";
import { prisma, paginate } from "../../boot/prisma";

interface APIRequestAll {
  q?: string;
  field?: string;
  order?: PAGINATION_ORDER;
  page?: number;
  perPage?: number;
}

export class UsersService {
  public async getAllUsers({
    q,
    field,
    order,
    page,
    perPage,
  }: APIRequestAll): Promise<PaginationResult | null> {
    try {
      const query = {};
      //TODO: generalize
      //TODO: add searchable fields somewhere else
      /*
      if (q != null && q != '' && field != null)
        query[field] = q;
      */

      const data = await paginate(prisma.user)(
        query,
        {
          sort: {
            field,
            order,
          },
        },
        {
          include: {
            challengesParticipant: {
              include: {
                challenge: true,
              },
            },
          },
        }
      );

      return data;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
