const indent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2);
const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) return String(value);
  const entries = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${indent(depth)}  }`;
};

const stylish = (tree, depth = 1) => {
  const lines = tree.map(({ key, type, value, oldValue, newValue, children }) => {
    switch (type) {
      case 'added':
        return `${indent(depth)}+ ${key}: ${formatValue(value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${key}: ${formatValue(value, depth)}`;
      case 'updated':
        return [
          `${indent(depth)}- ${key}: ${formatValue(oldValue, depth)}`,
          `${indent(depth)}+ ${key}: ${formatValue(newValue, depth)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${formatValue(value, depth)}`;
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${stylish(children, depth + 1)}\n${indent(depth)}  }`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${stylish(diff)}\n}`;