
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
    // 处理特殊情况：对象类型的翻译结果
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
      
      // 尝试获取对象的 toString 方法结果（如果不是默认的 [object Object]）
      if (value.toString && typeof value.toString === 'function') {
        const strValue = value.toString();
        if (strValue !== '[object Object]') {
          return strValue;
        }
      }
      
      // 尝试递归处理对象的每个字符串属性
      for (const key in value) {
        if (typeof value[key] === 'string' && 
            !['type', 'namespace', 'keyPrefix', 'key', 'lng', 'ns', 'context'].includes(key)) {
          return value[key];
        }
      }
      
      // 处理i18next响应（可能包含count/ordinal等选项）
      if ('t' in value && typeof value.t === 'function') {
        try {
          return value.t();
        } catch (e) {
          // 无法调用t函数
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
      
      // 检查是否是 TFunctionResult 对象
      if ('_targetLanguage' in value || '_ns' in value || '_key' in value) {
        if ('_defaultValue' in value) {
          return String(value._defaultValue);
        }
      }
      
      // 检查数组
      if (Array.isArray(value)) {
        // 如果是数组，尝试获取第一个字符串元素
        for (const item of value) {
          if (typeof item === 'string') {
            return item;
          } else if (typeof item === 'object' && item !== null) {
            // 递归处理对象数组元素
            const processed = translationToString(item, '');
            if (processed) return processed;
          }
        }
      }
      
      // 作为最后的手段，使用JSON序列化
      const jsonStr = JSON.stringify(value);
      return jsonStr === '{}' ? fallback : jsonStr;
    }
    
    // 其他类型尝试强制转换为字符串
    return String(value);
  } catch (e) {
    console.error('无法将翻译结果转换为字符串:', e);
    return fallback;
  }
}
