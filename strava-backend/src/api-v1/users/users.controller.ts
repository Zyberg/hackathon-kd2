import { User } from "@prisma/client";
import { PAGINATION_ORDER } from "paginate-prisma";
import { Get, Query, Route } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponsePaginated } from "../../types/generic/apiResponse";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Route("users")
export default class UserController {
  @Get("/")
  public async getAllUsers(
    @Query() q?: string,
    @Query() field?: string,
    @Query() order?: PAGINATION_ORDER,
    @Query() page?: number,
    @Query() perPage?: number
  ): Promise<ApiResponsePaginated<User[]>> {
    const data = await new UsersService().getAllUsers({
      q,
      field,
      order,
      page,
      perPage,
    });

    return formatAPIResponse(data);
  }
}
