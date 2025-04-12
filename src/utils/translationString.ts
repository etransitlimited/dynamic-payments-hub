
/**
 * 安全地将翻译结果转换为字符串，解决 TypeScript 类型问题
 * @param value 翻译结果，可能是字符串、对象或其他
 * @param fallback 如果转换失败时的回退值
 * @returns 字符串格式的翻译文本
 */
export function translationToString(value: any, fallback: string = ''): string {
  // 如果值为空，返回默认值
  if (value === undefined || value === null) {
    return fallback;
  }
  
  // 如果已经是字符串类型，直接返回
  if (typeof value === 'string') {
    return value;
  }
  
  // 处理特殊情况：对象类型的翻译结果
  if (typeof value === 'object') {
    try {
      // 处理 react-i18next 返回的翻译对象
      
      // 简单的情况: 如果对象中有一个字符串成员值与对象自身的 key 相同
      if (typeof value.key === 'string' && value[value.key] && typeof value[value.key] === 'string') {
        return value[value.key];
      }
      
      // 直接处理 TFunctionResult 的情况
      if (value.length !== undefined && typeof value.toString === 'function') {
        const strValue = value.toString();
        if (strValue !== '[object Object]') {
          return strValue;
        }
      }
      
      // 尝试获取对象的 toString 方法结果（如果不是默认的 [object Object]）
      if (value.toString && typeof value.toString === 'function' && value.toString() !== '[object Object]') {
        return value.toString();
      }
      
      // 针对值为字符串的情况简单处理
      if (value.value && typeof value.value === 'string') {
        return value.value;
      }
      
      // react-i18next 可能将翻译键存储在 _t 属性中
      if ('_t' in value && typeof value._t === 'string') {
        return value._t;
      }
      
      // 如果有 i18nKey 属性（通常是 react-i18next 对象的标志），使用回退值
      if (value.i18nKey || value.defaultValue || value.values) {
        return value.defaultValue || fallback;
      }
      
      // 格式化值对象 - 针对带有占位符的翻译
      if (value.value && typeof value.value === 'string' && value.interpolation) {
        let result = value.value;
        const interpolation = value.interpolation;
        
        // 替换占位符
        Object.keys(interpolation).forEach(key => {
          const placeholder = `{{${key}}}` || `{${key}}`;
          result = result.replace(new RegExp(placeholder, 'g'), String(interpolation[key]));
        });
        
        return result;
      }
      
      // 处理包含插值参数的情况 (例如：t("key", {name: "张三"}))
      if (value.options && value.options.defaultValue && value.options.interpolation) {
        let result = value.options.defaultValue;
        const interpolation = value.options.interpolation;
        
        // 替换所有插值参数
        Object.keys(interpolation).forEach(key => {
          const placeholder = new RegExp(`\\{${key}\\}`, 'g');
          result = result.replace(placeholder, String(interpolation[key]));
        });
        
        return result;
      }
      
      // 增加对 TFunctionDetailedResult 类型的支持
      if ('res' in value && typeof value.res === 'string') {
        return value.res;
      }
      
      // 处理简单的对象情况，尝试提取可能的翻译值
      for (const key of Object.keys(value)) {
        if (typeof value[key] === 'string' && key !== 'type' && key !== 'key') {
          return value[key];
        }
      }
      
      // 尝试直接访问可能存在的字符串属性
      if ('tOptions' in value && value.tOptions && typeof value.tOptions.defaultValue === 'string') {
        return value.tOptions.defaultValue;
      }
      
      // 检查是否有 ReactNode 类型的 children 属性
      if ('children' in value) {
        if (typeof value.children === 'string') {
          return value.children;
        } else if (Array.isArray(value.children)) {
          // 尝试合并子元素中的字符串
          return value.children
            .filter(child => typeof child === 'string')
            .join(' ');
        }
      }
      
      // 尝试使用 JSON 序列化
      const jsonStr = JSON.stringify(value);
      return jsonStr === '{}' ? fallback : jsonStr;
    } catch (e) {
      console.error('无法将翻译结果转换为字符串:', e);
      return fallback;
    }
  }
  
  // 其他类型尝试强制转换为字符串
  try {
    return String(value);
  } catch (e) {
    console.error('强制转换翻译值失败:', e);
    return fallback;
  }
}
