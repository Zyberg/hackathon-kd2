import cors from "cors";
import nocache from "nocache";
import express from "express";
import cookieParser from "cookie-parser"
import helmet from "helmet";
import morgan from "morgan";

import passport from "passport";
import { localStrategy } from "./helpers/auth/strategies/localStrategy";
import { jwtStrategy } from "./helpers/auth/strategies/jwtStrategy";
import { session } from "./helpers/auth/session";

import apiV1 from "./api-v1/index";
import { errorHandlerMiddleware, notFound } from "./helpers/errorHandler";
import home from "./home";
import docs from "./docs";
import auth from "./auth";
import wip from "./wip";
import { stravaStrategy } from "./helpers/auth/strategies/stravaStrategy";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setPassport();
    this.setRoutes();
    this.setSpa();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(nocache());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cookieParser())
    this.express.use(session);
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private setPassport(): void {
    passport.use(localStrategy);
    passport.use(jwtStrategy);
    passport.use(stravaStrategy);
  }

  private setRoutes(): void {
    this.express.use("/", home);
    this.express.use("/docs", docs);
    this.express.use("/api/auth", auth);
    this.express.use("/api", apiV1);

    // WIP:
    this.express.use('/wip', wip)
  }

  private setSpa(): void {
    this.express.get(/^\/(?!api($|\/.*))/, function (req, res) {
      res.sendFile('index.html', { root: "public" });
    });
  }

  private catchErrors(): void {
    this.express.use(notFound);
    this.express.use(errorHandlerMiddleware);
  }
}

export default new App().express;
