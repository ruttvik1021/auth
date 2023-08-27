import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { JWT_KEY, authApiEndPoints } from "../../constants/constants";
import { parameters, messages, roles, tokenExpiry } from "./constants";
import jwt from "jsonwebtoken";
import { Password } from "../../services/passwordHashing";
import { User } from "../../models/user";
import { UserDetails } from "../../models/userDetails";

const router = express.Router();

router.post(
  authApiEndPoints.signIn,
  [
    body(parameters.email).isEmail().withMessage(messages.badRequest),
    body(parameters.password).isString().withMessage(messages.badRequest),
    body()
      .custom((body) => {
        const keys = [parameters.password, parameters.email];
        return Object.keys(body).every((key) => keys.includes(key));
      })
      .withMessage(messages.badRequest),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).send({ message: errors.array()[0].msg });
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const userDetails = await UserDetails.findOne({ email });
    if (!user)
      return res.status(400).send({ message: messages.badCredentials });

    const isPasswordSame = await Password.compare(user.password, password);

    if (!isPasswordSame)
      return res.status(400).send({ message: messages.badCredentials });

    // Encoded Ruttvik1021 base64
    let tokenParameters = {
      email: req.body.email,
      Role: roles.orgAdmin,
      companyInfo: user.companyInfo,
      organizationId: userDetails?.organizationId || "",
      userId: user._id,
    };
    const token = jwt.sign(tokenParameters, JWT_KEY, {
      expiresIn: tokenExpiry,
    });

    res.status(200).send({
      message: messages.loginSuccessful,
      token,
      companyInfo: user.companyInfo,
    });
  }
);

export { router as SignInApiRoute };
