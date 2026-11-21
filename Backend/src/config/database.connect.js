import mongoose from "mongoose";
import userModel from "../models/user.model.js";

async function mongooseConnect(){
   await mongoose.connect(process.env.MONGO_URI);
   await userModel.collection.createIndex(
      { unverifiedExpiresAt: 1 },
      { expireAfterSeconds: 0 }
   );
   console.log("Connected to database");
}

export default  mongooseConnect;
