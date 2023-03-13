import { createAccessToken } from "../../helpers/auth/loginUser";
import { FilteredUserInterface } from "../../helpers/auth/types";

export class AuthenticationService {
  public async login({ id, email}: Express.User) {
    const token = createAccessToken(id);

    const user: FilteredUserInterface = { id, email };

    return {
      token,
      expires_in: 600_000,
      user,
    };
  }
}
