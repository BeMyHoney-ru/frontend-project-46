#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { parse } from './parser.js';
import { genDiff } from './gendiffLogic.js';


const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish', 'stylish')
  .action((filepath1, filepath2) => {
    

    // получаем абслютные пути
    const absolutePath1 = resolve(process.cwd(), filepath1);
    const absolutePath2 = resolve(process.cwd(), filepath2);

    // чтение содержимого
    const content1 = readFileSync(absolutePath1, 'utf-8');
    const content2 = readFileSync(absolutePath2, 'utf-8');

    // определяем формат файла по расширению
    const format1 = filepath1.split('.').pop();
    const format2 = filepath2.split('.').pop();

    // парсинг данных
    const data1 = parse(content1, format1);
    const data2 = parse(content2, format2);

    // вывод результата
    console.log('File 1:', data1);
    console.log('File 2:', data2);

    // сравниваем данные в файлах

    const diff = genDiff(data1, data2);
    console.log(diff);
  });

program.parse(process.argv);

// .action((filepath1, filepath2, format = 'stylish') => {
//   console.log(gendiff(filepath1, filepath2, format.format));

//   // получаем абслютные пути
//   const absolutePath1 = resolve(process.cwd(), filepath1);
//   const absolutePath2 = resolve(process.cwd(), filepath2);

//   // определяем формат файла по расширению
//   const format1 = filepath1.split('.').pop();
//   const format2 = filepath2.split('.').pop();

//   // вывод результата
//   console.log('File 1:', data1);
//   console.log('File 2:', data2);
// });