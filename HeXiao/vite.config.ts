import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import visualizer from 'rollup-plugin-visualizer'

import path from 'path'

const projectRootDir = path.resolve(__dirname)

// export const PROXY_MAGIC_URL = 'http://116.62.21.132:8677'
// export const PROXY_MAGIC_URL = 'http://192.168.31.106:5000'
// export const PROXY_MAGIC_URL = 'http://localhost:5000'
export const PROXY_MAGIC_URL = 'https://approvalsale.nbxuanma.com'

export const PROXY_QINIU_API_URL = 'http://124.71.130.192:7000'

export const isProduction = process.env.NODE_ENV === 'production'

const proxy = {
  '/api/Qiniu': {
    target: PROXY_QINIU_API_URL
  },
  '^/api/magic/.*': {
    target: PROXY_MAGIC_URL,   
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/magic/, '')
  }
}

// 编译插件
const buildPlugins = isProduction
  ? [
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    })
  ]
  : []

// https://vitejs.dev/config/
export default defineConfig({
  mode: isProduction ? 'production': 'development',
  build: {
    cssCodeSplit: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          clipboard: ['clipboard'],   
          normalizeCss: ['normalize.css'],   
          screenfull: ['screenfull']
        }
      },
      plugins: [
        ...buildPlugins
      ]
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/frame/styles/mixin.scss";`
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: proxy,
    cors: true
  },
  resolve: {
    alias: [
      {
        find: 'public',
        replacement: path.resolve(projectRootDir, 'public')
      },
      {
        find: '@',
        replacement: path.resolve(projectRootDir, 'src')
      },
      {
        find: '@libUtils',
        replacement: path.resolve(projectRootDir, 'src/frame/utils')
      },
      {
        find: '@libComponents',
        replacement: path.resolve(projectRootDir, 'src/frame/components/normal')
      }
    ]
  },
  plugins: [
    vue(), 
    vueJsx()
  ]
})
