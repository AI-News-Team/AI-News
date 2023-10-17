import express from 'express';
import { EXIT_ERROR, EXIT_SUCCESS } from './constant/code';
import { connectClient, disconnectClient } from './database';
import cors from 'cors';
import { API_PORT } from './environment';
import { useRouter } from './route';

import article from './route/Article';
import category from './route/Category/category';

import authRoute from './middleware/protectedRoutes';

connectClient(); // Connect to the database

const instance = express();

instance.use(cors({ origin: '*', }));
instance.use(express.json({ limit: '50mb' }));
instance.use(express.urlencoded({ extended: true }));

useRouter(instance, article, true);
useRouter(instance, category, true);

const server = instance.listen(API_PORT, () => {
  console.log(`${API_PORT} 🚀 Online`);
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
    console.log(`${API_PORT} Offline!`);
    process.exit(EXIT_SUCCESS);
  });
}
