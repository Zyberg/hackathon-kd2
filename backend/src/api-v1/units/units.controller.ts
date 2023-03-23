import { Controller, Get, Queries, Route, Security, Tags, Post, Request, Put, Delete, Body } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { UnitCreateModel } from "../../types/units/unit";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UnitsService } from "./units.service";

@Tags("Unit")
@Security("jwt")
@Route("units")
export default class UnitsController extends Controller {
  @Get("/")
  public async getAllUnits(@Queries() query: DataTableQuery) {
    const data = await new UnitsService().getAllUnits(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Post("/")
  public async create(@Body() req: UnitCreateModel) {
    const data = await new UnitsService().createUnit(req);

    return data;
  }

  @Put("/{id}")
  public async update(id: number, @Body() req: UnitCreateModel) {
    const data = await new UnitsService().updateUnit(id, req)

    return data;
  }

  @Delete("/{id}")
  public async delete(id: number) {
    const data = await new UnitsService().deleteUnit(id)
  }

}
