/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Util = require('./util');

export class LoginPage {

  header = element(by.css('[data-automation-id="adf-layout-container"]'));
  signInButton = element(by.id('login-button'));
  txtUsername = element(by.css('input[id="username"]'));
  txtPassword = element(by.css('input[id="password"]'));

  enterUsername(username) {
    Util.waitUntilElementIsVisible(this.txtUsername);
    this.txtUsername.sendKeys('');
    return this.txtUsername.clear().sendKeys(username);
  }

  enterPassword(password) {
    Util.waitUntilElementIsVisible(this.txtPassword);
    return this.txtPassword.clear().sendKeys(password);
  }

  clickSignInButton() {
    Util.waitUntilElementIsVisible(this.signInButton);
    this.signInButton.click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickSignInButton();
    return Util.waitUntilElementIsVisible(this.header);
  }
}
