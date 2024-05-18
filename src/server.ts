import http from "http";
import dbConnect from "./config/dbConnect/db.connect";
import app from "./app";

require("dotenv").config();

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
