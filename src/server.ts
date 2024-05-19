import http from "http";
import dbConnect from "../src/app/config/dbConnect/db.connect";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(app);

const port: string | number = process.env.PORT || 5000;
const main = async () => {
  try {
    await dbConnect();
    server.listen(port, async () => {
      console.log(`Db Running  ${port}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
