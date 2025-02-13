import _ from 'lodash';
// lodash не работает

const buildDiff = (data1, data2) => {
  const keys2 = _.union(Object.keys(data1), Object.keys(data2)).sort();
  console.log('keys2: ', keys2);
  // получаем все уник-е ключи
  //const keys = Array.from(new Set(Object.keys(data1).concat(Object.keys(data2))));


  // const keys = _union(_.keys(data1), _.keys(data2));
  // const sortedKeys = _sortBy(keys);

  const keys = Object.keys({ ...data1, ...data2}).sort();

  const diff = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    // ключ есть в обоих файлах + значения одинаковы
    if (value1 === value2) {
      return `    ${key}: ${value1}`;
    }

    // ключ только в 1ом файле
    if (key in data1 && !(key in data2)) {
      return `  - ${key}: ${value1}`;
    }

    // ключ только в 2ом файле
    // if (!(key in data1) && key in data2) {
    if (!_.has(data1, key) && _.has(data2, key)) {
    // (!_.has(data1, key) && _.has(data2, key))
      return `  + ${key}: ${value1}`;
    }

    // ключ есть в обоих файлах + значения разные
    return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  });


  return `{\n${diff.join('\n')}\n}`;

}

export default buildDiff
  // const keys = _union(_.keys(data1), _.keys(data2));
  // const sortedKeys = _sortBy(keys);
//   const diff = sortedKeys.map((key) => {
//     const value1 = data1[key];
//     const value2 = data2[key];

//     // ключ есть в обоих файлах + значения одинаковы
//     if (_.isEqual(value1, value2)) {
//       return `  ${key}: ${value1}`;
//     }

//     // ключ только в 1ом файле
//     if (_.has(data1, key) && !_.has(data2, key)) {
//       return `- ${key}: ${value1}`;
//     }

//     // ключ только в 2ом файле
//     if (!_.has(data1, key) && _.has(data2, key)) {
//       return `+ ${key}: ${value1}`;
//     }

//     // ключ есть в обоих файлах + значения разные
//     return `- ${key}: ${value1}\n+ ${key}: ${value2}`;
//   });


//   return `{\n${diff.join('\n')}\n}`;

// }


// if (!_.isEqual(obj1[key], obj2[key])) {
//   // Если значения различны, добавляем оба значения к output
//   return [
//     `  - ${key}: ${JSON.stringify(obj1[key])}`, // Для obj1 с символом -
//     `  + ${key}: ${JSON.stringify(obj2[key])}`, // Для obj2 с символом +
//   ];
// }