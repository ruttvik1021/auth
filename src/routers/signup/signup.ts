import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { authApiEndPoints } from "../../constants/constants";
import { User } from "../../models/user";
import { passwordLengths, messages, parameters } from "./constants";
import { UserDetails } from "../../models/userDetails";

const router = express.Router();

router.post(
  authApiEndPoints.signUp,
  [
    body(parameters.email).isEmail().withMessage(messages.email),
    body(parameters.password)
      .trim()
      .isLength({ min: passwordLengths.min, max: passwordLengths.max })
      .withMessage(messages.password),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // throw new RequestValidationError(errors.array());
      return res.status(400).send({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // throw new BadRequestError("User already exist");
      return res.status(400).send({ message: messages.userExist });
    }

    const user = User.build({ email, password, companyInfo: false });

    // await userDetails.save()
    await user.save();

    const userDetails = UserDetails.build({
      email,
      name: "",
      organizationLogo: "",
      organizationName: "",
      industryId: "",
      organizationId: user._id,
      profileCompleted: false,
      termAccepted: false,
      mobileNumber: "",
      address: "",
    });

    await userDetails.save();

    res.status(201).send({ email, message: messages.userCreated });
  }
);

export { router as SignUpApiRoute };
