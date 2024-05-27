import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";

const env = loadEnv("", process.cwd());

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build:{
    outDir:"dist/",
    rollupOptions:{
        output:{
            manualChunks:undefined,
            assetFileNames:"static/css/[name].[ext]",
            entryFileNames:"static/js/[name].js",
        }
    },

  },

  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utiles": path.resolve(__dirname, "src/utiles"),
      "@config": path.resolve(__dirname, "src/config"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@mock": path.resolve(__dirname, "src/utils/mock"),
      "@themes": path.resolve(__dirname, "src/utils/themes"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
});
