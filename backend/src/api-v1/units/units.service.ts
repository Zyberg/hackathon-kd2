import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UnitCreateModel } from "../../types/units/unit";

const SEARCHABLE_FIELDS = ["id", "title"];

export class UnitsService {
  public async getAllUnits(params: DataTableQuery) {
    let data;

    try {
      data = await paginate(prisma.challengeUnit, SEARCHABLE_FIELDS)(params, {});
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return data;
  }

  public async getChallengeById(id: number): Promise<UnitCreateModel> {
    const unit = await prisma.challengeUnit.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { id: unit.id, title: unit.title };
  }

  public async createUnit(payload: UnitCreateModel): Promise<UnitCreateModel> {
    const { title } = payload;
    let unit;

    try {
        unit = await prisma.challengeUnit.create({
        data: {
          title,
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return unit

  }

  public async updateUnit(id: number, payload: UnitCreateModel): Promise<UnitCreateModel> {
    let unit;

    try {
        unit = await prisma.challengeUnit.update({
        where: {
          id
        },
        data: payload
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

    return unit
  }

  public async deleteUnit(id: number) {

    try {
      const unit = await prisma.challengeUnit.delete({
        where: {
          id
        },
      })
    } catch (e: any) {
      throw new AppError({ ...e, isOperational: true, httpCode: 500 });
    }

  }
}
