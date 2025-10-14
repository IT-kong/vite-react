import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';

// 按需加载页面组件
const KnowledgeBasePage = React.lazy(() => import('@/pages/KnowledgeBasePage'));

// 创建路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <KnowledgeBasePage />
          </React.Suspense>
        ),
      },
      // 可以在这里添加更多路由
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}