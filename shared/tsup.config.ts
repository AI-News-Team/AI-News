import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],   // Builds for commonJS and ESmodules
  dts: true,                // Generates declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
