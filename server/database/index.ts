import { Client, ClientConfig } from "pg";
import {
  EXPRESS_PORT,
  // DB_CONNECTION_STRING,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
} from "../environment";
import { DB_HOST, DB_NAME } from "../environment/index";
import { EXIT_ERROR } from "../constant/code";

const config: ClientConfig = {
  // connectionString: DB_CONNECTION_STRING,
  host: DB_HOST,
  port: DB_PORT as number | undefined,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
};
export const client = new Client(config);

export function connectClient() {
  client.connect(handleError);
}
export function disconnectClient() {
  client.end();
}

function handleError(err: Error) {
  if (err) {
    const { name, message, stack } = err;
    console.error(`Unhandled '${name}'`);
    console.error(`Message: '${message}'`);
    console.error(`Stacktrace: '${stack}'`);
    process.exit(EXIT_ERROR);
  } else
    console.log(
      `${EXPRESS_PORT} 🔌 Connected to Postgres running on '${DB_HOST}:${DB_PORT}'`
    );
}
