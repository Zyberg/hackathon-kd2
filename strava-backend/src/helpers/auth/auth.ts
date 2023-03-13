import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AppError, HttpCode } from "../../exceptions/AppError";

export const auth = {
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
