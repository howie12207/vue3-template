import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { fileURLToPath, URL } from 'url';

// Element plus
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus({
            importStyle: 'SCSS',
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
