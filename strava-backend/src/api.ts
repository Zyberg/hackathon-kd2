import cors from "cors";
import nocache from "nocache";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import passport from "passport";
import { localStrategy } from "./helpers/auth/localStrategy";
import { jwtStrategy } from "./helpers/auth/jwtStrategy";
import { session } from "./helpers/auth/session";

import apiV1 from "./api-v1/index";
import { errorHandlerMiddleware, notFound } from "./helpers/errorHandler";
import home from "./home";
import docs from "./docs";
import auth from "./auth";

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
    passport.use(jwtStrategy);
  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/docs", docs);
    this.express.use("/v1", apiV1);
    this.express.use("/auth", auth);
  }

  private catchErrors(): void {
    this.express.use(notFound);
    this.express.use(errorHandlerMiddleware);
  }
}

export default new App().express;
