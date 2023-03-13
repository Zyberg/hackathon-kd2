import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { responseBuilder } from "../basicJsonResponse";

export const auth = {
  local: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err: any, user?: Express.User) {
      if (err) return next(err);

      //TODO: for some reason a thrown error is not being caught here
      if (!user)
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json(responseBuilder.makeErrorResponse('Wrong Credentials'));
        
      req.user = user!!;
      next();
    })(req, res, next);
  },
  jwt: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", function (err: any, user?: Express.User) {
      if (err) return next(err);

      if (!user)
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Unauthorized",
        });

      req.user = user!!;
      next();
    })(req, res, next);
  },
};
