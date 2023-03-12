import { User } from "@prisma/client";
import { Get, Route } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponsePaginated } from "../../types/generic/apiResponse";
import { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Route("users")
export default class UserController {
  @Get("/")
  public async getAllUsers(
    query: DataTableQuery
  ): Promise<ApiResponsePaginated<User[]>> {
    const data = await new UsersService().getAllUsers(query);

    return formatAPIResponse(data);
  }
}
