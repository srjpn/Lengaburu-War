const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const sandbox = () => sinon.createSandbox();

module.exports = {
  expect: chai.expect, sinon, sandbox
};
