import mongoose from "mongoose";
import { Password } from "../services/passwordHashing";

interface IAttributes {
  email: string;
  password: string;
  companyInfo: boolean;
}

interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
  companyInfo: boolean;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attributes: IAttributes): IUserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyInfo: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attributes: IAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { User };
