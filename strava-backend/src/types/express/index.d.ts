import { AuthScope } from "../../helpers/auth/scopes";

declare global {
  namespace Express {
    // For session
    export interface User {
      id: number;
      email: string;
      scopes: AuthScope[];
    }

    // For cookies
    export interface Request {
      cookies: {
        refresh_cookie?: string;
      };
    }
  }
}

export {};