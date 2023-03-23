import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { Achievement } from "../../types/achievements/achievement";

const SEARCHABLE_FIELDS = ["id", "title", "description", "imagePath", "max_users"];

export class AchievementsService {
  public async getAllAchievements(params: DataTableQuery) {
    let data;

    try {
      data = await paginate(prisma.achievement, SEARCHABLE_FIELDS)(params, {});
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }

  public async getAchievementById(id: number): Promise<Achievement> {
    const achievement = await prisma.achievement.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { 
      id: achievement.id, 
      title: achievement.title, 
      description: achievement.description, 
      imagePath: achievement.imagePath, 
      max_users: achievement.max_users 
    };
  }


  public async createAchievement(payload: Achievement): Promise<Achievement> {
    const { title, description, imagePath, max_users } = payload;
    let achievement;

    try {
      achievement = await prisma.achievement.create({
      data: {
        title, description, imagePath, max_users,
      },
    })
  } catch (e: any) {
    throw new AppError({ ...e, isOperational: true, httpCode: 500 });
  }

    return achievement

  }

  public async updateAchievement(id: number, payload: Achievement): Promise<Achievement> {
    let achievement;

    try {
      achievement = await prisma.achievement.update({
        where: {
          id
        },
        data: payload
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return achievement
  }

  public async deleteAchievement(id: number) {

    try {
      const achievement = await prisma.achievement.delete({
        where: {
          id
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

  }
}
