import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'url';

// Element plus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode }) => {
    const env = process.env.VITE_ENV || mode;
    process.env = { ...process.env, ...loadEnv(env, process.cwd()) };

    return defineConfig({
        base: process.env.VITE_BASE_URL,
        plugins: [
            vue(),
            AutoImport({
                dts: false,
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                dts: false,
                resolvers: [ElementPlusResolver()],
            }),
            ElementPlus({
                useSource: true,
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "./src/assets/css/variable" as *;',
                },
            },
        },
    });
};
