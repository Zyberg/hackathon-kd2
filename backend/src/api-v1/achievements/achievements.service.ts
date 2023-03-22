import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import { PaginationResult } from "../../types/generic/paginate";
import { Achievement } from "@prisma/client";
import type { DataTableQuery } from "../../types/generic/DataTable";

export class AchievementsService {
  static SEARCHABLE_FIELDS = ["title"];

  public async getAllAchievements(
    params: DataTableQuery
  ): Promise<PaginationResult<Achievement>> {
    let data;

    try {
      data = await paginate(
        prisma.achievement,
        AchievementsService.SEARCHABLE_FIELDS
      )(params);
    } catch (e: any) {
      //TODO: test error
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }
}
