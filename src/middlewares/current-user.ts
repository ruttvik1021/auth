// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { BadRequestError } from "../errors/bad-request-error";

// interface IVerifiedPayload {
//   id: string;
//   email: string;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: IVerifiedPayload;
//     }
//   }
// }

// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.session?.jwt) {
//     return next();
//   }

//   try {
//     const payload = jwt.verify(
//       req.session.jwt,
//       process.env.JWT_KEY!
//     ) as IVerifiedPayload;

//     req.currentUser = payload;

//     if (!payload) {
//       throw new BadRequestError("0");
//     }
//   } catch (error) {}

//   next();
// };
