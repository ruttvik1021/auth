import express, { Request, Response } from "express";
import { authApiEndPoints } from "../../constants/constants";
import { body, validationResult } from "express-validator";
import { messages, parameters } from "./constants";
import { CreateIndutry } from "../../models/createIndustry";

const router = express.Router();

router.post(
  authApiEndPoints.industries,
  [
    body(parameters.industryName)
      .isString()
      .withMessage(messages.industryNameRequired),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ message: errors.array()[0].msg });
    }

    const { industryName } = req.body;

    const existingIndustry = await CreateIndutry.findOne({ industryName });

    if (existingIndustry) {
      return res.status(400).send({ message: messages.industryExist });
    }

    const industry = CreateIndutry.build({ industryName });

    await industry.save();

    res.status(201).send({ message: messages.industryAdded });
  }
);

export { router as CreateIndustryRoute };
