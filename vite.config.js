import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  build: {
    outDir: "docs/",
    emptyOutDir: true,
  },
  plugins: [vue()],
});
