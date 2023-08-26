import express, { Request, Response } from "express";
import {
  authApiEndPoints,
  middlewareLocations,
} from "../../constants/constants";
import { TokenValidator } from "../../middlewares/token-handler";
import { UserDetails } from "../../models/userDetails";
import { messages } from "./constants";

const router = express.Router();

router.get(
  authApiEndPoints.currentUser,
  TokenValidator,
  async (req: Request, res: Response) => {
    const { email } = req.body.details;

    const existingUser = await UserDetails.findOne({ email });

    if (!existingUser) {
      res.status(404).send({ message: messages.noUserFound });
    }

    delete existingUser?.__v;
    delete existingUser?._id;

    res.status(200).send(existingUser);
  }
);

export { router as GetCurrentUserRoute };
