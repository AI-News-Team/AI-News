import { Client, ClientConfig } from 'pg';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER, API_PORT } from '../environment';
import { EXIT_ERROR } from '../constant/code';

const config: ClientConfig = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
};

const MAX_CONNECTION_ATTEMPTS = 16;
const CONNECTION_ATTEMPT_INTERVAL_MS = 1024;

export function connectClient() {
  attemptConnection({
    onAttempt(attempt) {
      console.log(`${API_PORT} 📡 Attempting connection...`);
    },
    onMaxConnections({ name, message, stack }) {
      console.error(`${API_PORT} 📡 Failed to connect after ${MAX_CONNECTION_ATTEMPTS} attempts`);
      console.error(`${API_PORT} 📜 Unhandled '${name}'`);
      console.error(`       Message: '${message}'`);
      console.error(`       Stacktrace: '${stack}'`);
      process.exit(EXIT_ERROR);
    },
    onSuccess() {
      console.log(`${API_PORT} 🔌 Connected to Postgres running on '${DATABASE_HOST}:${DATABASE_PORT}'`);
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
  if (!client) throw new Error('No client');
  return client;
}

export function disconnectClient() {
  attempts.at(-1)?.end();
}
