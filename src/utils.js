const compose = require('lodash/flow');
const compact = require('lodash/compact');
const { readFileSync, writeFileSync } = require('fs');

const CURRENT_DIR = process.cwd();

const readEnvFile = () => {
  try {
    return readFileSync(`${CURRENT_DIR}/.env`, 'utf-8');
  } catch (e) {
    return '';
  }
};

const readSampleFile = () => {
  try {
    return readFileSync(`${CURRENT_DIR}/.env.sample`, 'utf-8');
  } catch (e) {
    return readFileSync(`${CURRENT_DIR}/.env.example`, 'utf-8');
  }
};

const parseData = data =>
  compact(data.split(/\n/)).reduce((res, tuple) => {
    const [key, description] = tuple.split('=');
    return { ...res, [key]: description };
  }, {});

const serializeData = ({ vars, answers }) =>
  vars.map((key, index) => `${key}=${answers[index]}`).join('\n');

const saveEnvFile = dotEnv => writeFileSync(`${CURRENT_DIR}/.env`, dotEnv, 'utf-8');

const readSampleData = compose(readSampleFile, parseData);
const readEnvData = compose(readEnvFile, parseData);
const saveEnvData = compose(serializeData, saveEnvFile);

module.exports = { saveEnvData, readSampleData, readEnvData };
