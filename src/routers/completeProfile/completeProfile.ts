import express, { Request, Response } from "express";
import {
  authApiEndPoints,
  currentUserMessagesAndErrors,
} from "../../constants/constants";
import {
  ResultFactory,
  ValidationError,
  body,
  validationResult,
} from "express-validator";
import { User } from "../../models/user";
import { TokenValidator } from "../../middlewares/token-handler";
import { UserDetails } from "../../models/userDetails";
import { messages, parameters, length } from "./constants";

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
    body(parameters.organizationName)
      .isLength({
        min: length.orgNameLength.min,
        max: length.orgNameLength.max,
      })
      .withMessage(messages.orgNameLength)
      .notEmpty()
      .withMessage(messages.organizationNameRequired),
    body(parameters.organizationLogo)
      .isString()
      .notEmpty()
      .withMessage(messages.orgLogoRequired),
    body(parameters.name)
      .isString()
      .withMessage(messages.nameCharacters)
      .isLength({ min: length.name.min, max: length.name.max })
      .withMessage(messages.nameLength)
      .custom((value) => {
        if (value.includes("  ")) {
          throw new Error(messages.doubleSpacesNotAllowed);
        }
        return true;
      })
      .custom((value) => {
        if (/\d/.test(value)) {
          throw new Error(messages.numbersNotAllowed);
        }
        return true;
      })
      .trim()
      .notEmpty()
      .withMessage(messages.nameRequired),
    body(parameters.mobileNumber)
      .isString()
      .withMessage(messages.mobileNumberRequired),
    body(parameters.industryId)
      .isString()
      .withMessage(messages.industryRequired),
    // body(parameters.aboutus)
    //   .isLength({ max: length.aboutUs.max })
    //   .withMessage(messages.aboutUsLength),
    body(parameters.email)
      .isEmail()
      .notEmpty()
      .withMessage(messages.emailRequired),
    body(parameters.address)
      .isString()
      .isLength({ max: length.address.max })
      .withMessage(messages.addressLength)
      .notEmpty()
      .withMessage(messages.addressRequired),
  ],
  TokenValidator(""),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array()[0].msg,
      });
    }

    const { email } = req.body;
    const tokenEmail = req.body.details.decodedToken.email;

    if (email !== tokenEmail) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const updateDetails = await UserDetails.findOneAndUpdate(
      { email },
      { ...req.body, profileCompleted: true },
      { returnOriginal: false }
    );

    await User.findOneAndUpdate({ email }, { $set: { companyInfo: true } });

    if (!updateDetails) {
      res.status(400).send({ message: messages.didNotFindUser });
    }

    res
      .status(200)
      .send({ body: req.body, message: messages.profileUpdatedSuccessfully });
  }
);

export { router as CompleteProfileRoute };
