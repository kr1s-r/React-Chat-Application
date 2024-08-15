import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor dependencies into a separate chunk
          if (id.includes("node_modules")) {
            return "vendor";
          }
          // Add additional chunking rules as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the limit as needed
  },
  plugins: [react()],
});
