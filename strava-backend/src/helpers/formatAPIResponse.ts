import { ApiMessage } from "../types/generic/apiMessages";
//import { ApiResponsePaginated } from "../types/generic/apiResponse";

export const formatAPIResponse = <T>(data: any): any =>
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
