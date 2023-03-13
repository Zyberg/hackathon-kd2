import { generateToken } from "./jwt"

export const createRefreshToken = (userId: number) => {
  return generateToken(
    { userId },
    process.env.REFRESH_JWT_SECRET!,
    "7d"
  )
}

export const createAccessToken = (userId: number) => {
  return generateToken(
    { userId },
    process.env.ACCESS_JWT_SECRET!,
    "10m"
  )
}