import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      {/* 全局头部可以放在这里 */}
      <header></header>
      
      {/* 页面内容出口 */}
      <main>
        <Outlet />
      </main>
      
      {/* 全局底部可以放在这里 */}
      <footer></footer>
    </div>
  );
}