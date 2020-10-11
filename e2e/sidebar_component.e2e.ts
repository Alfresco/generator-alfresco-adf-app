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

import { browser } from 'protractor';
import TestConfig = require('./test.config');
import { LoginPage } from './loginPage';
import { AdfAppPage } from './app.po';

describe('Content Services Viewer', () => {

  const loginPage = new LoginPage();
  const loginURL = TestConfig.adf.url + TestConfig.adf.port + '/login';
  const page = new AdfAppPage();

  beforeAll(async (done) => {

    browser.driver.get(loginURL);

    await loginPage.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

    done();
  });

  it('[C276758] Check side-bar for generated app', () => {
    page.navigateTo();
    expect(page.getToolbar()).toBeDefined();
  });

});

