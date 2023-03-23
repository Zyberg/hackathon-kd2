import { Controller, Delete, Get, Queries, Route, Security, Tags } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UsersService } from "./users.service";

@Tags("User")
@Security("jwt")
@Route("users")
export default class UserController extends Controller {
  @Get("/")
  public async getAllUsers(@Queries() query: DataTableQuery) {
    const data = await new UsersService().getAllUsers(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Delete("/{id}")
  public async deleteUserById(id: number) {
    await new UsersService().deleteUserById(id);

    return apiResponseBuilder.makeSuccess({});
  }

  @Get('/{id}')
  public async getUserById(id: number) {
    const data = await new UsersService().getUserById(id);

    return data;
  }
}
