import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid Request Parameters");

    // Below statement is used only when we extends Build In Class
    // in our case its the Error
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return { message: this.errors[0].msg };
  }
}
