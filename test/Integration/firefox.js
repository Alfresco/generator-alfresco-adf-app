var webdriver = require('selenium-webdriver');
var By = webdriver.By;

describe('Firefox test', function () {

  var capabilities, driver;
  describe('Login component', function () {

    before(function () {
      capabilities = {
        'browserstack.local': 'true',
        'browserName': 'firefox',
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY
      };

      driver = new webdriver.Builder().usingServer('http://hub-cloud.browserstack.com/wd/hub').withCapabilities(capabilities).build();
    });

    it('login page should be loaded', function (done) {

      driver.manage().timeouts().implicitlyWait(60000);

      driver.get('http://localhost:3000/login');
      driver.findElement(By.tagName('alfresco-login')).then(()=> {
        done();
      });

      driver.quit();
    });
  });
});
