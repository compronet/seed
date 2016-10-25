'use strict';

exports.config = {
  capabilities: {
    browserName: 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['tests/test.spec.js']
};