import { Menu } from 'antd';
import {
  DashboardOutlined, TeamOutlined, HeartOutlined, SafetyCertificateOutlined,
  ShoppingOutlined, FileTextOutlined, SettingOutlined, RocketOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { docsStructure } from '../docsStructure';

const categoryIcons: Record<string, React.ReactNode> = {
  gettingStarted: <RocketOutlined />,
  petManagement: <HeartOutlined />,
  userManagement: <TeamOutlined />,
  verification: <SafetyCertificateOutlined />,
  marketplace: <ShoppingOutlined />,
  content: <FileTextOutlined />,
  administration: <SettingOutlined />,
};

interface Props {
  activeKey: string;
  onSelect: (key: string) => void;
}

export default function DocsSidebar({ activeKey, onSelect }: Props) {
  const { t } = useTranslation('docs');

  const items = docsStructure.map(cat => ({
    key: cat.key,
    icon: categoryIcons[cat.key] || <DashboardOutlined />,
    label: t(`categories.${cat.key}`),
    children: cat.articles.map(article => ({
      key: article.key,
      label: t(`articles.${article.key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`, article.title),
    })),
  }));

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      defaultOpenKeys={docsStructure.map(c => c.key)}
      onClick={({ key }) => onSelect(key)}
      items={items}
      style={{ border: 'none', background: 'transparent' }}
    />
  );
}
