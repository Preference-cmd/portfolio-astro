export type Locale = 'en' | 'zh';

export const locales: Locale[] = ['en', 'zh'];

export const defaultLocale: Locale = 'en';

// 直接 import 翻译数据
import enData from './en.json';
import zhData from './zh.json';

const translations: Record<Locale, typeof enData> = {
  en: enData,
  zh: zhData,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}

export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

// Hook for use in React components
export function useTranslations(locale: Locale) {
  const t = (key: string): string => {
    return getNestedValue(translations[locale] as unknown as Record<string, unknown>, key);
  };

  return t;
}
