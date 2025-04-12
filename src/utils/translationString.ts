
/**
 * 安全地将翻译结果转换为字符串，解决 TypeScript 类型问题
 * @param value 翻译结果，可能是字符串、对象或其他
 * @param fallback 如果转换失败时的回退值
 * @returns 字符串格式的翻译文本
 */
export function translationToString(value: any, fallback: string = ''): string {
  if (value === undefined || value === null) {
    return fallback;
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  // 处理特殊情况：对象类型的翻译结果
  if (typeof value === 'object') {
    try {
      // 尝试获取对象的 toString 方法结果
      if (value.toString && typeof value.toString === 'function' && value.toString() !== '[object Object]') {
        return value.toString();
      }
      
      // 尝试获取 react-i18next 特定属性
      if ('_t' in value && typeof value._t === 'string') {
        return value._t;
      }
      
      // 尝试 JSON 序列化
      return JSON.stringify(value);
    } catch (e) {
      console.error('无法将翻译结果转换为字符串:', e);
      return fallback;
    }
  }
  
  // 其他类型尝试强制转换为字符串
  return String(value);
}
