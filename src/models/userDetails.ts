import mongoose from "mongoose";

interface IUserDetailsSchema {
  email: string;
  name: string;
  organizationLogo: string;
  organizationName: string;
  industryId: string;
  organizationId: string;
  profileCompleted: boolean;
  termAccepted: boolean;
  mobileNumber: string;
  aboutus?: string;
  address: string;
}

export interface IUserDetailsDoc extends mongoose.Document {
  email: string;
  name: string;
  organizationLogo: string;
  organizationName: string;
  industryId: string;
  organizationId: string;
  profileCompleted: boolean;
  termAccepted: boolean;
  mobileNumber: string;
  aboutus?: string;
  address: string;
}

interface IUserDetailsModel extends mongoose.Model<IUserDetailsDoc> {
  build(attributes: IUserDetailsSchema): IUserDetailsDoc;
}

const userDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  organizationLogo: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  industryId: {
    type: String,
  },
  organizationId: {
    type: String,
  },
  profileCompleted: {
    type: Boolean,
  },
  termAccepted: {
    type: Boolean,
  },
  mobileNumber: {
    type: String,
  },
  aboutus: {
    type: String,
  },
  address: {
    type: String,
  },
});

userDetailsSchema.statics.build = (attributes: IUserDetailsSchema) => {
  return new UserDetails(attributes);
};

const UserDetails = mongoose.model<IUserDetailsDoc, IUserDetailsModel>(
  "UserDetails",
  userDetailsSchema
);

export { UserDetails };
