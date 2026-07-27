import { useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography, Image, Divider, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });

const { Title, Paragraph, Text } = Typography;

interface Props {
  content: string;
}

function MermaidBlock({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
    mermaid.render(id, chart).then(({ svg }) => {
      if (containerRef.current) containerRef.current.innerHTML = svg;
    }).catch(() => {
      if (containerRef.current) containerRef.current.textContent = chart;
    });
  }, [chart]);

  return <div ref={containerRef} style={{ margin: '24px 0', textAlign: 'center' }} />;
}

export default function DocArticle({ content }: Props) {
  const articleRef = useRef<HTMLElement>(null);

  const handlePrint = useCallback(() => {
    const el = articleRef.current;
    if (!el) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Petfolioo Documentation</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; line-height: 1.6; }
        h1 { font-size: 2em; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px; }
        h2 { font-size: 1.5em; margin-top: 2em; }
        h3 { font-size: 1.2em; margin-top: 1.5em; }
        table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 0.9em; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
        th { background: #f5f5f5; font-weight: 600; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; }
        pre { background: #f6f8fa; padding: 16px; border-radius: 8px; overflow: auto; }
        blockquote { border-left: 4px solid #F1379D; margin: 16px 0; padding: 12px 16px; background: #fef7fb; }
        img { max-width: 100%; height: auto; }
        @media print { body { margin: 20px; } }
      </style></head><body>${el.innerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  }, []);

  useEffect(() => {
    (window as any).__docsPrint = handlePrint;
    return () => { delete (window as any).__docsPrint; };
  }, [handlePrint]);

  return (
    <article className="docs-article" ref={articleRef}>
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
            if (className === 'language-mermaid') {
              return <MermaidBlock chart={String(children).trim()} />;
            }
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
