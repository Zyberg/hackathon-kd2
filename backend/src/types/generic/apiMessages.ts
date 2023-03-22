export enum ApiMessage {
  Success = "Success",
  Error = "Error",
  Unauthorized = "Unauthorized",
  WrongCredentials = "Wrong Credentials",
  InternalServerError = "Internal Server Error",
  ResourceNotFound = "Requested Resource Not Found",
}

// Extend as required
export const isMessageSuccess = (message: ApiMessage) => {
  return message === ApiMessage.Success;
};
