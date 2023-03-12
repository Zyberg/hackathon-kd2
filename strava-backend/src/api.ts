import cors from "cors";
import nocache from "nocache";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import passport from "passport";
import { localStrategy } from "./helpers/auth/localStrategy";

import apiV1 from "./api-v1/index";
import * as errorHandler from "./helpers/errorHandler";
import home from "./home";
import docs from "./docs";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { session, sessionStore } from "./helpers/auth/session";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setPassport();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(session);
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private setPassport(): void {
    passport.use(localStrategy);
  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/docs", docs);
    this.express.use("/v1", apiV1);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
