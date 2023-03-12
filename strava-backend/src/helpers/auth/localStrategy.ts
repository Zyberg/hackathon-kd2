import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";
import type { User } from "@prisma/client";
import { hasUncaughtExceptionCaptureCallback } from "process";

export const localStrategy = new LocalStrategy.Strategy(
  {
    usernameField: "email",
  },
  async function verify(email, password, cb) {
    let user: User | undefined;

    try {
      user =
        (await prisma.user.findFirst({
          where: { email },
        })) ?? undefined;
    } catch (err) {
      return cb(err);
    }

    // TODO: localization
    if (user === undefined)
      return cb(null, false, { message: "Incorrect email or password." });

    const isMatchPassword = await bcrypt.compare(password, user.password);

    return isMatchPassword
      ? cb(null, user)
      : cb(null, false, {
          //TODO: localization
          message: "Incorrect email or password.",
        });
  }
);
