import renderStylish from './stylish.js';
import renderPlain from './plain.js';
import renderJson from './json.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return renderStylish(diff);
    case 'plain':
      return renderPlain(diff);
    case 'json':
      // return JSON.stringify(diff, null, 2);
      return renderJson(diff);
    default:
      throw new Error(`incorrect format: "${formatName}"`);
  }
};

export default format;