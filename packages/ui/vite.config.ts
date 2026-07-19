import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GlatamCalendar',
      fileName: (format) => `glatam-calendar.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'lit',
        'lit/decorators.js',
        'lit/directives/class-map.js',
        'lit/directives/style-map.js',
        '@glatam/calendar-core',
      ],
      output: {
        globals: {
          lit: 'Lit',
          '@glatam/calendar-core': 'GlatamCalendarCore',
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
});
