import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger"; // Comentado temporalmente por error ESM

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react()], // componentTagger() removido temporalmente
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
