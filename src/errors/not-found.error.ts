import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(message?: string) {
    super(message)
  }
  serializeError(): ErrorResponse[] {
      return [{message: this.message}]
  }
}

export default NotFoundError;