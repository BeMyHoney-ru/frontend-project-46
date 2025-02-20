// import stylish from './stylish.js';
// import plain from './plain.js';

import renderStylish from './stylish.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return renderStylish(diff);
    // case 'plain':
    //   return plain(result); 
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`incorrect format "${format}"`);
  }
};

export default format;
