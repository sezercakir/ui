// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

const commonPlugins = [
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.ts'],
  }),
  postcss({ extensions: ['.css'], inject: true, extract: false }),
];

export default [
  // Button Component
  {
    input: 'src/Button/index.ts',
    output: [
      {
        file: 'dist/Button/index.esm.js',
        exports: 'named',
        format: 'esm',
        banner: `'use client';`,
      },
      {
        file: 'dist/Button/index.cjs.js',
        exports: 'named',
        format: 'cjs',
        banner: `'use client';`,
      },
    ],
    plugins: commonPlugins,
    external: [/node_modules/],
  },

  // Text Component
  {
    input: 'src/Text/index.ts',
    output: [
      {
        file: 'dist/Text/index.esm.js',
        exports: 'named',
        format: 'esm',
        banner: `'use client';`,
      },
      {
        file: 'dist/Text/index.cjs.js',
        exports: 'named',
        format: 'cjs',
        banner: `'use client';`,
      },
    ],
    plugins: commonPlugins,
    external: [/node_modules/],
  },

  // Main Entry Point
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        exports: 'named',
        format: 'esm',
        banner: `'use client';`,
      },
      {
        file: 'dist/index.cjs.js',
        exports: 'named',
        format: 'cjs',
        banner: `'use client';`,
      },
    ],
    plugins: commonPlugins,
    external: [/node_modules/],
  },

  // Declaration files
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
