import  { ValidationError } from 'express-validator';
import { ErrorResponse } from '../interfaces/error-response.interface';
import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
  statusCode: number = 422;
  constructor (public errors: ValidationError[]) {
    super('Invalid Request validtion');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): ErrorResponse[] {
    return this.errors.map(err=>({message: err.msg,field:err.param}))
  }
}