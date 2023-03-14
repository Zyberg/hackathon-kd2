import { generateToken } from "./jwt";
import { AuthScope } from "./scopes";

export const createRefreshToken = (userId: number) => {
  return generateToken({ userId }, process.env.REFRESH_JWT_SECRET!, "7d");
};

export const createAccessToken = (userId: number, scopes?: AuthScope[]) => {
  return generateToken(
    { userId, scopes },
    process.env.ACCESS_JWT_SECRET!,
    "10m"
  );
};

export const createTokens = (userId: number, scopes?: AuthScope[]) => {
  return {
    token: createAccessToken(userId, scopes),
    refreshToken: createRefreshToken(userId),
  };
};
