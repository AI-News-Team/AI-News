import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const port = parseInt(process.env.VITE_CLIENT_PORT);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port },
});
