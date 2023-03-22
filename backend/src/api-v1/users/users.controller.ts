import { Controller, Get, Queries, Route, Security, Tags } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Tags("User")
@Security("jwt")
@Route("api/users")
export default class UserController extends Controller {
  @Get("/")
  public async getAllUsers(@Queries() query: DataTableQuery) {
    const data = await new UsersService().getAllUsers(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }
}
