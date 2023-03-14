import { ApiMessage } from "../types/generic/apiMessages";
import { ApiResponse } from "../types/generic/apiResponse";
import { PaginationResult } from "../types/generic/paginate";
import responseBuilder from "./responseBuilder";

export default {
  makePaginatedSuccess: <T>(data: PaginationResult<T>): ApiResponse<T[]> =>
    responseBuilder.makeResponsePaginated(data, ApiMessage.Success),

  makeSuccess: <T>(data: T) =>
    responseBuilder.makeResponse(data, ApiMessage.Success),

  makeError: <T>(message: string) =>
    responseBuilder.makeError(message),
};
