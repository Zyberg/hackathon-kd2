import { Controller, Get, Queries, Route, Security, Tags, Post, Request, Put, Delete, Body } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { ChallengeCreateModel } from "../../types/challenges/challenge";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { ChallengesService } from "./challenges.service";

@Tags("Challenge")
@Security("jwt")
@Route("challenges")
export default class ChallengesController extends Controller {
  @Get("/")
  public async getAllChallenges(@Queries() query: DataTableQuery) {
    const data = await new ChallengesService().getAllChallenges(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Post("/")
  public async create(@Body() req: ChallengeCreateModel) {
    const data = await new ChallengesService().createChallenge(req);

    return data;
  }

  @Put("/{id}")
  public async update(id: number, @Body() req: ChallengeCreateModel) {
    const data = await new ChallengesService().updateChallenge(id, req)

    return data;
  }

  @Delete("/{id}")
  public async delete(id: number) {
    const data = await new ChallengesService().deleteChallenge(id)
  }

  @Post('/{id}/join/{userId}')
  public async join(id: number, userId: number) {
    const data = await new ChallengesService().join(id, userId);

    return data;
  }
}
