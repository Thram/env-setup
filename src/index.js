#! /usr/bin/env node
const inquirer = require('inquirer');

const { readEnvData, readSampleData, saveEnvData } = require('./utils');

const currentValues = readEnvData();

const start = async () => {
  const data = readSampleData();

  const vars = Object.keys(data);
  const answers = [];

  const askQuestions = (index = 0) => {
    const key = vars[index];
    const value = data[vars[index]];
    return inquirer
      .prompt({
        name: key,
        type: 'input',
        message: `${value}:\n(${key}=${currentValues[key] || '[No value]'})\n`,
      })
      .then(async (result) => {
        answers.push(result[key] || currentValues[key]);
        return answers.length === vars.length
          ? saveEnvData({ vars, answers })
          : askQuestions(index + 1);
      });
  };
  await askQuestions();
};

inquirer
  .prompt({
    name: 'start',
    type: 'input',
    message: 'Are you ready to setup your Enviromental Variables? (Y/n)',
  })
  .then(answers => (answers.start === '' || answers.start.toLowerCase() === 'y') && start());
