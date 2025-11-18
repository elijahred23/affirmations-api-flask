import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../static",   // build directly into backend /static folder
    emptyOutDir: true
  }
});
