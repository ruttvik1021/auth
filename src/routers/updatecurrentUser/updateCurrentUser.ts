import express, { Request, Response } from "express";
import { json } from "body-parser";
import {
  authApiEndPoints,
  currentUserMessagesAndErrors,
} from "../../constants/constants";
import { UserDetails } from "../../models/userDetails";
import { body, validationResult } from "express-validator";
import { TokenValidator } from "../../middlewares/token-handler";

const router = express.Router();

router.put(
  authApiEndPoints.currentUser,
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("name")
      .custom((value) => {
        if (value.includes("  ")) {
          throw new Error("Name should not contain double spaces");
        }
        return true;
      })
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error("Name should not contain numbers");
        }
        return true;
      })
      .trim()
      .notEmpty()
      .withMessage("Name is Required"),
    body("organizationLogo").isString().optional(),
    body("organizationName")
      .isString()
      .notEmpty()
      .withMessage("Organization Name is Required"),
    body("retailTypeId").optional(),
    body("accountId").notEmpty().withMessage("Bad Request"),
  ],
  TokenValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const { email } = req.body.details;

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const updateDetails = await UserDetails.findOneAndUpdate(
      { email },
      req.body,
      { returnOriginal: false }
    );

    if (!updateDetails) {
      res
        .status(400)
        .send({ message: currentUserMessagesAndErrors.didNotFindUser });
    }

    res.status(200).send({
      message: currentUserMessagesAndErrors.detailsUpdatesSuccessfully,
    });
  }
);

export { router as UpdateCurrentUserRoute };
