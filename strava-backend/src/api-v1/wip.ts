import type { Response } from "express";
// tslint:disable-next-line:no-duplicate-imports
import { Router } from "express";
import { schema, validateBody } from "../helpers/validation";
import { RequestBody } from "../types/generic/apiResponse";

const wip: Router = Router();

interface UserPostRequest {
  name: string;
}

wip.post(
  "/test",
  validateBody(schema.UserPostRequest),
  (req: RequestBody<UserPostRequest>, res: Response) => {
    console.log(req.body.name);
    return res.send(req.body);
  }
);

export default wip;
