//@ts-nocheck
import type { PaginationResult } from "paginate-prisma";
import { prisma, paginate } from "../../boot/prisma";
import type { APIRequestAll } from "../../boot/prisma";

const SEARCHABLE_FIELDS = ["name", "email"];

export class UsersService {
  public async getAllUsers(
    params: APIRequestAll
  ): Promise<PaginationResult | null> {
    try {
      const data = await paginate(prisma.user)(
        params.q,
        params,
        {
          include: {
            challengesParticipant: {
              include: {
                challenge: true,
              },
            },
          },
        },
        SEARCHABLE_FIELDS
      );

      return data;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  }
}
