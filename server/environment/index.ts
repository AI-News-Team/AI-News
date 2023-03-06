import { config } from "dotenv";
config({ path: "./.env" });

// todo:  refactor to be more DRY
//        store keys in array, and generate and export an object and assertion functions

export const EXPRESS_PORT = process.env.EXPRESS_PORT;
//export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

export const DB_USER = process.env.DB_USER;
export const DB_PORT = process.env.DB_PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export function AssetEnvironment() {
  if (!EXPRESS_PORT) throw new Error("`EXPRESS_PORT` is not defined");
  //if (!DB_CONNECTION_STRING)
    //throw new Error("`DB_CONNECTION_STRING` is not defined");
  if (!DB_NAME) throw new Error("`DB_NAME` is not defined");
  if (!DB_HOST) throw new Error("`DB_HOST` is not defined");
  if (!DB_PASSWORD) throw new Error("`DB_PASSWORD` is not defined");
  if (!DB_PORT) throw new Error("`DB_PORT` is not defined");
}
