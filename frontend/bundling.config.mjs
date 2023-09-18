import * as esbuild from 'esbuild'
import { performance } from 'perf_hooks';
import * as compressBuild from 'esbuild-plugin-compress';
import gzipPlugin from '@luncheon/esbuild-plugin-gzip'
async function buildreactapp() {
    const start = performance.now();
    try {
        //     const buildOptions = {
        //         entryPoints: ['./src/index.js'],
        //         bundle: true,
        //         minify: true,
        //         outfile: 'out.js',
        //         loader: { '.js': 'jsx' },
        //     }
        //     const compressOptions = {
        //         ...buildOptions,
        //         write: false,
        //         plugins: [
        //             compressBuild.compress({
        //                 outputDir:'dist'
        //             })
        //         ]
        //     }
        //     await esbuild.build(buildOptions);
        //     await esbuild.build(compressOptions);

        esbuild.build({
            entryPoints: ['./src/index.js'],
            outdir: 'dist',
            bundle: true,
            minify: true,
            loader: { '.js': 'jsx' },
            write: false, 
            plugins: [gzipPlugin()],
        })
        const end = performance.now();
        const durationMs = end - start;
        console.log(durationMs);
    }
    catch (e) {
        console.log(e)
    }
}
buildreactapp();