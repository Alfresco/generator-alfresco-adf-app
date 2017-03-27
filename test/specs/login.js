describe('Login component', function () {

  it('login page should be loaded', function (done) {

    browser.driver.manage().timeouts().implicitlyWait(60000);

    browser.driver.get('http://localhost:3000/login');
    browser.driver.findElement(By.tagName('alfresco-login')).then(()=> {
      done();
    });

    browser.driver.quit();
  });
});
