import { join } from 'path';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { sass } from 'svelte-preprocess-sass';

export default {
  input: './src/main.js',
  plugins: [
    resolve(),
    svelte({
      css: css => css.write('out/styles.css'),
      preprocess: {
        style: sass(
          {
            includePaths: [
              // Allow imports from 'src/styles/overrides'
              './src/styles/overrides',

              // Allow imports from 'node_modules'
              join(__dirname, 'node_modules'),
            ],
          },
          { name: 'scss' }
        ),
      },
    }),
  ],
  output: {
    dir: './out',
  },
  watch: {
    clearScreen: false,
  },
};
