import mongoose from "mongoose";

const industrySchema = new mongoose.Schema(
  {
    industryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface IIndustry {
  industryName: string;
}

interface IIndustryDoc extends mongoose.Document {
  industryName: string;
}

interface ICategoryModel extends mongoose.Model<IIndustryDoc> {
  build(attributes: IIndustry): IIndustryDoc;
}

industrySchema.statics.build = (attributes: IIndustry) => {
  return new CreateIndutry(attributes);
};

const CreateIndutry = mongoose.model<IIndustryDoc, ICategoryModel>(
  "Industries",
  industrySchema
);

export { CreateIndutry };
