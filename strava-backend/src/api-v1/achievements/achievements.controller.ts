import {Achievement, User} from "@prisma/client";
import {Get, Queries, Query, Route, Security, Tags} from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponse } from "../../types/generic/apiResponse";
import { DataTableQuery } from "../../types/generic/DataTable";
import { AchievementsService } from "./achievements.service";
import {PAGINATION_ORDER} from "paginate-prisma";
import {UsersService} from "../users/users.service";


@Tags("Achievement")
@Route("v1/achievements")
@Security("jwt")
export default class AchievementController {

    @Get("/")
    public async getAllAchievements(
        @Queries() query: DataTableQuery
    ): Promise<ApiResponse<Achievement[]>> {
        const data = await new AchievementsService().getAllAchievements(query);

        return formatAPIResponse(data);
    }
}
