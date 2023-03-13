import { User } from "@prisma/client";
import { Get, Queries, Route, Security, Tags } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponse } from "../../types/generic/apiResponse";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Tags("User")
@Security("jwt")
@Route("v1/users")
export default class UserController {
  @Get("/")
  public async getAllUsers(
    @Queries() query: DataTableQuery
  ): Promise<ApiResponse<User[]>> {
    const data = await new UsersService().getAllUsers(query);

    return formatAPIResponse(data);
  }
}
