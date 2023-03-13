// @ts-nocheck
import type { PaginationResult } from "paginate-prisma";
import { prisma, paginate } from "../../boot/prisma";
import type { APIRequestAll } from "../../boot/prisma";
import { User } from "@prisma/client";

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
    } catch (e: Error) {
      return null;
    }
  }
  
  public async getUserById(id: number): Promise<User?> {
    let user: User;
    try {
      user = await prisma.user.findFirst(
        {
          where: {
            id,
          }
        }
      );
    } catch (e: Error) {
      return undefined;
    }

    return user;
  }
}
