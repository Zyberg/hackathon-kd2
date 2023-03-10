import dotenv from "dotenv";
dotenv.config();

import server from "./api";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

console.log(process.env.API_PORT)

server.listen(process.env.API_PORT || "3000", () => {
  console.log(
    `The API server has successfully started. \nListening at ${
      process.env.APP_BASE_URL || "http://localhost:3000"
    }`
  );
});

process.on("SIGINT", function () {
  prisma.$disconnect(); // Disconnect from Prisma
  console.log("Prisma Disconnected.");
  process.exit(0);
});
