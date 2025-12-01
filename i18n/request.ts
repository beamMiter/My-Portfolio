// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export const locales = ['th', 'en'] as const;
export type AppLocale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // ถ้า locale ไม่อยู่ในลิสต์ → fix ให้เป็น 'th'
  const finalLocale: AppLocale = locales.includes(locale as AppLocale)
    ? (locale as AppLocale)
    : 'th';

  return {
    locale: finalLocale, // 必須ต้องเป็น string แบบชัวร์ๆ
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
