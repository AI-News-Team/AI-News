import { Client } from "pg";
import { PORT, DB_CONNECTION_STRING } from "../environment";

export const client = new Client({
  connectionString: DB_CONNECTION_STRING,
});

export function connectClient() {
  client.connect(handleError);
}
export function disconnectClient() {
  client.end();
}

function handleError(err: Error) {
  if (err) console.error(err.stack);
  else console.log(`${PORT} Connected 🔌`);
}
