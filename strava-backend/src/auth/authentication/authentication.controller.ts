import { Role, User } from "@prisma/client";
import { Post, Body, Route, Query, Hidden, Tags, Get, Inject } from "tsoa";
import { formatAPIResponse } from "../../helpers/formatAPIResponse";
import { ApiResponse } from "../../types/generic/apiResponse";
import { AuthenticationService } from "./authentication.service";

import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { AuthScope } from "../../helpers/auth/scopes";
import { UsersService } from "../../api-v1/users/users.service";

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  scope: AuthScope;
}

@Tags("Authentication")
@Route("auth")
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
    @Body() { name, email, password, scope }: UserCreateRequest
  ): Promise<ApiResponse<User>> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let role: Role | undefined;
    try {
      role = await prisma.role.findFirstOrThrow({
        where: {
          title: scope,
        }
      });
    } catch (e) {
      throw new AppError({ description: "User creation failed", httpCode: HttpCode.INTERNAL_SERVER_ERROR, isOperational: true })
    }

    let user: User | undefined;
    try {
      user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword.toString(),
          Role: {
            connect: {
              id: role.id
            }
          }
        },
      });
    } catch (e) {
      throw new AppError({ description: "User creation failed", httpCode: HttpCode.INTERNAL_SERVER_ERROR, isOperational: true })
    }

    return formatAPIResponse(user);
  }

  @Get("/user")
  public async user(
    @Inject() id: number
  ): Promise<ApiResponse<User>> {
    const data = new UsersService().getUserById(id);

    return formatAPIResponse(data);
  }
}
