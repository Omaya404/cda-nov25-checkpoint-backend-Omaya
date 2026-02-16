import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const env = {
  PORT: parseInt(process.env.PORT || "4001", 10),
  DB_NAME: path.join(process.cwd(), process.env.DB_NAME || "db.sqlite"),
};

export default env;
