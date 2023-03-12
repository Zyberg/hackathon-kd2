// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import { DataTableQuery } from "../../types/generic/DataTable";
import Controller from "./authentication.controller";
import type { Request, Response } from "express";

//TODO: Auth
import passport from "passport";

const auth: Router = Router();
const controller = new Controller();

auth.get("/", async (req: Request, res: Response) => {
  const response = await controller.login("", "");
  return res.send(response);
});


// Persist user data in the session
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.email });
  });
});

passport.deserializeUser(function (user: Express.User, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// TODO: should be more humane
// TODO: bad request meta
auth.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

auth.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

auth.post("/signup/password", async function (req, res) {
  console.log("body", req.body);
  const response = await controller.signup(req.body);

  return res.send(response);
});

export default auth;
