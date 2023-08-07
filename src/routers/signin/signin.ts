import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { JWT_KEY, authApiEndPoints } from "../../constants/constants";
import { signInErrors } from "./errors";
import jwt from "jsonwebtoken";
import { Password } from "../../services/passwordHashing";
import { User } from "../../models/user";

const router = express.Router();

router.post(
  authApiEndPoints.signIn,
  [
    body("email").isEmail().withMessage("Bad Request"),
    body("password").isString().withMessage("Bad Request"),
    body()
      .custom((body) => {
        const keys = ["password", "email"];
        return Object.keys(body).every((key) => keys.includes(key));
      })
      .withMessage("Bad Request"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).send({ message: errors.array()[0].msg });
    const { email, password } = req.body;

    const UserDetails = await User.findOne({ email });
    if (!UserDetails)
      return res.status(400).send({ message: "Bad Credentials" });

    const isPasswordSame = await Password.compare(
      UserDetails.password,
      password
    );

    if (!isPasswordSame)
      return res.status(400).send({ message: "Bad Credentials" });

    // Encoded Ruttvik1021 base64
    let tokenParameters = {
      email: req.body.email,
      Role: "ORG-ADMIN",
      companyInfo: UserDetails.companyInfo,
    };
    const token = jwt.sign(tokenParameters, JWT_KEY, { expiresIn: "12h" });

    res.status(200).send({
      message: "Login Successful",
      token,
      companyInfo: UserDetails.companyInfo,
    });
  }
);

export { router as SignInApiRoute };
