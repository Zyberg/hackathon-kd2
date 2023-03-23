import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UserViewModel } from "../../types/users/user";

const SEARCHABLE_FIELDS = ["name", "email"];

export class UsersService {
  public async getAllUsers(params: DataTableQuery) {
    let data;

    try {
      data = await paginate(prisma.user, SEARCHABLE_FIELDS)(params, {
        include: {
          challengesParticipant: {
            include: {
              challenge: true,
            },
          },
        },
      });
    } catch (e: any) {
      //TODO: test error
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }

  public async deleteUserById(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      }
    });
  }

  public async getUserById(id: number): Promise<UserViewModel> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        Role: true
      },
    });

    return { id: user.id, name: user.name, email: user.email, role: user.Role.title};
  }
}
