import { createAccessToken } from "../../helpers/auth/loginUser";
import { FilteredUserInterface } from "../../helpers/auth/types";

export class AuthenticationService {
  public async login({ id, email, scopes }: Express.User) {
    const token = createAccessToken(id, scopes);

    const user: FilteredUserInterface = { id, email };

    return {
      token,
      expires_in: 600_000,
      user,
    };
  }
}
