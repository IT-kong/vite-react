import React from 'react';
import KnowledgeBase from '@/components/KnowledgeBase';

// 自定义目录数据（可从接口请求，替换默认示例）
const customDocTree = [
  { id: 'intro', title: '项目介绍', order: 1 },
  { id: 'cicd-flow', title: 'CI/CD 流程', order: 2 },
  { id: 'wsl-setup', title: 'WSL 环境配置', order: 3 },
  { id: 'nginx-deploy', title: 'Nginx 部署指南', order: 4 },
  { id: 'docker-basic', title: 'Docker 基础操作', parentId: 'cicd-flow', order: 2.1 },
  { id: 'gitlab-ci', title: 'GitLab CI 配置', parentId: 'cicd-flow', order: 2.2 },
];

const KnowledgeBasePage: React.FC = () => {
  return (
    <div>
      {/* 可添加页面标题、权限控制等 */}
      <KnowledgeBase
        docTree={customDocTree} // 自定义目录
        defaultDocId='intro' // 初始显示的文档
        docBasePath='/docs/' // Markdown 文档路径（public/docs/）
      />
    </div>
  );
};

export default KnowledgeBasePage;
