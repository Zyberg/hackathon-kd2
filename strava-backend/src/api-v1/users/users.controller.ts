import { User } from "@prisma/client";
import { Get, Queries, Route } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponsePaginated } from "../../types/generic/apiResponse";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Route("users")
export default class UserController {
  @Get("/")
  public async getAllUsers(
    @Queries() query: DataTableQuery
  ): Promise<ApiResponsePaginated<User[]>> {
    const data = await new UsersService().getAllUsers(query);

    return formatAPIResponse(data);
  }
}
