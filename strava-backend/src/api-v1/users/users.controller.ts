import { User } from "@prisma/client";
import { Get, Route } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponsePaginated } from "../../types/generic/apiResponse";
import { UsersService } from "./users.service";


@Route("users")
export default class UserController {
  @Get("/")
  public async getAllUsers(): Promise<ApiResponsePaginated<User[]>> {
    const data = await new UsersService().getAllUsers({});

    return formatAPIResponse(data);
  }
}
