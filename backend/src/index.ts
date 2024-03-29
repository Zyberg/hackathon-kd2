import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import server from "./api";

import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./helpers/errorHandler";
const prisma = new PrismaClient();

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

process.on('unhandledRejection', (error: Error) => {
  console.log(`Unhandled Exception: ${error.message}`);

  errorHandler.handleError(error);
});

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught Exception: ${error.message}`);

  errorHandler.handleError(error);
});
