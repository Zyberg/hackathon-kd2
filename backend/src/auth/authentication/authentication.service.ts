import { decodeToken } from "../../helpers/auth/jwt";
import { createTokens } from "../../helpers/auth/loginUser";
import { FilteredUserInterface } from "../../helpers/auth/types";
import { Role, User } from "@prisma/client";
import type { JwtPayload } from "jsonwebtoken";
import { AuthScope } from "../../helpers/auth/scopes";
import { getExpiry } from "../../helpers/auth/cookies";
import { UserCreateRequest } from "../../types/users/user";
import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";
import { AppError, HttpCode } from "../../exceptions/AppError";

export interface AuthenticationServiceTokenResponseData {
  token: string;
  expires_in: number;
  user: FilteredUserInterface;
}

export interface AuthenticationServiceTokenResponse {
  refreshToken: string;
  expires: Date;
  data: AuthenticationServiceTokenResponseData;
}

export class AuthenticationService {
  public async login(user: Express.User) {
    return this.makeTokenResponse(user);
  }

  public async refreshToken(tokenRefresh: string) {
    const tokenDecoded = decodeToken(
      tokenRefresh,
      process.env.REFRESH_JWT_SECRET as string
    );
    const { userId } = tokenDecoded as JwtPayload;
1
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        Role: {
          select: {
            title: true,
          },
        },
      },
    });

    // TODO: add blacklisted tokens logic
    /**
    if (user.tokensBlacklisted?.includes(tokenRefresh)) {
      throw AppError("Unauthorized!", 401);
    }
     */

    return this.makeTokenResponse({
      id: user.id,
      email: user.email,
      scopes: [user.Role.title as AuthScope],
    });
  }

  public async signup({ name, email, password, scope }: UserCreateRequest) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let role: Role | undefined;
    try {
      role = await prisma.role.findFirstOrThrow({
        where: {
          title: scope,
        },
      });
    } catch (e) {
      throw new AppError({
        description: "User creation failed",
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        isOperational: true,
      });
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
              id: role.id,
            },
          },
        },
      });
    } catch (e) {
      throw new AppError({
        description: "User creation failed",
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        isOperational: true,
      });
    }

    return user;
  }

  private makeTokenResponse({
    id,
    email,
    scopes,
  }: Express.User): AuthenticationServiceTokenResponse {
    const { token, refreshToken } = createTokens(id, scopes);

    // Token can be cast to string because in case of an Error, it will be globally caught
    return {
      refreshToken: refreshToken as string,
      expires: getExpiry(),
      data: {
        token: token as string,
        expires_in: 600_000, // 10 mins
        user: { id, email },
      },
    };
  }
}
