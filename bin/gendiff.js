#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js'

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    // сравниваем данные в файлах
    //const diff = gendiff(filepath1, filepath2);
    const diff = gendiff(filepath1, filepath2, program.opts().format);
    console.log(diff);
  });

program.parse(process.argv);