import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

dotenv.config({ path: "../local.env" }) // todo: refactor this to check for containerized builds, then use the `virtual.env` file instead
const port = parseInt(process.env.VITE_CLIENT_PORT) ?? 3000;
if (!port) throw new Error("Failed to find VITE_CLIENT_PORT environment variable");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir:"../local.env",
  server: { port },
});
