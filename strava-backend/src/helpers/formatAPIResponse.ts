import { ApiMessage } from "../types/generic/apiMessages";
import { ApiResponsePaginated } from "../types/generic/apiResponse";

export const formatAPIResponse = <T>(data: any): ApiResponsePaginated<T> =>
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
