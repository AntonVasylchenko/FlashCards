import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import clean from "vite-plugin-clean";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    clean({
      targetFiles: ["../backend/client"],
    }),
  ],
  build: {
    outDir: "../backend/client",
    watch: {
      exclude: "node_modules/**",
    },
  },
});
