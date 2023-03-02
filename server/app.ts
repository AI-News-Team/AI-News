import express from "express";
import { EXIT_ERROR, EXIT_SUCCESS } from "./constant/code";
import { connectClient, disconnectClient } from "./database";
import { PORT, AssetEnvironment } from "./environment";
import route from "./route";

AssetEnvironment(); // Check if all environment variables are defined

connectClient(); // Connect to the database

const instance = express();
instance.use(express.json());
instance.use(express.urlencoded({ extended: true }));
instance.use("/", route);

const server = instance.listen(PORT, () => {
  console.log(`${PORT} Online 🚀`);
});

process.on("uncaughtException", uncaughtException);
function uncaughtException(err: Error) {
  console.error(err);
  process.exit(EXIT_ERROR);
}

process.on("SIGINT", terminate); // on Ctrl+C
process.on("SIGTERM", terminate); // on `kill`
function terminate() {
  server.close(() => {
    disconnectClient();
    console.log(`${PORT} Offline!`);
    process.exit(EXIT_SUCCESS);
  });
}
