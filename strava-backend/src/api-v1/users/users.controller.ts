//import * as bcrypt from 'bcrypt';
import { PrismaClient, User } from "@prisma/client";
import { Get, Route } from "tsoa";

const prisma = new PrismaClient();

interface UserResponse {
  success: boolean;
  message: string;
  data: User[] | null;
}

@Route("users")
export default class UserController {
  @Get("/")
  public async getAllUsers(): Promise<UserResponse> {
    try {
      const data = await prisma.user.findMany();

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
