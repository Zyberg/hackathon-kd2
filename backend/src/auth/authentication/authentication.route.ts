// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./authentication.controller";

//TODO: Auth
import passport from "passport";
import { prisma } from "../../boot/prisma";
import { User } from "@prisma/client";
import { schema, validateBody } from "../../helpers/validation";
import { auth as authMiddleware } from "../../helpers/auth/auth";
import { AuthScope } from "../../helpers/auth/scopes";
import { AuthenticationService } from "./authentication.service";

const auth: Router = Router();
const controller = new Controller();

// ----- START SESSION CONFIGURATION

// Persist user data in the session
passport.serializeUser((user, cb) => {
  cb(null, { id: user.id, email: user.email });
});

// Deserialize session
passport.deserializeUser(
  async (req: any, { id, email }: Express.User, cb: any) => {
    let user: User | null;

    try {
      user = await prisma.user.findFirst({
        where: { id, email },
      });
    } catch (err) {
      return cb(err);
    }

    return user !== null ? cb(null, user) : cb(null, false);
  }
);
// ----- END SESSION CONFIGURATION

// Login via password
auth.post(
  "/login/password",
  validateBody(schema.UserLoginRequest),
  authMiddleware.local,
  //@ts-ignore
  controller.loginPassword
);

// Login via Strava
auth.get(
  "/login/strava",
  passport.authenticate("strava")
);

// TODO: add cookies afterwards
auth.get(
  "/strava/callback",
  passport.authenticate("strava", { failureMessage: "failed login :(" }),
  //@ts-ignore
  controller.loginStrava,
);

auth.get("/login/strava", (req, res) => {});

// TODO: test
auth.post("/tokens/refresh", controller.refreshToken);

auth.get("/user", authMiddleware.jwt, async (req, res) => {
  const response = await controller.user(req.user!.id);

  return res.send(response);
});

auth.post("/signup/password", async function (req, res) {
  const response = await controller.signup(req.body);

  return res.send(response);
});

//@ts-ignore
auth.post("/logout", authMiddleware.jwt, controller.logout);

export default auth;
