const test = require('tape');
const { readSampleData, readEnvData } = require('../src/utils');

test('Read Sample data', (t) => {
  try {
    readSampleData();
    t.pass('Sample Data readed succesfully!');
  } catch (e) {
    t.fail("Sample Data can't be readed");
  } finally {
    t.end();
  }
});

test('Read .env data', (t) => {
  try {
    readEnvData();
    t.pass('.env Data readed succesfully!');
  } catch (e) {
    t.fail(".env can't be readed");
  } finally {
    t.end();
  }
});
