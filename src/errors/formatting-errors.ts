import { ValidationError } from "express-validator";

export abstract class FormatError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, FormatError.prototype);
  }

  abstract generateError(): {
    message: string;
  };
}
