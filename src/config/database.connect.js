import mongoose from "mongoose";

async function mongooseConnect(){
   await mongoose.connect(process.env.MONGO_URI);
   console.log("Connected to database");
}

export default  mongooseConnect;

