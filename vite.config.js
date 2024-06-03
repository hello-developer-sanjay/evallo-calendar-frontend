import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fullcalendar/daygrid': '@fullcalendar/daygrid/main',
      '@fullcalendar/interaction': '@fullcalendar/interaction/main',
    },
  },
});
