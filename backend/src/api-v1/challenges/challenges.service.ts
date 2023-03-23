import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { GetAllChallengesQuery } from "../../types/generic/DataTable";
import { ChallengeViewModel, ChallengeCreateModel } from "../../types/challenges/challenge";

const SEARCHABLE_FIELDS = ["id", "title"];

export class ChallengesService {
  public async getAllChallenges(params: GetAllChallengesQuery) {
    let data;

    try {
      data = await paginate(prisma.challenge, SEARCHABLE_FIELDS, { 
        isActive: params.isActive
      })(params, {});
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }

  public async getChallengeById(id: number): Promise<ChallengeViewModel> {
    const challenge = await prisma.challenge.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { id: challenge.id, title: challenge.title };
  }

  public async createChallenge(payload: ChallengeCreateModel): Promise<ChallengeCreateModel> {
    const { title, description, isActive, unitId } = payload;
    let challenge;

    try {
      challenge = await prisma.challenge.create({
        data: {
          title, description, isActive,
          unit: {
            connect: {
              id: unitId,
            }
          }
        },
        include: {
          unit: true
        }
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return challenge

  }

  public async updateChallenge(id: number, payload: ChallengeCreateModel): Promise<ChallengeCreateModel> {
    let challenge;

    try {
      challenge = await prisma.challenge.update({
        where: {
          id
        },
        data: payload
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return challenge
  }

  public async deleteChallenge(id: number) {

    try {
      const challenge = await prisma.challenge.delete({
        where: {
          id
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

  }

  public async join(id: number, userId: number): Promise<ChallengeCreateModel> {
    let response;

    try {
      response = await prisma.challenge.update({
        where: {
          id
        },
        data: {
          participants: {
            create: {
              userId: userId,
              invitedById: userId,
            }
          }
        }
      });
    } catch (e: any) {
      console.log(e)
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return response;
  }
}
