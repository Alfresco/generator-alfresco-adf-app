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

var exports = module.exports = {};
var TestConfig = require('./test.config');

var DEFAULT_TIMEOUT = parseInt(TestConfig.main.timeout);

exports.waitUntilElementIsVisible = function (elementToCheck, timeout) {
  var waitTimeout = timeout || DEFAULT_TIMEOUT;

  this.waitUntilElementIsPresent(elementToCheck, timeout);

  var isDisplayed = false;
  return browser.wait(() => {
    elementToCheck.isDisplayed().then(
    () => {
    isDisplayed = true;
},
  (err) => {
    isDisplayed = false;
  }
);
  return isDisplayed;
}, waitTimeout, 'Element is not visible ' + elementToCheck.locator());
};

exports.waitUntilElementIsPresent = function (elementToCheck, timeout) {
  var waitTimeout = timeout || DEFAULT_TIMEOUT;

  var isPresent = false;
  return browser.wait(() => {
    elementToCheck.isPresent().then(
    () => {
    isPresent = true;
},
  (err) => {
    isPresent = false;
  }
);
  return isPresent;
}, waitTimeout, 'Element is not present ' + elementToCheck.locator());
};

exports.generateRandomString = function (length) {
  length = typeof length !== 'undefined' ? length : 8;
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

exports.waitUntilElementIsClickable = function (elementToCheck, timeout) {
  var waitTimeout = timeout || DEFAULT_TIMEOUT;

  return browser.wait(() => {
    return until.elementToBeClickable(elementToCheck);
}, waitTimeout, 'Element is not Clickable' + elementToCheck.locator());
};
