import JwtStrategy from "passport-jwt";
import type { VerifiedCallback } from "passport-jwt"
import { prisma } from "../../boot/prisma";
import type { Role, User } from "@prisma/client";
import { AuthScope } from "./scopes";

export const jwtStrategy = new JwtStrategy.Strategy({
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_JWT_SECRET
}, async function verify({ userId }: any, done: VerifiedCallback) {
    let userModel: (User & { Role: Role | null }) | undefined;

    try {
      userModel =
        (await prisma.user.findFirst({
          where: { id: userId },
          include: {
            Role: true,
          },
        })) ?? undefined;
    } catch (err) {
      return done(err, false);
    }

    if (userModel === undefined || !userModel.Role)
        return done(null, false);

    const user: Express.User = {
      id: userModel.id,
      email: userModel.email,
      scopes: [userModel.Role!.title as AuthScope],
    };

    return done(null, user);
});