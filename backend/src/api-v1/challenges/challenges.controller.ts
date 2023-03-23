import { Controller, Get, Queries, Route, Security, Tags } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
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
}
