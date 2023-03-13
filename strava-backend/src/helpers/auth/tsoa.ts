import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { decodeToken } from "./jwt";

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('innn')
    if (securityName !== "jwt") reject(new Error("Unsupported security name"));

    console.log('test')
    console.log(request.query);
    const token = request.query.access_token;


    if (!token) {
      reject(new Error("No token provided"));
    }

    let decoded: undefined | jwt.JwtPayload;
    try {
        decoded = decodeToken(token as string, "[secret]") as jwt.JwtPayload;
    } catch (e) {
        reject(e);
    }

    for (let scope of scopes!!) {
        if (!decoded!!.scopes.includes(scope)) {
            reject(new Error("JWT does not contain required scope."));
        }
    }

    jwt.verify(token as string, "[secret]", function (err: any, decoded: any) {
      if (err) {
        reject(err);
      } else {
        // Check if JWT contains all required scopes
        for (let scope of scopes!!) {
          if (!decoded.scopes.includes(scope)) {
            reject(new Error("JWT does not contain required scope."));
          }
        }
        resolve(decoded);
      }
    });
  });
}
