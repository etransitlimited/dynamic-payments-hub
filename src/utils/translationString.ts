
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
      
      // 尝试获取对象的 toString 方法结果（如果不是默认的 [object Object]）
      if (value.toString && typeof value.toString === 'function' && value.toString() !== '[object Object]') {
        return value.toString();
      }
      
      // react-i18next 可能将翻译键存储在 _t 属性中
      if ('_t' in value && typeof value._t === 'string') {
        return value._t;
      }
      
      // 如果有 i18nKey 属性（通常是 react-i18next 对象的标志），使用回退值
      if (value.i18nKey || value.defaultValue || value.values) {
        // 尝试使用 defaultValue
        if (typeof value.defaultValue === 'string') {
          return value.defaultValue;
        }
        return fallback;
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
          const placeholder = `{${key}}`;
          result = result.replace(new RegExp(placeholder, 'g'), String(interpolation[key]));
        });
        
        return result;
      }
      
      // 支持 React-i18next 中的 TFunction 返回值
      if (value.valueOf && typeof value.valueOf === 'function' && typeof value.valueOf() === 'string') {
        return value.valueOf();
      }
      
      // 如果有真值检查但实际是对象的情况，尝试使用通用键提取值
      for (const key of ['children', 'content', 'message', 'text', 'value']) {
        if (value[key] && typeof value[key] === 'string') {
          return value[key];
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

/**
 * React节点安全转换函数
 * 将翻译结果安全地转换为React节点可用的值
 */
export function translationToNode(value: any, fallback: React.ReactNode = ''): React.ReactNode {
  // 如果已经是有效的React节点类型，直接返回
  if (value === null || value === undefined || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  
  // 如果是对象，尝试转换为字符串
  return translationToString(value, fallback as string);
}
