import fs from 'fs';
import path from 'path';
import buildDiff from './compare.js'
import { parse } from './parser.js';

const gendiff = (firstPath, secondPath) => {
  // // получаем абслютные пути
  const absolutePath1 = path.resolve(process.cwd(), firstPath);
  const absolutePath2 = path.resolve(process.cwd(), secondPath);

  // // чтение содержимого
  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  // // определяем формат файла по расширению
  const format1 = path.extname(absolutePath1).slice(1)
  const format2 = path.extname(absolutePath2).slice(1)

  // // парсинг данных
  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const result = buildDiff(data1, data2)

  return result
}

export default gendiff;
