import express from 'express';
import { EXIT_ERROR, EXIT_SUCCESS } from './constant/code';
import { connectClient, disconnectClient } from './database';
import cors from 'cors';
import { EXPRESS_PORT } from './environment';
import { articleRouter, useRouter } from './route';

connectClient(); // Connect to the database

const instance = express();
instance.use(cors());
instance.use(express.json({ limit: '50mb' }));
instance.use(express.urlencoded({ extended: true }));

useRouter(instance, '/', articleRouter);

const server = instance.listen(EXPRESS_PORT, () => {
console.log(`${EXPRESS_PORT} 🚀 Online`);
});

process.on('uncaughtException', uncaughtException);
function uncaughtException(err: Error) {
	console.error(err);
	process.exit(EXIT_ERROR);
}

process.on('SIGINT', terminate); // on Ctrl+C
process.on('SIGTERM', terminate); // on `kill`
function terminate() {
	server.close(() => {
		disconnectClient();
		console.log(`${EXPRESS_PORT} Offline!`);
		process.exit(EXIT_SUCCESS);
	});
}
