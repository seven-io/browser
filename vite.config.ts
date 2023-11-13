import webExtension from '@samrum/vite-plugin-web-extension'
import react from '@vitejs/plugin-react'
import assert from 'node:assert'
import path from 'node:path'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {getManifest} from './src/manifest'

export default defineConfig(() => { // https://vitejs.dev/config/
    const {BROWSER_TYPE} = process.env
    assert.ok(BROWSER_TYPE)

    return {
        build: {
            outDir: `dist/${BROWSER_TYPE}`,
        },
        plugins: [
            react(),
            tsconfigPaths(),
            webExtension({
                manifest: getManifest(BROWSER_TYPE),
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    }
})
