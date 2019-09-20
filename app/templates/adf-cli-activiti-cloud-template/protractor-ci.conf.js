const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    binary: require('puppeteer').executablePath(),
    args: ['--no-sandbox']
  }
};

exports.config = config;
