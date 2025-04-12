
import { useTranslation } from 'react-i18next';

export const useSafeTranslation = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // 更新 t 函数的类型定义，支持可选的第二个参数
  const safeT = (key: string, defaultValue?: string | { [key: string]: any }, options?: { [key: string]: any }) => {
    if (typeof defaultValue === 'string') {
      return t(key, defaultValue, options);
    }
    return t(key, options);
  };

  return { 
    t: safeT, 
    language 
  };
};
