import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UserGroupCreateModel, UserGroupUpdateModel } from "../../types/userGroup/userGroup";

const SEARCHABLE_FIELDS = ["title"];

export class UserGroupsService {
  public async getAllUserGroups(params: DataTableQuery) {
    let data;

    try {
      data = await paginate(prisma.userGroup, SEARCHABLE_FIELDS)(params, {});
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }

  public async getUserGroupById(id: number): Promise<UserGroupUpdateModel> {
    const userGroup = await prisma.userGroup.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { id: userGroup.id, title: userGroup.title };
  }

  public async createUserGroup(payload: UserGroupCreateModel): Promise<UserGroupUpdateModel> {
    const { title } = payload;
    let group;

    try {
      group = await prisma.userGroup.create({
        data: {
          title,
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return group

  }

  public async updateUserGroup(id: number, payload: UserGroupCreateModel): Promise<UserGroupCreateModel> {
    let group;

    try {
      group = await prisma.userGroup.update({
        where: {
          id
        },
        data: payload
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return group
  }

  public async deleteUserGroup(id: number) {

    try {
      const group = await prisma.userGroup.delete({
        where: {
          id
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

  }
}
