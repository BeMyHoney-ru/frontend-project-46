import _ from 'lodash';

export const genDiff = (data1, data2) => {
  // получаем все уник-е ключи
  //const keys = Array.from(new Set(Object.keys(data1).concat(Object.keys(data2))));

  //const keys = Object.keys({ ...data1, ...data2});

  const sortedKeys = _sortBy(_union(_.keys(data1), _.keys(data2)));

  const diff = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    // ключ есть в обоих файлах + значения одинаковы
    if (_.isEqual(value1, value2)) {

    };

    // ключ только в 1ом файле
    if (_.has(data1, key)) && !_.has(data2, key) {

    };

    // ключ только в 2ом файле
    if (!_.has(data1, key)) && _.has(data2, key) {

    };

    // ключ есть в обоих файлах + значения разные
    
  });
  

}