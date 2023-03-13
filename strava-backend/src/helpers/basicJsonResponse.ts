import { ApiMessage } from "../types/generic/apiMessages";

export const responseBuilder = {
  makeSuccessResponse: (data: any) => ({
    success: true,
    message: ApiMessage.Success,
    ...data,
  }),
  makeErrorResponse: (message: string) => ({
    success: false,
    message,
    data: null,
  }),
  makeUnauthenticatedResponse: () => ({
    success: false,
    message: ApiMessage.Unauthenticated,
    data: null,
  })
};
