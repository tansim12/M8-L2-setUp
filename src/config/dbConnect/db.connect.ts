import mongoose from "mongoose";
import dotEnv from 'dotenv';

dotEnv.config();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.qmivnkm.mongodb.net/?retryWrites=true&w=majority`;

const dbConnect = async () => {
  await mongoose.connect(uri, { dbName: "contestPlatform" }).then(() => {
    console.log("connect by C5 mongoose");
  });
};

export default dbConnect;
