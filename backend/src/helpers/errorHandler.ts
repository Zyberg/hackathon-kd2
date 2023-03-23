import { AppError, HttpCode } from "../exceptions/AppError";
import type { Request, Response, NextFunction } from "express";
import apiResponseBuilder from "./apiResponseBuilder";
import { ApiMessage } from "../types/generic/apiMessages";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpCode.NOT_FOUND);
  res.json(apiResponseBuilder.makeError(ApiMessage.ResourceNotFound));
  res.end();
};

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  public handleError(error: Error | AppError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  private handleTrustedError(error: AppError, response: Response): void {
    response
      .status(error.httpCode)
      .json(apiResponseBuilder.makeError(error.message));
  }

  private handleCriticalError(
    error: Error | AppError,
    response?: Response
  ): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json(apiResponseBuilder.makeError(ApiMessage.InternalServerError));
    }

    console.log('aaa', error)
    console.log("Application encountered a critical error. Exiting");
    process.exit(1);
  }
}

export const errorHandler = new ErrorHandler();

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler.handleError(err, res);
};
