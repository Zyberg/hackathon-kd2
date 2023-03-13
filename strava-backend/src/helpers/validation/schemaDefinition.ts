export { UserInterface } from "../auth/types"

export interface UserPostRequest {
  /**
   * @format email
   */
  email: string;

  name: string;
}
