import express, { Request, Response } from "express";
import { authApiEndPoints } from "../../constants/constants";
import { CreateIndutry } from "../../models/createIndustry";
import { TokenValidator } from "../../middlewares/token-handler";

const router = express.Router();

router.get(
  authApiEndPoints.industries,
  TokenValidator,
  async (req: Request, res: Response) => {
    const getAllIndustries = await CreateIndutry.find();

    if (!getAllIndustries) {
      return res.status(200).send({ message: "No Industries found" });
    }

    const getNameAndId = getAllIndustries.map((item: any) => {
      return { industryName: item.industryName, id: item.id };
    });

    res.status(200).send({ industries: getNameAndId });
  }
);

export { router as GetAllIndustriesRoute };
