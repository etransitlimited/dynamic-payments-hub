
import { NavigateFunction } from 'react-router-dom';
import { getLanguagePrefixedPath } from './authNavigationUtils';

/**
 * 平滑导航工具 - 在页面间进行无闪烁导航
 * @param navigate - React Router的navigate函数
 * @param path - 目标路径
 * @param options - 导航选项
 */
export const smoothNavigate = (
  navigate: NavigateFunction, 
  path: string, 
  options?: { 
    transitionDuration?: number;
    addFeedback?: boolean;
  }
) => {
  const { 
    transitionDuration = 300,
    addFeedback = true 
  } = options || {};
  
  // 确保路径包含语言前缀
  const prefixedPath = getLanguagePrefixedPath(path);
  
  // 检查是否已经在目标路径
  if (window.location.pathname === prefixedPath) {
    console.log(`Already at path ${prefixedPath}, skipping navigation`);
    return;
  }
  
  console.log(`Navigating from ${window.location.pathname} to ${prefixedPath}`);
  
  // 添加视觉过渡效果
  if (addFeedback) {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      // 添加过渡类
      mainContent.classList.add('page-transitioning');
      
      // 子内容的过渡效果
      const contentElement = mainContent.querySelector('.dashboard-content');
      if (contentElement) {
        contentElement.classList.add('page-changing');
      }
    }
  }
  
  // 导航到新路径
  navigate(prefixedPath);
  
  // 移除过渡效果
  setTimeout(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.remove('page-transitioning');
      
      const contentElement = mainContent.querySelector('.dashboard-content');
      if (contentElement) {
        contentElement.classList.remove('page-changing');
      }
    }
  }, transitionDuration);
};

/**
 * 绑定导航事件，防止链接引起的页面刷新
 * @param container - 包含链接的容器元素
 * @param navigate - React Router的navigate函数
 */
export const bindLinkNavigation = (
  container: HTMLElement | null,
  navigate: NavigateFunction
) => {
  if (!container) return;
  
  const handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const linkElement = target.closest('a[href]');
    
    if (!linkElement || !linkElement.hasAttribute('href')) return;
    
    const href = linkElement.getAttribute('href');
    
    // 忽略外部链接、锚点链接和已激活的链接
    if (!href || 
        href === '#' || 
        href.startsWith('http') || 
        href.startsWith('tel:') || 
        href.startsWith('mailto:') ||
        linkElement.getAttribute('data-active') === 'true') {
      return;
    }
    
    // 阻止默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 使用平滑导航
    smoothNavigate(navigate, href);
  };
  
  // 使用事件委托捕获所有链接点击
  container.addEventListener('click', handleClick);
  
  // 返回清理函数
  return () => {
    container.removeEventListener('click', handleClick);
  };
};

/**
 * 更新活动导航状态
 * @param pathname - 当前路径
 */
export const updateActiveNavigation = (pathname: string) => {
  // 移除语言前缀用于比较
  const normalizedPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
  
  // 更新所有侧边栏导航项
  document.querySelectorAll('[data-sidebar="menu-button"]').forEach(button => {
    const link = button.querySelector('a');
    if (!link || !link.getAttribute('href')) return;
    
    let href = link.getAttribute('href') || '';
    // 也移除链接中的语言前缀进行比较
    const normalizedHref = href.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '');
    
    const isActive = normalizedPath === normalizedHref || 
                    (normalizedPath.startsWith(normalizedHref) && normalizedHref !== '/');
    
    if (isActive) {
      button.setAttribute('data-active', 'true');
      link.setAttribute('data-active', 'true');
      button.classList.add('data-[active=true]:bg-indigo-900/60');
    } else {
      button.removeAttribute('data-active');
      link.removeAttribute('data-active');
      button.classList.remove('data-[active=true]:bg-indigo-900/60');
    }
  });
};
