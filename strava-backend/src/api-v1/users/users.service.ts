//@ts-nocheck
import type { PaginationResult } from "paginate-prisma";
import type { PAGINATION_ORDER } from "../../boot/prisma";
import { prisma, paginate } from "../../boot/prisma";

interface APIRequestAll {
  q?: string;
  page?: number;
  perPage?: number;
}

export class UsersService {
  public async getAllUsers({
    page,
    perPage,
  }: APIRequestAll): Promise<PaginationResult | null> {
    try {
      const data = await paginate(prisma.user)(
        {},
        {},
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
