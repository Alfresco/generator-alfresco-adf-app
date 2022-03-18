// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      { pattern: './node_modules/hammerjs/hammer.js', watched: false },
      { pattern: './node_modules/@angular/material/prebuilt-themes/indigo-pink.css', watched: false },
      { pattern: './node_modules/@alfresco/adf-core/bundles/assets/adf-core/i18n/en.json', watched: false, served: true, included: false },
      { pattern: './node_modules/@alfresco/adf-content-services/bundles/assets/adf-content-services/i18n/en.json', watched: false, served: true, included: false },
      { pattern: './node_modules/@alfresco/adf-process-services/bundles/assets/adf-process-services/i18n/en.json', watched: false, served: true, included: false }
    ],

    proxies: {
      '/assets/adf-core/i18n/en.json': '/base/node_modules/@alfresco/adf-core/bundles/assets/adf-core/i18n/en.json',
      '/assets/adf-core/i18n/en-US.json': '/base/node_modules/@alfresco/adf-core/bundles/assets/adf-core/i18n/en.json',
      '/assets/adf-content-services/i18n/en.json': '/base/node_modules/@alfresco/adf-content-services/bundles/assets/adf-content-services/i18n/en.json',
      '/assets/adf-content-services/i18n/en-US.json': '/base/node_modules/@alfresco/adf-content-services/bundles/assets/adf-content-services/i18n/en.json',
      '/assets/adf-process-services/i18n/en.json': '/base/node_modules/@alfresco/adf-process-services/bundles/assets/adf-process-services/i18n/en.json',
      '/assets/adf-process-services/i18n/en-US.json': '/base/node_modules/@alfresco/adf-process-services/bundles/assets/adf-process-services/i18n/en.json'
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },

    reporters: ['mocha', 'kjhtml'],
    mochaReporter: {
      maxLogLines: 5,
      output: 'minimal'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false,

    browserDisconnectTimeout: 200000,
    browserNoActivityTimeout: 2400000,
    captureTimeout: 1200000,

  });
};
