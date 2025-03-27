
/**
 * 设计令牌 (Design Tokens)
 * 
 * 这个文件包含整个卡台管理系统的集中设计变量，
 * 确保跨页面的视觉一致性和设计可维护性。
 */

// 颜色系统
export const colors = {
  // 主要背景色
  background: {
    primary: '#061428',
    secondary: '#0F2643',
    card: 'rgba(15, 38, 67, 0.9)',   // bg-[#0F2643]/90
    input: 'rgba(6, 20, 40, 0.7)',   // bg-[#061428]/70
  },
  
  // 边框色
  border: {
    primary: 'rgba(37, 99, 235, 0.5)',  // border-blue-600/50
    secondary: 'rgba(30, 58, 138, 0.5)', // border-blue-900/50
    focus: 'rgba(29, 78, 216, 0.7)',     // border-blue-700/70
  },
  
  // 文本色
  text: {
    primary: '#FFFFFF',             // text-white
    secondary: 'rgba(186, 230, 253, 0.8)', // text-blue-200/80
    placeholder: 'rgba(186, 230, 253, 0.4)', // text-blue-300/40
    label: 'rgb(186, 230, 253)',    // text-blue-200
  },
  
  // 功能色
  functional: {
    error: '#f87171',               // text-red-400
    warning: '#fbbf24',             // text-yellow-400
    success: '#10b981',             // text-emerald-400
    info: '#60a5fa',                // text-blue-400
  },
  
  // 强调色
  accent: {
    purple: {
      primary: '#a855f7',          // text-purple-500
      light: 'rgba(168, 85, 247, 0.2)', // bg-purple-500/20
      text: '#c084fc',             // text-purple-400
    },
    blue: {
      primary: '#3b82f6',          // text-blue-500
      light: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
      text: '#60a5fa',             // text-blue-400
    },
    yellow: {
      primary: '#eab308',
      light: 'rgba(234, 179, 8, 0.1)', // bg-yellow-500/10
      border: 'rgba(234, 179, 8, 0.3)', // border-yellow-500/30
      text: '#facc15',             // text-yellow-300
    },
  },
  
  // 按钮色
  button: {
    primary: '#2563eb',            // bg-blue-600
    primaryHover: '#1d4ed8',       // hover:bg-blue-700
    outline: 'transparent',
    outlineHover: 'rgba(30, 58, 138, 0.2)', // hover:bg-blue-900/20
  },
};

// 间距系统
export const spacing = {
  // 基础间距单位 (rem)
  xxs: '0.25rem',   // 4px
  xs: '0.5rem',     // 8px
  sm: '1rem',       // 16px
  md: '1.5rem',     // 24px
  lg: '2rem',       // 32px
  xl: '2.5rem',     // 40px
  xxl: '3rem',      // 48px
  
  // 特定组件间距
  card: {
    padding: '1.5rem',   // p-6
    gap: '1rem',         // gap-4
    childGap: '0.5rem',  // space-y-2
  },
  
  // 表单元素间距
  form: {
    fieldGap: '1rem',    // gap-4
    labelGap: '0.5rem',  // space-y-2
    sectionGap: '1.5rem', // space-y-6
  },
  
  // 页面间距
  page: {
    padding: '1.5rem',   // p-6
    contentGap: '1.5rem', // space-y-6
  },
};

// 阴影系统
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  glow: '0 0 15px rgba(0, 243, 255, 0.15)', // shadow-[0_0_15px_rgba(0,243,255,0.15)]
  card: '0 4px 6px -1px rgba(30, 58, 138, 0.1)', // shadow-lg shadow-blue-900/10
};

// 字体系统
export const typography = {
  fontFamily: {
    sans: 'var(--font-sans)',
    heading: 'var(--font-heading)',
    chinese: `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', var(--font-sans)`,
  },
  fontSize: {
    xs: '0.75rem',     // text-xs
    sm: '0.875rem',    // text-sm
    base: '1rem',      // text-base
    lg: '1.125rem',    // text-lg
    xl: '1.25rem',     // text-xl
    '2xl': '1.5rem',   // text-2xl
    '3xl': '1.875rem', // text-3xl
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
};

// 边框系统
export const borders = {
  radius: {
    sm: '0.25rem',   // rounded-sm
    md: '0.375rem',  // rounded-md
    lg: '0.5rem',    // rounded-lg
    full: '9999px',  // rounded-full
  },
  width: {
    thin: '1px',
    normal: '2px',
    thick: '3px',
  },
};

// 过渡效果
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  timing: {
    default: 'ease',
    linear: 'linear',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
};

// 卡片效果
export const cardEffects = {
  default: `bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300`,
  hover: `hover:shadow-[0_0_15px_rgba(0,243,255,0.15)]`,
  active: `bg-[#0F2643]/95 border-blue-800/60`,
};

// z-index 层级
export const zIndices = {
  behind: -1,
  base: 0,
  above: 1,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
};

// 动画系统 - 新增
export const animations = {
  // 动画关键帧
  keyframes: {
    fadeIn: 'fade-in 0.3s ease-out',
    fadeOut: 'fade-out 0.3s ease-out',
    slideIn: 'slide-in 0.3s ease-out',
    slideOut: 'slide-out 0.3s ease-out',
    scaleIn: 'scale-in 0.3s ease-out',
    scaleOut: 'scale-out 0.3s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    float: 'float 6s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite',
  },
  
  // 页面过渡
  page: {
    enter: 'animate-fadeIn animate-slideIn',
    exit: 'animate-fadeOut animate-slideOut',
  },
  
  // 组件过渡
  component: {
    enter: 'transition-all duration-300 ease-out',
    exit: 'transition-all duration-200 ease-in',
    hover: 'transition-all duration-200',
  },
  
  // 消息提示过渡
  toast: {
    enter: 'animate-fadeIn animate-slideIn',
    exit: 'animate-fadeOut animate-slideOut',
  },
  
  // 模态框过渡
  modal: {
    overlay: 'animate-fadeIn',
    content: 'animate-scaleIn',
  },
  
  // 菜单过渡
  menu: {
    enter: 'transition-all duration-200 ease-out',
    exit: 'transition-all duration-150 ease-in',
  },
  
  // 按钮过渡
  button: {
    hover: 'transition-all duration-200',
    active: 'transition-transform duration-100',
    disabled: 'transition-opacity duration-200',
  },
  
  // 表单元素过渡
  form: {
    focus: 'transition-all duration-200',
    change: 'transition-all duration-300',
  },
  
  // 特效动画
  effects: {
    shimmer: 'animate-[shimmer_2s_infinite]',
    pulse: 'animate-[pulse_2s_infinite]',
    blink: 'animate-[blink_1s_infinite]',
  },
};

// 导出设计令牌集合
export const designTokens = {
  colors,
  spacing,
  shadows,
  typography,
  borders,
  transitions,
  cardEffects,
  zIndices,
  animations,
};

export default designTokens;
