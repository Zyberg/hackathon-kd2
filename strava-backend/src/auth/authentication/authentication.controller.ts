import { User } from "@prisma/client";
import { Post, Body, Route, Query, Hidden, Tags } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponse } from "../../types/generic/apiResponse";
import { AuthenticationService } from "./authentication.service";

import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";
import { AppError, HttpCode } from "../../exceptions/AppError";

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
        throw new AppError({ description: "User creation failed", httpCode: HttpCode.INTERNAL_SERVER_ERROR, isOperational: true })
    }

    return formatAPIResponse(user);
  }
}
