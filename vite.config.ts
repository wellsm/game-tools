import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Banqueiro Imobiliario",
        short_name: "BancoImob",
        description: "Jogue Banco Imobiliário com mais facilidade",
        theme_color: "#33333",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: ["0d14-179-116-2-15.ngrok-free.app"],
  },
});
