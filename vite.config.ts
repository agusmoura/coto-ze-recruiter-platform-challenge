import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svgr({
      include: "**/*.svg?react",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core separado
          if (
            id.includes("react") ||
            id.includes("react-dom") ||
            id.includes("jsx-runtime")
          ) {
            return "react-vendor";
          }
          // Framer Motion separado (es pesado ~100KB)
          if (id.includes("framer-motion")) {
            return "framer-motion";
          }
          // React Router separado
          if (id.includes("react-router-dom")) {
            return "react-router";
          }
          // React Query separado
          if (id.includes("@tanstack/react-query")) {
            return "react-query";
          }
          // React Hook Form y validaciones
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform/resolvers") ||
            id.includes("zod")
          ) {
            return "forms";
          }
          // Iconos (Lucide puede ser pesado)
          if (id.includes("lucide-react")) {
            return "icons";
          }
        },
      },
    },
    // Aumentar el límite para no mostrar warnings innecesarios
    chunkSizeWarningLimit: 600,
  },
});
