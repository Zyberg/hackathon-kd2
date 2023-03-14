// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./authentication.controller";

//TODO: Auth
import passport from "passport";
import { prisma } from "../../boot/prisma";
import { User } from "@prisma/client";
import { schema, validateBody } from "../../helpers/validation";
import { auth as authMiddleware } from "../../helpers/auth/auth"

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

// TODO: bad request meta
auth.post('/login/password',
  validateBody(schema.UserLoginRequest),
  authMiddleware.local,
  //@ts-ignore
  controller.loginPassword
)

// TODO: test
auth.post('/tokens/refresh', controller.refreshToken)

auth.get('/user', authMiddleware.jwt, async (req, res) => {
  const response = await controller.user(req.user!.id);

  return res.send(response);
})


auth.post("/signup/password", async function (req, res) {
  const response = await controller.signup(req.body);

  return res.send(response);
});

auth.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {});
    res.redirect("/");
  });
});


export default auth;
