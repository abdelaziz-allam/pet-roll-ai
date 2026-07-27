import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { supportedLocales, localeNames, type SupportedLocale } from '../i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language?.split('-')[0] || 'en') as SupportedLocale;

  const items = supportedLocales.map(locale => ({
    key: locale,
    label: (
      <span style={{ fontWeight: locale === currentLang ? 600 : 400, color: locale === currentLang ? '#F1379D' : undefined }}>
        {localeNames[locale]}
      </span>
    ),
    onClick: () => i18n.changeLanguage(locale),
  }));

  return (
    <Dropdown menu={{ items, selectedKeys: [currentLang] }} trigger={['click']}>
      <button
        style={{
          background: 'none',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          padding: '4px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
        }}
      >
        <GlobalOutlined />
        {currentLang.toUpperCase()}
      </button>
    </Dropdown>
  );
}
