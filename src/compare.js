const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', newValue: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', oldValue: obj1[key] };
    }
    if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
      return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'updated', oldValue: obj1[key], newValue: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

export default buildDiff;