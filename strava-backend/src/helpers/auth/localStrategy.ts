import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import { prisma } from "../../boot/prisma";
import type { Role, User } from "@prisma/client";
import { AuthScope } from "./scopes";

export const localStrategy = new LocalStrategy.Strategy(
  {
    usernameField: "email",
  },
  async function verify(email, password, cb) {
    let userModel: (User & { Role: Role | null }) | undefined;

    try {
      userModel =
        (await prisma.user.findFirst({
          where: { email },
          include: {
            Role: true,
          },
        })) ?? undefined;
    } catch (err) {
      return cb(err);
    }

    if (userModel === undefined)
      return cb(null, false, { message: "Incorrect email or password." });

    if (!userModel.Role)
      return cb(null, false, { message: "Incorrect authorization scope." });

    const isMatchPassword = await bcrypt.compare(password, userModel.password);

    const user: Express.User = {
      id: userModel.id,
      email: userModel.email,
      scopes: [userModel.Role!.title as AuthScope],
    };

    return isMatchPassword
      ? cb(null, user)
      : cb(null, false, {
          message: "Incorrect email or password.",
        });
  }
);
