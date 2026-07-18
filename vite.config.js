import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Rutas relativas: así funciona tanto en username.github.io/nombre-del-repo/
  // como en cualquier otro hosting estático, sin tener que hardcodear el nombre del repo.
  base: "./",
});
