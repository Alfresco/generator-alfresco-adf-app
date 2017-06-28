'use strict';

describe('Login component', function () {

  beforeEach(function () {
    browser.driver.manage().timeouts().implicitlyWait(1220000);
    browser.driver.get('http://localhost:3000/login');
  });

  afterEach(function () {
    browser.driver.quit();
  });

  it('login page should be loaded', function (done) {
    browser.driver.findElement(By.tagName('alfresco-login')).then(()=> {
      done();
    });
  });
});
