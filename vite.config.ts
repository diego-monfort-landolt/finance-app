import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:'https://diego-monfort-landolt.github.io/finance-app/',
});