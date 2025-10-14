import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        // 代理配置（如果有）
      },
    },
    build: {
      outDir: 'dist', // 确保此处是 `dist`（Vite 默认值，若未修改可忽略）
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
            if (id.includes('@utils')) return 'utils';
            return 'main';
          },
        },
      },
    },
    plugins: [
      react({
        include: 'src/**/*.{js,jsx,ts,tsx}',
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // 可以在这里覆盖 Ant Design 的默认变量
            // '@primary-color': '#1DA57A',
          },
        },
      },
    },
  };
});
