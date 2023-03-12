import { ApiMessage } from "../types/generic/apiMessages";
import { ApiResponse } from "../types/generic/apiResponse";

export const formatAPIResponse = <T>(data: any): ApiResponse<T> =>
  data !== null
    ? {
        success: true,
        message: ApiMessage.Success,
        ...data,
      }
    : {
        success: false,
        message: ApiMessage.Error,
        data: null,
      };
