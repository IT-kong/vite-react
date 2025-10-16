# Copilot Instructions for vite-learn/my-react-project

## 项目架构与主要目录

- **基于 Vite + React + TypeScript**，采用 HMR 热更新，TailwindCSS 支持。
- 主要目录结构：
  - `src/`：主应用代码，包括：
    - `components/`：通用组件（如 `LoadingSpinner.tsx`、`KnowledgeBase/`）
    - `layouts/`：布局组件（如 `RootLayout.tsx`）
    - `pages/`：页面级组件（如 `Counter.tsx`、`KnowledgeBasePage/`）
    - `router/`：路由配置（如 `index.tsx`）
    - `assets/`：静态资源
  - `public/`：静态文件与文档（如 `docs/` 存放项目相关 markdown 文档）
  - `run/`：运行相关脚本或产物（如有）

## 关键开发流程

- **启动开发环境**：
  ```shell
  npm run dev
  ```
- **构建生产包**：
  ```shell
  npm run build
  ```
- **预览生产包**：
  ```shell
  npm run preview
  ```
- **Lint 检查**：
  ```shell
  npm run lint
  ```
- **Tailwind 配置**：见 `tailwind.config.js`，全局样式在 `src/index.css`。

## 约定与模式

- **页面与组件分离**：页面放在 `src/pages/`，通用组件放在 `src/components/`，布局放在 `src/layouts/`。
- **样式**：优先使用 TailwindCSS，部分组件（如 `KnowledgeBase`）可用 less/scss 局部样式。
- **路由**：集中管理于 `src/router/index.tsx`，页面组件按需引入。
- **文档**：所有项目相关文档统一放在 `public/docs/`，便于查阅。

## 外部依赖与集成

- **Vite 插件**：主要用 `@vitejs/plugin-react`，可根据需要扩展。
- **ESLint**：配置见 `eslint.config.js`，推荐启用 type-aware 规则（见 `README.md` 建议）。
- **TypeScript 配置**：多 tsconfig 文件，分别针对 node、app、全局。
- **Netlify 部署**：有 `netlify.toml`，支持一键部署。
- **Docker 支持**：有 `dockerfile`，可容器化部署。

## 典型代码模式示例

- **组件导入**：
  ```tsx
  import LoadingSpinner from '../components/LoadingSpinner';
  ```
- **页面注册路由**：
  ```tsx
  // src/router/index.tsx
  import Counter from '../pages/Counter';
  ```
- **样式引用**：
  ```tsx
  import '../index.css'; // 全局
  import './index.less'; // 局部
  ```

## 参考文件

- `README.md`：开发、Lint、ESLint 配置建议
- `tailwind.config.js`、`postcss.config.js`：样式体系
- `vite.config.ts`：Vite 相关配置
- `tsconfig*.json`：TypeScript 配置
- `netlify.toml`、`dockerfile`：部署相关

---

如需补充项目约定或遇到不明确的结构/流程，请在此文档下方补充说明。
