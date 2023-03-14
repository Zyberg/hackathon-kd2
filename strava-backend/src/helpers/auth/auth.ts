import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { ApiMessage } from "../../types/generic/apiMessages";
import apiResponseBuilder from "../apiResponseBuilder";

export const auth = {
  local: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err: any, user?: Express.User) {
      if (err) return next(err);

      //TODO: for some reason a thrown error is not being caught here
      if (!user)
        return res
        .status(HttpCode.UNAUTHORIZED)
        .json(apiResponseBuilder.makeError(ApiMessage.WrongCredentials));
        
      req.user = user!!;
      next();
    })(req, res, next);
  },
  jwt: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", function (err: any, user?: Express.User) {
      if (err) return next(err);

      if (!user)
      //TODO: automatically send correct ApiMessage by inferring from the httpCode
        throw new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: ApiMessage.Unauthorized,
        });

      req.user = user!!;
      next();
    })(req, res, next);
  },
};
