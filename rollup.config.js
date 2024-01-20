import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { getComponentsFolders } from './scripts/buildUtils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');

const commonPlugins = [
  replace({
	preventAssignment: true,
    __IS_DEV__: process.env.NODE_ENV === 'development',
  }),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
];

// Returns rollup configuration for a given component
function component(commonPlugins, folder) {
  console.log( `dist/${folder}/`);
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: 'named',
        format: 'esm',
        banner: `'use client';`,
      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: 'named',
        format: 'cjs',
        banner: `'use client';`,
      }
    ],
    plugins: [
      ...commonPlugins,
      postcss({extensions: ['.scss'], extract: `style/${folder}.scss`}),
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/${folder}`,
          private: true,
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/${folder}/`
      }),
    ],
    // Don't bundle node_modules, ../TaiContext and .scss files.

    // Because if relative import ../TaiContext bundles, component cannot share common
    // context, they creates new context every time. Main logic is that context shoul provided
    // consumer application and all components subscribe this context and its changes.
    //
    // extension .scss$/ protect to relative .scss imports in source file. And, style files copies 
    // same directory in budled dist directory like library directory. Thank to it, source files successfully imports
    // the style files after bundles. 
    // There are may solutions to apply styles to components wtih bundle like injectcss. I prefer this solution.
    external: [/node_modules/, /\.\.\/MyContext/, /\.scss$/],
  };
}

export default [

  // Build all components in ./src/*
  ...getComponentsFolders('./src').map((folder) => component(commonPlugins, folder)),

  // Build the main file
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
      }
    ],
    plugins: [
      ...commonPlugins,
      // copy style folder directly to dist
      copy({
        targets: [
          {src: 'src/style', dest: 'dist/'}
        ]
      }),
    ],
    // Also TaiContext must added here, because all library files content bundles inside the 
    // index.cjs and index.esm.js and this external ensures stays relative import the same. It prevent 
    // to create new context in the index.js files in the dist/ directory. If this external not added,
    // MyButton from 'mylibrary/MyButton' and {MyButton} from 'mylibrary' subscribe different context. 
    external: [/node_modules/, /\.\.\/MyContext/, /\.scss$/],
  },
];
