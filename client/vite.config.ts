/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		minify: 'terser',
		target: 'modules',
		outDir: 'dist',
	},
	test: {
		globals: true,
		environment: 'jsdom',
		css: true,
		setupFiles: './src/test/setup.ts'
	}
});
