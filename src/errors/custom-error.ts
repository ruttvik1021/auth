import { FormatError } from "./formatting-errors";

export class CustomError extends FormatError {
  statusCode = 403;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  generateError() {
    return { message: this.message };
  }
}
