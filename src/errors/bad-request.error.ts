import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(message?: string) {
    super(message)
  }

  serializeError(): ErrorResponse[] {
      return [{message: this.message}]
  }
}

export default BadRequestError;