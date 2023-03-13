import { NextFunction, Request, Response } from "express";
import { responseBuilder } from "../basicJsonResponse";

export const auth = {
  required: (req: Request, res: Response, next: NextFunction) => {
    if (req.session.id) {
      //TODO: better typing
      //TODO: empty user session is always found
      if (!!(req.session as any)?.passport?.user?.id) next();
    }
    res.send(responseBuilder.makeUnauthenticatedResponse());
  },
};
