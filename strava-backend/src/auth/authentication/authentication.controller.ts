import { User } from "@prisma/client";
import {
  Post,
  Body,
  Route,
  Hidden,
  Tags,
  Get,
  Inject,
  Request,
  Controller,
} from "tsoa";
import { ApiResponse } from "../../types/generic/apiResponse";
import {
  AuthenticationService,
  AuthenticationServiceTokenResponse,
  AuthenticationServiceTokenResponseData,
} from "./authentication.service";

import { UsersService } from "../../api-v1/users/users.service";
import { UserCreateRequest, UserLoginRequest, UserViewModel } from "../../types/users/user";
import { Request as ExpressRequest } from "express";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
@Tags("Authentication")
@Route("auth")
export default class AuthenticationController extends Controller {

  @Post("/login/password")
  public async loginPassword(
    @Inject() req: ExpressRequest,
    @Body() { email, password }: UserLoginRequest
  ): Promise<ApiResponse<AuthenticationServiceTokenResponseData>> {
    const data = await new AuthenticationService().login(req.user!!);

    return AuthenticationController.tokenizedRoute(req, data);
  }

  @Post("/tokens/refresh")
  public async refreshToken(
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<AuthenticationServiceTokenResponseData>> {
    const data = await new AuthenticationService().refreshToken(
      req.cookies.refresh_cookie || ""
    );

    return AuthenticationController.tokenizedRoute(req, data);
  }

  @Post("/signup")
  public async signup(
    @Body() req: UserCreateRequest
  ): Promise<ApiResponse<User>> {
    const data = await new AuthenticationService().signup(req);

    return apiResponseBuilder.makeSuccess(data);
  }

  @Get("/user")
  public async user(@Inject() id: number): Promise<ApiResponse<UserViewModel>> {
    const data = await new UsersService().getUserById(id);

    return apiResponseBuilder.makeSuccess(data);
  }

  @Hidden()
  private static tokenizedRoute(
    @Inject() req: ExpressRequest,
    { refreshToken, expires, data }: AuthenticationServiceTokenResponse
  ) {
    const response = apiResponseBuilder.makeSuccess(data);

    // TODO: test
    req
      .res!!.cookie("refresh_cookie", refreshToken, {
        expires,
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
      })
      .status(200)
      .json(response);

    return response;
  }
}
