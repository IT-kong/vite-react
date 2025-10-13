module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  // 解析React的JSX/TSX
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true // 允许解析JSX
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // React核心规则
    'plugin:react-hooks/recommended', // Hook规则（如依赖项检查）
    'plugin:@typescript-eslint/recommended', // TS规则
    'plugin:prettier/recommended' // 整合Prettier
  ],
  settings: {
    react: {
      version: 'detect' // 自动检测React版本
    }
  },
  rules: {
    // React项目常用规则
    'react/react-in-jsx-scope': 'off', // React 17+无需在JSX中导入React
    'react/prop-types': 'off', // 用TS类型替代prop-types
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }], // 仅允许在.tsx/.jsx中写JSX
    'react-hooks/rules-of-hooks': 'error', // 强制遵循Hook规则（如只能在函数组件中使用）
    'react-hooks/exhaustive-deps': 'warn', // Hook依赖项检查（警告级别，避免过度严格）
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 允许函数返回值类型推断（新手友好）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
