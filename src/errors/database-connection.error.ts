import { ErrorResponse } from "../interfaces/error-response.interface";
import { CustomError } from "./custom.error";

class DatabaseConnectionError extends CustomError {
  statusCode: number = 502
  constructor(message?: string) {
    super(message)
  }
  serializeError(): ErrorResponse[] {
      return [{message:this.message}]
  }
}

export default DatabaseConnectionError;