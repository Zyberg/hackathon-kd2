import { Controller, Get, Queries, Route, Security, Tags, Post, Request, Put, Delete, Body } from "tsoa";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { UserGroupsService } from "./userGroups.service";
import { UserGroupCreateModel } from "../../types/userGroup/userGroup";

@Tags("UserGroup")
@Security("jwt")
@Route("userGroups")
export default class UserGroupsController extends Controller {
  @Get("/")
  public async getAllUserGroups(@Queries() query: DataTableQuery) {
    const data = await new UserGroupsService().getAllUserGroups(query);

    return apiResponseBuilder.makePaginatedSuccess(data);
  }

  @Get("/{id}")
  public async getUserGroupById(id: number) {
    const data = await new UserGroupsService().getUserGroupById(id);

    return data;
  }

  @Post("/")
  public async create(@Body() req: UserGroupCreateModel) {
    const data = await new UserGroupsService().createUserGroup(req);

    return data;
  }

  @Put("/{id}")
  public async update(id: number, @Body() req: UserGroupCreateModel) {
    const data = await new UserGroupsService().updateUserGroup(id, req)

    return data;
  }

  @Delete("/{id}")
  public async delete(id: number) {
    const data = await new UserGroupsService().deleteUserGroup(id)
  }

}
