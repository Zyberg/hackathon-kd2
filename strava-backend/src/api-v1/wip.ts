import type { NextFunction, Request, Response } from "express";
import Ajv from "ajv";
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import _schema from "../helpers/validation/_schema";

const wip: Router = Router();

interface UserPostRequest {
  name: string;
}

const ajv = new Ajv();

// validation middleware
function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  return (req: any, res: any, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
}

// helper type
type RequestBody<T> = Request<{}, {}, T>;

function addUser(name: string) {}

wip.post(
  "/test",
  validateBody(_schema.UserPostRequest),
  (req: RequestBody<UserPostRequest>, res: Response) => {
    console.log(req.body.name);
    return res.send(req.body);
  }
);

export default wip;
