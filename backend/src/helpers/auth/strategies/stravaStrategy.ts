import { Role, User } from "@prisma/client";
import StravaStrategy from "@riderize/passport-strava-oauth2";
import { prisma } from "../../../boot/prisma";
import { AppError, HttpCode } from "../../../exceptions/AppError";
import { AuthScope } from "../scopes";
import crypto from "crypto"

const makeExpressUser = (userModel: User & { Role: Role }): Express.User => ({
  id: userModel.id,
  email: userModel.email,
  scopes: [userModel.Role!.title as AuthScope],
});

export const stravaStrategy = new StravaStrategy.Strategy(
  {
    clientID: process.env.STRAVA_CLIENT_ID || "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET || "",
    callbackURL: process.env.STRAVA_CLIENT_CALLBACK || "",
    authorizationURL: "https://www.strava.com/oauth/mobile/authorize?scope=read_all&scope=activity:read_all"
  },
  async function verify(accessToken, refreshToken, profile, done) {
    //TODO: think of a better way to link user accounts
    console.log("in");
    console.log(profile._raw);
    console.log(profile._json);
    console.log(profile.provider);

    const stravaProfile = await prisma.userStravaProfile.findFirst({
      where: {
        id_strava: +profile.id,
      },
    });

    // If a strava profile already exists, log in
    if (stravaProfile !== null) {
      const userModel = await prisma.user.findFirst({
        where: {
          id: stravaProfile.userId,
        },
        include: {
          Role: true,
        },
      });

      if (userModel === null)
        return done(
          new AppError({
            description: "Strava profile is not connected to an existing user",
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            isOperational: true,
          }),
          false
        );

      // TODO: maybe redesign this strategy to upsert and save one query?
      // Update strava profile
      await prisma.userStravaProfile.update({
        where: {
          id_strava: +profile.id,
        },
        data: {
          accessToken,
          refreshToken,
          data: profile._json,
        },
      });

      return done(null, makeExpressUser(userModel));
    }

    // If a strava profile does not exist
    // Roles are always guaranteed to exist
    const userRole = await prisma.role.findFirstOrThrow({
      where: {
        title: AuthScope.user,
      },
    });

    const user = await prisma.user.create({
      data: {
        name: profile.fullName,
        password: "",
        Role: {
          connect: {
            id: userRole?.id,
          },
        },
        stravaProfile: {
          create: {
            id_strava: +profile.id,
            accessToken,
            refreshToken,
            data: profile._json,
          },
        },
      },
      include: {
        Role: true,
      },
    });

    return done(null, makeExpressUser(user));
  }
);
