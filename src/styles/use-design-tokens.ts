
import { designTokens } from './design-tokens';

// 设计令牌访问工具
export const useDesignTokens = () => {
  return designTokens;
};

// 常用CSS类名生成工具
export const getCardClass = (variant: 'default' | 'active' = 'default') => {
  return variant === 'default' 
    ? designTokens.cardEffects.default 
    : designTokens.cardEffects.active;
};

export const getInputClass = (hasError: boolean = false, hasIcon: boolean = false) => {
  return `${
    hasIcon ? "pl-10" : ""
  } bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40 focus:border-blue-700/70 transition-colors ${
    hasError ? "border-red-500" : ""
  }`;
};

export const getLabelClass = () => {
  return "text-sm font-medium text-blue-200";
};

export const getButtonClass = (variant: 'primary' | 'outline' = 'primary') => {
  return variant === 'primary'
    ? "gap-2 bg-blue-600 hover:bg-blue-700 text-white"
    : "border-blue-600/60 text-white hover:bg-blue-900/20";
};

export const getIconContainerClass = (color: 'blue' | 'purple' = 'blue') => {
  return color === 'blue'
    ? "bg-blue-500/20 p-2 rounded-full mr-2"
    : "bg-purple-500/20 p-2 rounded-full mr-2";
};

// 动画和过渡效果辅助函数 - 新增
export const getPageTransitionClass = () => {
  return "transition-opacity duration-300 ease-out";
};

export const getComponentTransitionClass = (type: 'enter' | 'exit' | 'hover' = 'enter') => {
  return designTokens.animations.component[type];
};

export const getButtonAnimationClass = (isActive: boolean = false) => {
  return `${designTokens.animations.button.hover} ${isActive ? 'scale-95' : ''}`;
};

export const getFadeAnimationClass = (type: 'in' | 'out' = 'in') => {
  return type === 'in' ? designTokens.animations.keyframes.fadeIn : designTokens.animations.keyframes.fadeOut;
};

export const getModalAnimationClass = (element: 'overlay' | 'content' = 'content') => {
  return designTokens.animations.modal[element];
};

export const getPulseAnimationClass = () => {
  return designTokens.animations.keyframes.pulse;
};

export const getFloatAnimationClass = () => {
  return designTokens.animations.keyframes.float;
};

export const getGlowAnimationClass = () => {
  return designTokens.animations.keyframes.glow;
};

export default useDesignTokens;
