import { AuthScope } from "../../helpers/auth/scopes";

export interface UserLoginRequest {
  /**
   * @format email
   */
  email: string;

  password: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  scope: AuthScope;
}

export interface UserViewModel {
  id: number;
  name: string | null;

  /**
   * @format email
   */
  email: string;

  role: string;
}