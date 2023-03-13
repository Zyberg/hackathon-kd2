import { User } from "@prisma/client";
import { Get, Post, Body, Route, Query, Hidden, Tags } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponse } from "../../types/generic/apiResponse";
import type { DataTableQuery } from "../../types/generic/DataTable";
import { AuthenticationService } from "./authentication.service";

//TODO:
import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

@Tags("Authentication")
@Route("authentication")
export default class AuthenticationController {
  @Hidden()
  public async loginPassword(
    /**
     * @ignore
     */
    @Hidden() user: Express.User,
    @Query() email: string,
    @Query() password: string,
  ): Promise<ApiResponse<User>> {
    const data = await new AuthenticationService().login(user);

    return formatAPIResponse(data);
  }

  @Post("/signup")
  public async signup(
    @Body() { name, email, password }: UserCreateRequest
  ): Promise<ApiResponse<User>> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user: User | undefined;
    try {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword.toString(),
        },
      });
    } catch (e) {
        console.log(e)
      // TODO: generic error: something went wrong
      return formatAPIResponse(null);
    }

    // TODO: decide what to do after a signup
    return formatAPIResponse(user);
  }
}
