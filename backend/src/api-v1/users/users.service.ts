import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import { AchievementType } from "../../types/achievements/achievement";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UserViewModel, UserViewModelAchievements, UserViewModelChallenges } from "../../types/users/user";
import achievements from "../achievements/achievements.route";

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
    try {
      return await prisma.user.delete({
        where: {
          id,
        }
      });
    } catch(e: any) {
      console.log(e)
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }
    
  }

  public async getUserById(id: number): Promise<UserViewModel> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        Role: true,
        achievements: {
          include: {
            achievement: true
          }
        }
      }
    });

    return { id: user.id, name: user.name, email: user.email, role: user.Role.title };
  }

  public async getUserAchievements(id: number): Promise<UserViewModelAchievements> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        Role: true,
        achievements: {
          include: {
            achievement: true
          }
        }
      }
    });


    return { id: user.id, name: user.name, email: user.email, role: user.Role.title, achievements: user.achievements.map(a => ({ ...a.achievement, type: a.achievement.type as AchievementType }))};
  }

  public async getUserChallenges(id: number): Promise<UserViewModelChallenges> {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        Role: true,
        challengesParticipant: {
          include: {
            challenge: true
          }
        }
      }
    });


    return { id: user.id, name: user.name, email: user.email, role: user.Role.title, challenges: user.challengesParticipant.map(c => c.challenge)};
  }
}
