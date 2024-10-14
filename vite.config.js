import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/metal-wallet-frontend/",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	define: {
		// API_BASE_URL: JSON.stringify("http://localhost:8080/api"),
		API_BASE_URL: JSON.stringify(
			"https://bf87-121-130-103-204.ngrok-free.app/api"
		),
	},
});
