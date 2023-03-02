import { config } from "dotenv";
config({ path: "./.env" });

// todo:  refactor to be more DRY
//        store keys in array, and generate and export an object and assertion functions

export const PORT = process.env.PORT;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
export const DB_NAME = process.env.DB_NAME;

export function AssetEnvironment() {
  if (!PORT) throw new Error("`PORT` is not defined");
  if (!DB_CONNECTION_STRING)
    throw new Error("`DB_CONNECTION_STRING` is not defined");
  if (!DB_NAME) throw new Error("`DB_NAME` is not defined");
}
