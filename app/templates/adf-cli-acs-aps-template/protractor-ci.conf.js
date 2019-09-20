const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  binary: require('puppeteer').executablePath(),
  chromeOptions: {
    args: ['--no-sandbox']
  }
};

exports.config = config;
