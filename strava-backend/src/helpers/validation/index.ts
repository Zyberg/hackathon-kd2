import Ajv from "ajv";
import addFormats from "ajv-formats";
import { NextFunction, Request, Response } from "express";
import _schema from "./_schema";

const ajv = new Ajv();
addFormats(ajv);

export const validateBody = (schema: object) => {
  const validate = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validate(req.body)) return res.status(400).json(validate.errors);
    return next();
  };
}

export const schema = _schema;