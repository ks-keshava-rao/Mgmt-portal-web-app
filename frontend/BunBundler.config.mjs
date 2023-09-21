import * as compressBuild from 'esbuild-plugin-compress';
import gzipPlugin from '@luncheon/esbuild-plugin-gzip'
await Bun.build({
    entrypoints: ['./src/index.js'],
    minify: true,
    bundle: true,
    write:false,
    plugins: [
      compressBuild.compress({
          outputDir:'distBun'
      })]
    // plugins:[gzipPlugin()]
  })
