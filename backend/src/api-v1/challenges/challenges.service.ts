import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { GetAllChallengesQuery } from "../../types/generic/DataTable";
import {
  ChallengeViewModel,
  ChallengeCreateModel,
  ChallengeType,
} from "../../types/challenges/challenge";

const SEARCHABLE_FIELDS = ["id", "title"];

export class ChallengesService {
  public async getAllChallenges(params: GetAllChallengesQuery) {
    let data;

    try {
      data = await paginate(prisma.challenge, SEARCHABLE_FIELDS, {
        isActive: params.isActive,
      })(params, {});
    } catch (e: any) {
      console.log(e)
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

    const { title, startAt, endAt, goalCount, type, parentId } = challenge;

    return {
      id,
      title,
      startAt,
      endAt,
      goalCount,
      type: type as ChallengeType,
      parentId: parentId,
    };
  }

  public async createChallenge(
    payload: ChallengeCreateModel
  ): Promise<ChallengeViewModel> {

    //TODO: parentId connect with other challenges
    const {
      title,
      description,
      isActive,
      unitId,
      startAt,
      endAt,
      goalCount,
      type,
      parentId,
    } = payload;
    let challenge;

    try {
      challenge = await prisma.challenge.create({
        data: {
          title,
          description,
          isActive,
          startAt,
          endAt,
          goalCount,
          type,
          unit: {
            connect: {
              id: unitId,
            },
          },
        },
        include: {
          unit: true,
        },
      });
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return { ...challenge, type: challenge.type as ChallengeType };
  }

  public async updateChallenge(
    id: number,
    payload: ChallengeCreateModel
  ): Promise<ChallengeCreateModel> {
    let challenge;

    try {
      challenge = await prisma.challenge.update({
        where: {
          id,
        },
        data: payload,
      });
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return { ...challenge, type: challenge.type as ChallengeType };
  }

  public async deleteChallenge(id: number) {
    try {
      const challenge = await prisma.challenge.delete({
        where: {
          id,
        },
      });
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }
  }

  public async join(id: number, userId: number): Promise<ChallengeCreateModel> {
    let challenge;

    try {
      challenge = await prisma.challenge.update({
        where: {
          id,
        },
        data: {
          participants: {
            create: {
              userId: userId,
              invitedById: userId,
            },
          },
        },
      });
    } catch (e: any) {
      console.log(e);
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return { ...challenge, type: challenge.type as ChallengeType };
  }
}
