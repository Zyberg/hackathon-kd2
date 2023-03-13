// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import Controller from "./authentication.controller";

//TODO: Auth
import passport from "passport";
import { prisma } from "../../boot/prisma";
import { User } from "@prisma/client";
import { createRefreshToken } from "../../helpers/auth/loginUser";
import { getExpiry } from "../../helpers/auth/cookies";
import { schema, validateBody } from "../../helpers/validation";

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

    console.log('super weird', id, email)

    return user !== null ? cb(null, user) : cb(null, false);
  }
);
// ----- END SESSION CONFIGURATION

// TODO: bad request meta
auth.post('/login/password',
  validateBody(schema.UserPostRequest),
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const response = await controller.loginPassword(req.user!!, "", "");

    return res
      .cookie("refresh_cookie", createRefreshToken(req.user!!.id), {
        expires: getExpiry(),
        httpOnly: true,
        // sameSite: "None",
        // secure: true,
      })
      .status(200)
      .json(response)
  }
)


auth.post("/signup/password", async function (req, res) {
  console.log("body", req.body);
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
