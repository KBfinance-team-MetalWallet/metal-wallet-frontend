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
		API_BASE_URL: JSON.stringify(process.env.VITE_API_BASE_URL),
	},
});
