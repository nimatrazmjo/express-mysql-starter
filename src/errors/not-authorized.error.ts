import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor(message?: string) {
    super(message)
  }

  serializeError(): ErrorResponse[] {
      return [{message: this.message}]
  }
}