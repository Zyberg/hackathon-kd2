import { ApiResponsePaginated } from "../types/generic/apiResponse";

export const formatAPIResponse = <T>(data: any): any =>
  data !== null
    ? {
        success: true,
        message: "Success",
        ...data,
      }
    : {
        success: false,
        message: "Error",
        data: null,
      };
