import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { ChallengeViewModel } from "../../types/challenges/challenge";

const SEARCHABLE_FIELDS = ["id", "title"];

export class ChallengesService {
  public async getAllChallenges(params: DataTableQuery) {
    let data;

    try {
      data = await paginate(prisma.challenge, SEARCHABLE_FIELDS)(params, {});
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
}
