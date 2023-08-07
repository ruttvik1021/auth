import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface ICategory {
  categoryName: string;
}

interface ICategoryDoc extends mongoose.Document {
  categoryName: string;
}

interface ICategoryModel extends mongoose.Model<ICategoryDoc> {
  build(attributes: ICategory): ICategoryDoc;
}

categorySchema.statics.build = (attributes: ICategory) => {
  return new Category(attributes);
};

const Category = mongoose.model<ICategoryDoc, ICategoryModel>(
  "Category",
  categorySchema
);
