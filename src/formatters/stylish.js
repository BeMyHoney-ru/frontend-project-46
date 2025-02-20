const renderStylish = (node) => {
  const iter = (node, depth) => {
    const indent = ' '.repeat(depth * 4);
    
    // массиы или нет
    if (Array.isArray(node)) {
      return node.map((item) => iter(item, depth + 1)).join('\n');
    }

    // Если node объект, рекурсивно проходим по ключам и значениям
    if (typeof node === 'object' && node !== null) {
      return Object.keys(node).map((key) => {
        const value = node[key];

        // Если значение - это объект, то углубляемся
        if (typeof value === 'object' && value !== null) {
          return `${indent}  ${key}: {\n${iter(value, depth + 1)}\n${indent}  }`;
        }
        // Если значение "лист", то возвращаем
        return `${indent}  ${key}: ${value}`;
      }).join('\n');
    }

    // Если значение "лист", то возвращаем
    return `${indent}${node}`;
  };

  return `{\n${iter(node, 1)}\n}`;
};

export default renderStylish;