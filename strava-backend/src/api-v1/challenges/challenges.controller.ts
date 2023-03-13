import { PrismaClient, Challenge } from "@prisma/client";
import { Get, Route, Tags } from "tsoa";

const prisma = new PrismaClient();

interface ChallengeResponse {
  success: boolean;
  message: string;
  data: Challenge[] | null;
}

@Tags("Challenge")
@Route("challenges")
export default class UserController {
  @Get("/")
  public async getAllChallenges(): Promise<ChallengeResponse> {
    try {
      const data = await prisma.challenge.findMany();

      return {
        success: true,
        message: "Success",
        data,
      };
    } catch (e: any) {
      console.error(e);
      return {
        success: false,
        message: e.toString(),
        data: null,
      };
    }
  }
}
