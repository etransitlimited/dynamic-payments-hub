
import React, { createContext, useContext, ReactNode } from 'react';
import { designTokens } from './design-tokens';

// 创建设计令牌上下文
const DesignTokensContext = createContext(designTokens);

interface ThemeProviderProps {
  children: ReactNode;
  customTokens?: typeof designTokens;
}

// 设计令牌提供者组件
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  customTokens
}) => {
  // 合并自定义令牌
  const tokens = customTokens || designTokens;
  
  return (
    <DesignTokensContext.Provider value={tokens}>
      {children}
    </DesignTokensContext.Provider>
  );
};

// 使用设计令牌的自定义Hook
export const useTheme = () => {
  const context = useContext(DesignTokensContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
