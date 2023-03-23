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
  Response,
} from "tsoa";
import { ApiResponse } from "../../types/generic/apiResponse";
import {
  AuthenticationService,
  AuthenticationServiceTokenResponse,
  AuthenticationServiceTokenResponseData,
} from "./authentication.service";

import { UsersService } from "../../api-v1/users/users.service";
import {
  UserCreateRequest,
  UserLoginRequest,
  UserViewModel,
} from "../../types/users/user";
import { Request as ExpressRequest } from "express";
import apiResponseBuilder from "../../helpers/apiResponseBuilder";
import { ApiMessage } from "../../types/generic/apiMessages";
import { AppError, HttpCode } from "../../exceptions/AppError";

@Tags("Authentication")
@Route("auth")
export default class AuthenticationController extends Controller {
  @Post("/login/strava")
  public async loginStrava(@Inject() req: ExpressRequest) {
    const { refreshToken, expires } =
      await new AuthenticationService().login(req.user!!);

    AuthenticationController.setJwtCookies(
      req,
      refreshToken,
      expires,
      true,
      "none"
    )
      .header("Access-Control-Allow-Credentials", "true")
      .header("Access-Control-Allow-Origin", process.env.FRONTEND_URL)
      .redirect(302, process.env.FRONTEND_URL || "");
  }

  @Post("/login/password")
  @Response("401", "Unauthorized")
  public async loginPassword(
    @Inject() req: ExpressRequest,
    @Body() { email, password }: UserLoginRequest
  ): Promise<ApiResponse<AuthenticationServiceTokenResponseData>> {
    const data = await new AuthenticationService().login(req.user!!);

    return AuthenticationController.tokenizedRoute(req, data);
  }

  @Post("/tokens/refresh")
  @Response("401", "Unauthorized")
  public async refreshToken(
    @Request() req: ExpressRequest
  ): Promise<ApiResponse<AuthenticationServiceTokenResponseData>> {
    if (!req.cookies || !req.cookies.refresh_cookie)
      throw new AppError({
        description: ApiMessage.Unauthorized,
        httpCode: HttpCode.UNAUTHORIZED,
        isOperational: true,
      });

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

  @Post('/logout')
  public async logout(@Request() req: ExpressRequest) {
    //if (err) return next(err);
    req.session.destroy(() => {});

    req.res!!.clearCookie("refresh_cookie");

    console.log(req.user)
    console.log(req.get('Authorization'))
    let authorizationHeader = req.get('Authorization') ?? "";
    await new AuthenticationService().logout(req.user!!, authorizationHeader);

    req.res!!.send('').status(200)
  }

  @Hidden()
  private static tokenizedRoute(
    @Inject() req: ExpressRequest,
    { refreshToken, expires, data }: AuthenticationServiceTokenResponse
  ) {
    const response = apiResponseBuilder.makeSuccess(data);

    this.setJwtCookies(req, refreshToken, expires).json(response);

    return response;
  }

  @Hidden()
  private static setJwtCookies(
    @Inject() req: ExpressRequest,
    refreshToken: string,
    expires: Date,
    secure?: boolean,
    sameSite?: "none"
  ) {
    const config: any = {
      expires,
      httpOnly: true,
    };

    if (secure !== undefined) config.secure = secure;

    if (sameSite !== undefined) config.sameSite = sameSite;

    return req.res!!.cookie("refresh_cookie", refreshToken, config).status(200);
  }
}
