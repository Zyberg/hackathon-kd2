import {Achievement, User} from "@prisma/client";
import {Get, Queries, Query, Route} from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponsePaginated } from "../../types/generic/apiResponse";
import { DataTableQuery } from "../../types/generic/DataTable";
import { AchievementsService } from "./achievements.service";
import {PAGINATION_ORDER} from "paginate-prisma";
import {UsersService} from "../users/users.service";


@Route("achievements")
export default class AchievementController {

    @Get("/")
    public async getAllAchievements(
        @Queries() query: DataTableQuery
    ): Promise<ApiResponsePaginated<Achievement[]>> {
        const data = await new AchievementsService().getAllAchievements(query);

        return formatAPIResponse(data);
    }
}
