import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: './postcss.config.js',
	},
	base: process.env.NODE_ENV === 'production' ? '/eivilux-calendrier-apres/' : '/',
});
