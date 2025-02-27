const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const renderPlain = (diff, parent = '') => {
  return diff
    .flatMap(({ key, type, value, oldValue, newValue, children }) => {
      const property = parent ? `${parent}.${key}` : key;
      switch (type) {
        case 'added':
          return `Property '${property}' was added with value: ${formatValue(value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
        case 'nested':
          return renderPlain(children, property);
        default:
          return [];
      }
    })
    .join('\n');
};

export default renderPlain;