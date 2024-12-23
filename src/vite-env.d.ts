/// <reference types="vite/client" />
// filepath: /C:/Users/lando/Desktop/WorkSpace/finance-app/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
});