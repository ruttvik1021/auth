import express, { Request, Response } from "express";
import { authApiEndPoints } from "../../constants/constants";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: String,
  countryCode: String,
  countryCallingCode: String,
});

const documentSchema = new Schema({
  countrySchema,
});
const Documents = mongoose.model("countryCodes", documentSchema);

const router = express.Router();

router.get(
  authApiEndPoints.countryList,
  async (req: Request, res: Response) => {
    const countryList: any = await Documents.find();

    const responseArray = countryList[0];

    delete responseArray.__v;
    delete responseArray._id;

    res.status(200).send({ countries: responseArray });
  }
);

export { router as CountryListRoute };
