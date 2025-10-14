import React, { useState, useEffect, useCallback } from 'react';
import { Button, ConfigProvider, Input, Layout, Spin, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Sider, Content } = Layout;
const { Title } = Typography;

ConfigProvider.config({
  prefixCls: 'ant',
  iconPrefixCls: 'anticon',
});

interface DocItem {
  id: string;
  title: string;
  parentId?: string;
  order: number;
}

interface KnowledgeBaseProps {
  docTree?: DocItem[];
  docBasePath?: string;
  defaultDocId?: string;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  docTree = [
    { id: 'intro', title: '项目介绍', order: 1 },
    { id: 'cicd-flow', title: 'CI/CD 流程', order: 2 },
    { id: 'wsl-setup', title: 'WSL 环境配置', order: 3 },
    { id: 'nginx-deploy', title: 'Nginx 部署指南', order: 4 },
    { id: 'docker-basic', title: 'Docker 基础操作', parentId: 'cicd-flow', order: 2.1 },
    { id: 'gitlab-ci', title: 'GitLab CI 配置', parentId: 'cicd-flow', order: 2.2 },
  ],
  docBasePath = '/docs/',
  defaultDocId = 'intro',
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(defaultDocId);
  const [docContent, setDocContent] = useState<string>('加载中...');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filteredDocTree, setFilteredDocTree] = useState<DocItem[]>(docTree);
  const [loading, setLoading] = useState<boolean>(true);

  const loadDoc = useCallback(
    async (docId: string) => {
      setLoading(true);
      try {
        const response = await fetch(`${docBasePath}${docId}.md`);
        if (!response.ok) throw new Error('文档不存在');
        const content = await response.text();
        setDocContent(content);
        setActiveDocId(docId);
      } catch (err) {
        setDocContent(`# 文档加载失败\n\n原因：${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    },
    [docBasePath]
  );

  useEffect(() => {
    loadDoc(defaultDocId);
  }, [defaultDocId, loadDoc]);

  useEffect(() => {
    if (!searchKeyword.trim()) {
      setFilteredDocTree(docTree);
      return;
    }
    const filtered = docTree.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredDocTree(filtered);
    if (filtered.length === 1) {
      loadDoc(filtered[0].id);
    }
  }, [searchKeyword, docTree, loadDoc]);

  // 替换原有的 renderDocTree 函数和相关样式
  const renderDocTree = (parentId?: string, depth: number = 0) => {
    const children = filteredDocTree
      .filter((item) => item.parentId === parentId)
      .sort((a, b) => a.order - b.order);

    if (children.length === 0) return null;

    return (
      <div
        style={{
          paddingLeft: depth > 0 ? 16 : 0,
          borderLeft: depth > 0 ? '1px dashed #d9d9d9' : 'none',
          marginLeft: depth > 0 ? 8 : 0,
        }}>
        {children.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: 4,
              position: 'relative',
            }}>
            {/* 连接线点 */}
            {depth > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 4,
                  height: 4,
                  backgroundColor: '#1890ff',
                  borderRadius: '50%',
                }}
              />
            )}

            <Button
              type={activeDocId === item.id ? 'primary' : 'text'}
              onClick={() => loadDoc(item.id)}
              size='small'
              block
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                paddingLeft: 12,
                paddingRight: 12,
                height: 'auto',
                minHeight: 32,
                whiteSpace: 'normal',
                wordBreak: 'break-all',
              }}>
              {item.title}
            </Button>

            {/* 递归渲染子菜单 */}
            {renderDocTree(item.id, depth + 1)}
          </div>
        ))}
      </div>
    );
  };
  const renderCodeBlock = ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
    node?: Element;
  }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter style={dracula} language={match[1]} PreTag='div' {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <ConfigProvider>
      <Layout hasSider style={{ height: '100vh' }}>
        <Sider
          width={256}
          theme='light'
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            borderRight: '1px solid #f0f0f0',
          }}>
          <div style={{ padding: 16 }}>
            <Title level={4} style={{ textAlign: 'center', margin: '16px 0' }}>
              项目知识库
            </Title>
            <Input
              placeholder='搜索文档...'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <div
              style={{
                marginTop: 16,
                padding: '0 8px',
              }}>
              {filteredDocTree.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: '#999' }}>
                  未找到相关文档
                </div>
              ) : (
                renderDocTree()
              )}
            </div>
          </div>
        </Sider>

        <Layout
          style={{
            marginLeft: 256,
            overflow: 'auto',
          }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#f5f5f5',
            }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size='large' tip='加载中...' />
              </div>
            ) : (
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  borderRadius: 4,
                  minHeight: 'calc(100vh - 48px)',
                }}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code: renderCodeBlock,
                    h1: ({ ...props }) => <Typography.Title level={2} {...props} />,
                    h2: ({ ...props }) => <Typography.Title level={3} {...props} />,
                    h3: ({ ...props }) => <Typography.Title level={4} {...props} />,
                    p: ({ ...props }) => <Typography.Paragraph {...props} />,
                    a: ({ ...props }) => (
                      <Typography.Link
                        {...(props as React.ComponentProps<typeof Typography.Link>)}
                      />
                    ),
                  }}>
                  {docContent}
                </ReactMarkdown>
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default KnowledgeBase;
