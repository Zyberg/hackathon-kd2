import { ApiMessage, isMessageSuccess } from "../types/generic/apiMessages";
import { ApiResponse } from "../types/generic/apiResponse";
import { PaginationResult } from "../types/generic/paginate";

const makeStatus = (message: ApiMessage) => ({
  status: {
    success: isMessageSuccess(message),
    message,
  },
});

const makeStatusError = (message: string) => ({
  status: {
    success: false,
    message,
  },
});

export default {
  makeResponsePaginated: <T>(
    data: PaginationResult<T>,
    message: ApiMessage
  ): ApiResponse<T[]> => ({
    ...data,
    ...makeStatus(message),
  }),

  makeResponse: <T>(data: T, message: ApiMessage): ApiResponse<T> => ({
    data: data,
    ...makeStatus(message),
  }),

  makeError: (message: string): ApiResponse<null> => ({
    data: null,
    ...makeStatusError(message),
  }),
};
