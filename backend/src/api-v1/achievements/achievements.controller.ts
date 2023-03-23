import { Achievement, User } from "@prisma/client";
import { Controller, Get, Queries, Query, Route, Security, Tags } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { ApiResponse } from "../../types/generic/apiResponse";
import { DataTableQuery } from "../../types/generic/DataTable";
import { AchievementsService } from "./achievements.service";

@Tags("Achievement")
@Security("jwt")
@Route("achievements")
export default class AchievementController extends Controller {
  @Get("/")
  public async getAllAchievements(
    @Queries() query: DataTableQuery
  ): Promise<ApiResponse<Achievement[]>> {
    const data = await new AchievementsService().getAllAchievements(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }
}
