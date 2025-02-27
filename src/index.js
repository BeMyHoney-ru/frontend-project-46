import fs from 'fs';
import path from 'path';
import buildDiff from './compare.js';
import format from './formatters/index.js';
import { parse } from './parser.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileContent = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileContent(filepath1), getFileFormat(filepath1));
  const data2 = parse(getFileContent(filepath2), getFileFormat(filepath2));

  const diffTree = buildDiff(data1, data2);
  return format(diffTree, formatName);
};

export default gendiff;