import { Challenge } from "@prisma/client";
import { Controller, Get, Queries, Route, Security, Tags, Post, Request, Put, Delete, Body } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { ChallengeCreateModel, ChallengeUpdateModel } from "../../types/challenges/challenge";
import { ApiResponse } from "../../types/generic/apiResponse";
import type { DataTableQuery, GetAllChallengesQuery } from "../../types/generic/DataTable";
import { ImagesService } from "../images/images.service";
import { ChallengesService } from "./challenges.service";


@Tags("Challenge")
@Security("jwt")
@Route("challenges")
export default class ChallengesController extends Controller {
  @Get("/")
  public async getAllChallenges(@Queries() query: GetAllChallengesQuery): Promise<ApiResponse<Challenge[]>> {
    const data = await new ChallengesService().getAllChallenges(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Get("/{id}")
  public async getChallengeById(id: number) {
    const data = await new ChallengesService().getChallengeById(id);

    return data;
  }

  @Post("/")
  public async create(@Body() req: ChallengeCreateModel) {
    const data = await new ChallengesService().createChallenge(req);

    return data;
  }

  @Put("/{id}")
  public async update(id: number, @Body() req: ChallengeUpdateModel) {
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

  @Delete('/{id}/join/{userId}')
  public async leave(id: number, userId: number) {
    const data = await new ChallengesService().leave(id, userId);

    return data;
  }

  @Post("/{id}/upload")
  public async upload(@Request() req: any) {
    const data = await new ImagesService().uploadImage(req, req.res);

    return data;
  }
}
