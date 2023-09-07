import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig(({ mode }) => {
  console.log(mode)
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '~@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `@import "src/styles/global.scss";`,
        },
      },
    },
    base: mode === 'production' ? './' : '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    build: {
      commonjsOptions: {
        esmExternals: true,
      },
    },

    server: {
      port: 1888,
      proxy: {},
      hmr: {
        overlay: false,
      },
      host: '0.0.0.0',
      open: false,
      https: false,
    },
  }
})
