import { AuthScope } from "../helpers/auth/scopes";

declare global {
  namespace Express {
    // For session
    interface User {
      id: number;
      email: string;
      scopes: AuthScope[];
    }
  }
}

export default {};