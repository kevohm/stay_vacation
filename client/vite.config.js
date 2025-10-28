import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    macrosPlugin(),
  ],
  define: {
    "process.env": {}, // This is helpful for “process is not defined” errors
  },
});
