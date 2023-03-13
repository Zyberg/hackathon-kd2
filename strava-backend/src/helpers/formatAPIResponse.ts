import { ApiResponse } from "../types/generic/apiResponse";
import { responseBuilder } from "./basicJsonResponse";

export const formatAPIResponse = <T>(data: any): ApiResponse<T> =>
  data !== null
    ? responseBuilder.makeSuccessResponse(data)
    : responseBuilder.makeErrorResponse("Error");
