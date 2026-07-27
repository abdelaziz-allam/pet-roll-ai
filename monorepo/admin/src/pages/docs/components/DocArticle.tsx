import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Image, Divider, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface Props {
  content: string;
}

export default function DocArticle({ content }: Props) {
  return (
    <article className="docs-article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <Title level={1} style={{ marginTop: 0 }}>{children}</Title>,
          h2: ({ children }) => <Title level={2} style={{ marginTop: 32 }}>{children}</Title>,
          h3: ({ children }) => <Title level={3} style={{ marginTop: 24 }}>{children}</Title>,
          h4: ({ children }) => <Title level={4} style={{ marginTop: 16 }}>{children}</Title>,
          p: ({ children }) => <Paragraph style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>{children}</Paragraph>,
          img: ({ src, alt }) => (
            <div style={{ margin: '24px 0', textAlign: 'center' }}>
              <Image
                src={src}
                alt={alt || ''}
                style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #e8e8e8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              />
              {alt && <Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }}>{alt}</Text>}
            </div>
          ),
          blockquote: ({ children }) => (
            <Alert
              type="info"
              icon={<InfoCircleOutlined />}
              showIcon
              message={children}
              style={{ margin: '16px 0' }}
            />
          ),
          table: ({ children }) => (
            <div style={{ overflowX: 'auto', margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th style={{ padding: '10px 16px', borderBottom: '2px solid #f0f0f0', textAlign: 'left', fontWeight: 600, background: '#fafafa' }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ padding: '10px 16px', borderBottom: '1px solid #f0f0f0' }}>{children}</td>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre style={{ background: '#f6f8fa', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <code>{children}</code>
                </pre>
              );
            }
            return <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: 4, fontSize: '0.85em' }}>{children}</code>;
          },
          hr: () => <Divider />,
          ul: ({ children }) => <ul style={{ paddingLeft: 24, lineHeight: 2 }}>{children}</ul>,
          ol: ({ children }) => <ol style={{ paddingLeft: 24, lineHeight: 2 }}>{children}</ol>,
          a: ({ href, children }) => <a href={href} style={{ color: '#F1379D' }} target="_blank" rel="noopener noreferrer">{children}</a>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
