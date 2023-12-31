import { FormatError } from "../../errors/formatting-errors";

export const passwordLengths = {
  min: 8,
  max: 16,
};

export const parameters = {
  email: "email",
  password: "password",
};

export const messages = {
  email: "Must be a valid email",
  password: `Password must be of ${passwordLengths.min} to ${passwordLengths.max}`,
  userExist: "User already exists",
  userCreated: "User Created",
};

export class UserExistsError extends FormatError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UserExistsError.prototype);
  }

  generateError() {
    return { message: this.message };
  }
}
