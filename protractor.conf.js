const path = require("path");
const jasmineReporters = require("jasmine-reporters");
const { SpecReporter } = require("jasmine-spec-reporter");

const projectRoot = path.resolve(__dirname);

const width = 1366;
const height = 768;

var HOST = process.env.URL_HOST_ADF;
var BROWSER_RUN = process.env.BROWSER_RUN;
var SELENIUM_SERVER = process.env.SELENIUM_SERVER || "";
var DIRECT_CONNECCT = SELENIUM_SERVER ? false : true;

var args_options = [];

if (BROWSER_RUN === "true") {
  args_options = ["--incognito", "--window-size=1366,768", "--disable-gpu"];
} else {
  args_options = [
    "--incognito",
    "--headless",
    "--window-size=1366,768",
    "--disable-gpu",
  ];
}

var specsToRun = "./e2e/**/*.e2e.ts";

if (process.env.NAME_TEST) {
  specsToRun = "./e2e/**/" + process.env.NAME_TEST;
}

exports.config = {
  allScriptsTimeout: 60000,

  specs: [specsToRun],

  chromeOnly: true,

  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      binary: require("puppeteer").executablePath(),
      args: args_options,
    },
    loggingPrefs: {
      browser: "SEVERE", // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
    },
  },

  directConnect: DIRECT_CONNECCT,

  baseUrl: "http://" + HOST,

  framework: "jasmine2",

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000,
    print: function () {},
  },

  /**
   * The address of a running selenium server (must be manually start before running the tests). If this is specified seleniumServerJar and seleniumPort will be ignored.
   * @config {String} seleniumAddress
   */
  seleniumAddress: SELENIUM_SERVER,

  onPrepare() {
    require("ts-node").register({
      project: "e2e/tsconfig.e2e.json",
    });

    browser.manage().window().setSize(width, height);

    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: `${projectRoot}/e2e-output/junit-report`,
        filePrefix: "results.xml",
        useDotNotation: false,
        useFullTestName: false,
        reportFailedUrl: true,
      })
    );

    return browser.driver.executeScript(disableCSSAnimation);

    function disableCSSAnimation() {
      var css =
          "* {" +
          "-webkit-transition-duration: 0s !important;" +
          "transition-duration: 0s !important;" +
          "-webkit-animation-duration: 0s !important;" +
          "animation-duration: 0s !important;" +
          "}",
        head = document.head || document.getElementsByTagName("head")[0],
        style = document.createElement("style");

      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  },
};
