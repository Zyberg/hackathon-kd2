import passport from "passport";
import JwtStrategy from "passport-jwt";
import type { VerifiedCallback } from "passport-jwt"
import { prisma } from "../../boot/prisma";
import type { User } from "@prisma/client";

console.log('test', process.env.ACCESS_JWT_SECRET)

export const jwtStrategy = new JwtStrategy.Strategy({
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_JWT_SECRET
}, async function verify({ userId }: any, done: VerifiedCallback) {
    let user: User | undefined;

    try {
      user =
        (await prisma.user.findFirst({
          where: { id: userId },
        })) ?? undefined;
    } catch (err) {
      return done(err, false);
    }

    return done(null, user || false);
});