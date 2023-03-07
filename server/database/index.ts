import { Client, ClientConfig } from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, EXPRESS_PORT } from '../environment';
import { EXIT_ERROR } from '../constant/code';

const config: ClientConfig = {
	// connectionString: DB_CONNECTION_STRING,
	host: DB_HOST,
	port: DB_PORT,
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
	} else console.log(`${EXPRESS_PORT} 🔌 Connected to Postgres running on '${DB_HOST}:${DB_PORT}'`);
}
