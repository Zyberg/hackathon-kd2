import { Controller, Get, Queries, Route, Security, Tags, Post, Request, Put, Delete, Body } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { Achievement } from "../../types/achievements/achievement";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { AchievementsService } from "./achievements.service";

@Tags("Achievement")
@Security("jwt")
@Route("achievements")
export default class ChallengesController extends Controller {
  @Get("/")
  public async getAllAchievements(@Queries() query: DataTableQuery) {
    const data = await new AchievementsService().getAllAchievements(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Post("/")
  public async create(@Body() req: Achievement) {
    const data = await new AchievementsService().createAchievement(req);

    return data;
  }

  @Put("/{id}")
  public async update(id: number, @Body() req: Achievement) {
    const data = await new AchievementsService().updateAchievement(id, req)

    return data;
  }

  @Delete("/{id}")
  public async delete(id: number) {
    const data = await new AchievementsService().deleteAchievement(id)
  }

}
