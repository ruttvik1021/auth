import express, { Request, Response } from "express";
import {
  authApiEndPoints,
  middlewareLocations,
} from "../../constants/constants";
import { TokenValidator } from "../../middlewares/token-handler";
import { UserDetails } from "../../models/userDetails";
import mongoose from "mongoose";

const router = express.Router();

router.get(
  authApiEndPoints.currentUser,
  TokenValidator(middlewareLocations.CurrentUser),
  async (req: Request, res: Response) => {
    const { email } = req.body.details;

    const existingUser = await UserDetails.findOne({ email });

    if (!existingUser) {
      res.status(404).send("No user found");
    }

    res.status(200).send(existingUser);
  }
);

export { router as GetCurrentUserRoute };
