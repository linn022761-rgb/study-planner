import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	// server: {
	// 	proxy: {
	// 		'/api/v1': {
	// 			target: 'https://practice-latest.onrender.com/api/v1',
	// 			changeOrigin: true,
	// 			secure: true,
	// 		},
	// 	},
	// },
	plugins: [react(), tailwindcss(), mkcert()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
