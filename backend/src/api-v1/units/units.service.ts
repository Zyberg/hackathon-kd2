import { prisma, paginate } from "../../boot/prisma";
import { AppError } from "../../exceptions/AppError";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UnitCreateModel, UnitUpdateModel } from "../../types/units/unit";

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

  public async getUnitById(id: number): Promise<UnitUpdateModel> {
    const unit = await prisma.challengeUnit.findFirstOrThrow({
      where: {
        id,
      },
    });

    return { id: unit.id, title: unit.title };
  }

  public async createUnit(payload: UnitCreateModel): Promise<UnitUpdateModel> {
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

  public async updateUnit(id: number, payload: UnitCreateModel): Promise<UnitUpdateModel> {
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
