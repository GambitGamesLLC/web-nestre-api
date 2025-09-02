import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({

  // Add this server block to configure the development server.
  server: {
    port: 8100, // This is the port you want Vite to use.
  },

  root: resolve(__dirname, 'examples'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        'basic-profile': resolve(__dirname, 'examples/user/basic-profile/index.html'),
        'full-profile': resolve(__dirname, 'examples/user/full-profile/index.html'),
        'basic-profile-by-email': resolve(__dirname, 'examples/user/basic-profile-by-email/index.html')
      },
    },
  },
});