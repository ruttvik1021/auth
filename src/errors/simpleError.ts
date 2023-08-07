import { Response } from "express";

export const SimpleError = (
  res: Response,
  statusCode: number,
  errorString: string
) => {
  throw res.status(statusCode).send({ message: errorString });
};
