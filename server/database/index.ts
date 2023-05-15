import { Client, ClientConfig } from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, EXPRESS_PORT } from '../environment';
import { EXIT_ERROR } from '../constant/code';

const config: ClientConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
};

const MAX_CONNECTION_ATTEMPTS = 8;
const CONNECTION_ATTEMPT_INTERVAL_MS = 1024;

export function connectClient() {
  attemptConnection({
    onAttempt(attempt) {
      console.log(`${EXPRESS_PORT} 📡 Attempting connection...`);
    },
    onMaxConnections({ name, message, stack }) {
      console.error(`${EXPRESS_PORT} 📡 Failed to connect after ${MAX_CONNECTION_ATTEMPTS} attempts`);
      console.error(`${EXPRESS_PORT} 📜 Unhandled '${name}'`);
      console.error(`       Message: '${message}'`);
      console.error(`       Stacktrace: '${stack}'`);
      process.exit(EXIT_ERROR);
    },
    onSuccess() {
      console.log(`${EXPRESS_PORT} 🔌 Connected to Postgres running on '${DB_HOST}:${DB_PORT}'`);
    },
  });
}

const attempts: Client[] = [];
export type ConnectionAttemptParam = {
  onAttempt?: (attempt: number) => void;
  onSuccess?: () => void;
  onMaxConnections?: (error: Error) => void;
  attempt?: number;
};
function attemptConnection(opts: ConnectionAttemptParam) {
  const { onAttempt, onSuccess, onMaxConnections = console.error, attempt = 1 } = opts;
  setTimeout(() => {
    const client = new Client(config);
    attempts.push(client);
    client.connect(err => {
      if (err) {
        if (attempt < MAX_CONNECTION_ATTEMPTS) {
          onAttempt?.(attempt);
          attemptConnection({ ...opts, attempt: attempt + 1 });
        } else onMaxConnections(err);
      } else onSuccess?.();
    });
  }, CONNECTION_ATTEMPT_INTERVAL_MS);
}

export function getClient() {
  if (attempts.length === 0) throw new Error('No client attempts'); // attempted to get a client before connecting
  const client = attempts.at(-1); // get the last client attempt
  if (!client) throw new Error('No client'); // no
  return client;
}

export function disconnectClient() {
  attempts.at(-1)?.end();
}
