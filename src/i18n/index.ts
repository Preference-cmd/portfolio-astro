import en from './en.json';
import zh from './zh.json';

export type Locale = 'en' | 'zh';

export const locales: Locale[] = ['en', 'zh'];

export const defaultLocale: Locale = 'en';

const translations: Record<Locale, typeof en> = {
  en,
  zh,
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
