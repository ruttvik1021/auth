import express from "express";
import { SignInApiRoute } from "./routers/signin/signin";
import { SignUpApiRoute } from "./routers/signup/signup";
import { errorHandler } from "./middlewares/error-handlers";
import mongoose from "mongoose";
import { GetCurrentUserRoute } from "./routers/getcurrentUser/getCurrentUser";
import { UpdateCurrentUserRoute } from "./routers/updatecurrentUser/updateCurrentUser";
import { CompleteProfileRoute } from "./routers/completeProfile/completeProfile";
import { CountryListRoute } from "./routers/countryList/countryList";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
const PORT = 3001;

app.use(SignInApiRoute);
app.use(SignUpApiRoute);
app.use(GetCurrentUserRoute);
app.use(UpdateCurrentUserRoute);
app.use(CompleteProfileRoute);
app.use(CountryListRoute);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rkhollam21:Aad8JbZdn59A00lN@inventory.djfmbpy.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.error(error);
  }
};
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

start();
