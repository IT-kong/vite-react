import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react({
        // 优化：开启Fast Refresh（热更新），解决React组件热更新失效问题
        fastRefresh: true,
        // 可选：配置Babel（如需兼容旧浏览器）
        babel: {
          plugins: mode === 'development' ? ['babel-plugin-styled-components'] : []
        }
      })
    ],
    // 1. 路径别名：解决React项目中"../../"的层级问题
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@utils': path.resolve(__dirname, './src/utils')
      }
    },
    // 2. 开发服务器配置（解决跨域和热更新）
    server: {
      port: 3000, // React常用3000端口，与React官方脚手架保持一致
      open: true,
      proxy: {
        // 代理API请求（例如后端接口在http://localhost:4000）
        [env.VITE_API_BASE]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_BASE}`), '')
        }
      }
    },
    // 3. 生产环境构建优化
    build: {
      outDir: 'build', // React习惯用build作为输出目录（替代dist）
      sourcemap: mode === 'production' ? false : 'inline', // 生产环境不生成sourcemap
      // 分割代码：将node_modules依赖单独打包
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'], // 第三方库单独打包
            utils: ['lodash', 'axios'] // 工具库单独打包
          }
        }
      }
    }
  }
})
