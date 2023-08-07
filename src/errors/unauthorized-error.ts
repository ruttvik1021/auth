import { CustomError } from "./custom-errors";

export class UnAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("UnAuthorized");

    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }

  serializeErrors() {
    return { message: "Unauthorized" };
  }
}
