
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
  
  try {
    // 如果是对象类型的翻译结果，尝试提取字符串
    if (typeof value === 'object') {
      // 处理 React 组件情况
      if (value.$$typeof && typeof value.props === 'object') {
        // 尝试从 React 组件属性中提取文本
        if (typeof value.props.children === 'string') {
          return value.props.children;
        } else if (value.props.defaultValue && typeof value.props.defaultValue === 'string') {
          return value.props.defaultValue;
        }
        return fallback; // 不是文本组件时使用默认值
      }
      
      // 处理常见的 i18next TFunctionResult 和 react-i18next Trans 组件
      // 优先处理 i18next 的字符串转换
      if (typeof value.toString === 'function' && value.toString !== Object.prototype.toString) {
        const stringValue = value.toString();
        if (stringValue !== '[object Object]') {
          return stringValue;
        }
      }
      
      // 常见的 react-i18next 返回结构
      if (value.res && typeof value.res === 'string') {
        return value.res;
      }
      
      // 处理翻译对象结构
      if (value.value && typeof value.value === 'string') {
        return value.value;
      }
      
      // 检查是否有默认值
      if (value.defaultValue && typeof value.defaultValue === 'string') {
        return value.defaultValue;
      }
      
      // 检查特殊的 i18next 结构
      if (value._defaultValue && typeof value._defaultValue === 'string') {
        return value._defaultValue;
      }
      
      // 处理带有 t 方法的对象 (i18next 特性)
      if ('t' in value && typeof value.t === 'function') {
        try {
          const tResult = value.t();
          if (typeof tResult === 'string') {
            return tResult;
          }
        } catch (e) {
          // t函数调用失败，继续尝试其他方法
        }
      }
      
      // 尝试递归处理对象的每个字符串属性
      for (const key in value) {
        if (typeof value[key] === 'string' && 
            !['type', 'namespace', 'keyPrefix', 'key', 'lng', 'ns', 'context'].includes(key)) {
          return value[key];
        }
      }
      
      // 处理带有插值参数的情况
      if (value.options) {
        if (value.options.defaultValue && typeof value.options.defaultValue === 'string') {
          let result = value.options.defaultValue;
          // 尝试应用插值
          if (value.options.interpolation) {
            Object.keys(value.options.interpolation).forEach(key => {
              const placeholder = new RegExp(`\\{${key}\\}|{{${key}}}`, 'g');
              result = result.replace(placeholder, String(value.options.interpolation[key]));
            });
          }
          return result;
        }
      }
      
      // 处理数组情况
      if (Array.isArray(value)) {
        // 如果是数组，尝试获取第一个字符串元素或递归处理
        for (const item of value) {
          if (typeof item === 'string') {
            return item;
          } else if (typeof item === 'object' && item !== null) {
            const processed = translationToString(item, '');
            if (processed) return processed;
          }
        }
        // 如果数组没有可用的字符串元素，尝试将整个数组连接为字符串
        if (value.length > 0) {
          return value.join(', ');
        }
      }
      
      // 处理 React 组件树
      if ('children' in value) {
        const children = value.children;
        if (typeof children === 'string') {
          return children;
        } else if (Array.isArray(children)) {
          // 尝试连接所有子字符串
          const textParts = [];
          for (const child of children) {
            if (typeof child === 'string') {
              textParts.push(child);
            } else if (typeof child === 'object' && child !== null) {
              const childText = translationToString(child, '');
              if (childText) textParts.push(childText);
            }
          }
          if (textParts.length > 0) {
            return textParts.join(' ');
          }
        }
      }
      
      // 检查特殊的翻译结果对象
      if ('originalValue' in value && typeof value.originalValue === 'string') {
        return value.originalValue;
      }
      
      // 处理 i18next 特定结构
      if ('i18n' in value && 'language' in value && 'resolvedLanguage' in value) {
        if ('defaultValue' in value && typeof value.defaultValue === 'string') {
          return value.defaultValue;
        }
        
        if ('fallbackValue' in value && typeof value.fallbackValue === 'string') {
          return value.fallbackValue;
        }
      }
      
      // 最后尝试 JSON 序列化，如果生成的不是空对象
      const jsonStr = JSON.stringify(value);
      if (jsonStr !== '{}' && jsonStr !== '[]') {
        // 如果 JSON 不是特别长，可以返回
        if (jsonStr.length < 100) {
          return jsonStr;
        }
      }
      
      // 所有尝试都失败，返回回退值
      return fallback;
    }
    
    // 其他类型（如数字、布尔等）强制转换为字符串
    return String(value);
  } catch (error) {
    console.error('无法将翻译结果转换为字符串:', error);
    return fallback;
  }
}
