import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    paths: {
			assets: process.env.NODE_ENV === 'production'
				? '/calendrier-apres/'
				: '/'
    }
  }
};

export default config;
