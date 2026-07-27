import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout, Input, Typography, Breadcrumb, Anchor, Empty, Spin, Button, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, HomeOutlined, PrinterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';
import DocsSidebar from './components/DocsSidebar';
import DocArticle from './components/DocArticle';
import { docsStructure, type DocEntry } from './docsStructure';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

interface SearchResult {
  item: DocEntry;
  matches?: readonly any[];
}

export default function DocsPage() {
  const { t, i18n } = useTranslation('docs');
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [allContents, setAllContents] = useState<Map<string, string>>(new Map());

  const activeArticle = searchParams.get('article') || 'getting-started';

  const fuse = useMemo(() => {
    const items = docsStructure.flatMap(cat =>
      cat.articles.map(a => ({ ...a, category: cat.key, content: allContents.get(a.key) || '' }))
    );
    return new Fuse(items, {
      keys: ['title', 'content', 'description'],
      threshold: 0.3,
      includeMatches: true,
    });
  }, [allContents]);

  useEffect(() => {
    loadArticle(activeArticle);
  }, [activeArticle, i18n.language]);

  useEffect(() => {
    loadAllForSearch();
  }, [i18n.language]);

  async function loadArticle(key: string) {
    setLoading(true);
    try {
      const lang = i18n.language.split('-')[0];
      let res = await fetch(`/docs/content/${lang}/${key}.md`);
      if (!res.ok) res = await fetch(`/docs/content/en/${key}.md`);
      if (res.ok) {
        setContent(await res.text());
      } else {
        setContent('# Article not found\n\nThis article is not yet available.');
      }
    } catch {
      setContent('# Error\n\nFailed to load article.');
    }
    setLoading(false);
  }

  async function loadAllForSearch() {
    const lang = i18n.language.split('-')[0];
    const contents = new Map<string, string>();
    const articles = docsStructure.flatMap(cat => cat.articles);
    await Promise.all(articles.map(async (article) => {
      try {
        let res = await fetch(`/docs/content/${lang}/${article.key}.md`);
        if (!res.ok) res = await fetch(`/docs/content/en/${article.key}.md`);
        if (res.ok) contents.set(article.key, await res.text());
      } catch {}
    }));
    setAllContents(contents);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = fuse.search(query);
    setSearchResults(results);
  }

  function navigateToArticle(key: string) {
    setSearchParams({ article: key });
    setSearchQuery('');
    setSearchResults([]);
  }

  return (
    <Layout style={{ minHeight: '100%', background: '#fff' }}>
      <Sider
        width={280}
        style={{ background: '#fafafa', borderRight: '1px solid #f0f0f0', overflow: 'auto', position: 'sticky', top: 0, height: '100vh' }}
      >
        <div style={{ padding: '24px 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <BookOutlined style={{ fontSize: 20, color: '#F1379D' }} />
            <Title level={4} style={{ margin: 0 }}>{t('title')}</Title>
          </div>
          <Input
            prefix={<SearchOutlined />}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            allowClear
            style={{ marginBottom: 16 }}
          />
          {searchQuery && searchResults.length > 0 ? (
            <div style={{ marginBottom: 16 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {t('searchResults', { count: searchResults.length })}
              </Text>
              {searchResults.map(r => (
                <div
                  key={r.item.key}
                  onClick={() => navigateToArticle(r.item.key)}
                  style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: 6, marginTop: 4, background: '#fff', border: '1px solid #e8e8e8' }}
                >
                  <Text strong style={{ fontSize: 13 }}>{r.item.title}</Text>
                  {r.item.description && <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>{r.item.description}</Text>}
                </div>
              ))}
            </div>
          ) : searchQuery ? (
            <Text type="secondary" style={{ fontSize: 12 }}>{t('searchNoResults', { query: searchQuery })}</Text>
          ) : null}
        </div>
        {!searchQuery && <DocsSidebar activeKey={activeArticle} onSelect={navigateToArticle} />}
      </Sider>
      <Content style={{ padding: '32px 48px', maxWidth: 900 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Breadcrumb>
            <Breadcrumb.Item><HomeOutlined /> Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{t('title')}</Breadcrumb.Item>
            <Breadcrumb.Item>
              {docsStructure.flatMap(c => c.articles).find(a => a.key === activeArticle)?.title || activeArticle}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Tooltip title={t('printArticle')}>
            <Button
              icon={<PrinterOutlined />}
              onClick={() => (window as any).__docsPrint?.()}
              type="text"
            />
          </Tooltip>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
        ) : (
          <DocArticle content={content} />
        )}
      </Content>
    </Layout>
  );
}
