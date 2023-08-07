import express, { Request, Response } from "express";
import {
  authApiEndPoints,
  currentUserMessagesAndErrors,
} from "../../constants/constants";
import { body, validationResult } from "express-validator";
import { User } from "../../models/user";
import { TokenValidator } from "../../middlewares/token-handler";
import { UserDetails } from "../../models/userDetails";

const router = express.Router();

// interface ICompleteForm {
//   organizationName: string;
//   organizationLogo: string;
//   name: string;
//   profileCompleted: boolean;
//   termAccepted: boolean;
//   mobileNumber: string;
//   retailTypeId: string;
//   retailType: string;
//   email: string;
//   aboutus?: string;
// }

router.put(
  authApiEndPoints.completeProfile,
  [
    body("organizationName")
      .isString()
      .withMessage("Must be a string")
      .isLength({ min: 3, max: 50 })
      .withMessage("Must be between 3 to 50 characters")
      .notEmpty()
      .withMessage("Required"),
    body("organizationLogo").isString().notEmpty().withMessage("Required"),
    body("name")
      .isString()
      .withMessage("Must have only characters")
      .isLength({ min: 3, max: 50 })
      .withMessage("Max length is 50 characters")
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
    // body("termAccepted").isBoolean().withMessage("Must be a Boolean"),
    body("mobileNumber")
      .isNumeric()
      .withMessage("Must be a Number")
      .isLength({ max: 10 })
      .withMessage("Must not be above 10 digits"),
    // body("retailTypeId").isString().withMessage("Required"),
    body("retailType").isString().withMessage("Required"),
    body("aboutus")
      .isLength({ max: 250 })
      .withMessage("Not more than 250 characters"),
    body("email").isEmail().notEmpty().withMessage("Required"),
    body("address")
      .isString()
      .isLength({ max: 250 })
      .withMessage("Maximum 250 letters allowed")
      .notEmpty()
      .withMessage("Required"),
  ],
  TokenValidator(""),
  async (req: Request, res: Response) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("errors.array()", errors.array()[0].path);
      return res.status(400).send({
        message: `${errors.array()[0]?.path?.toUpperCase()} : ${
          errors.array()[0].msg
        }`,
      });
    }
    const { email } = req.body;

    const updateDetails = await UserDetails.findOneAndUpdate(
      { email },
      { ...req.body, profileCompleted: true },
      { returnOriginal: false }
    );

    await User.findOneAndUpdate({ email }, { $set: { companyInfo: true } });

    if (!updateDetails) {
      res
        .status(400)
        .send({ message: currentUserMessagesAndErrors.didNotFindUser });
    }

    res.status(200).send({ body: req.body });
  }
);

export { router as CompleteProfileRoute };
