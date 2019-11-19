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
import { ViewerPage } from './viewerPage';
import { LoginPage } from './loginPage';
import { AlfrescoApi } from '@alfresco/js-api';
import { UploadActions } from './upload.actions';

describe('Content Services Viewer', () => {

  let viewerPage = new ViewerPage();
  let loginPage = new LoginPage();

  let pdfFile: any = {
    'name': 'a_file_supported.pdf',
    'firstPageText': 'A Journey into Test Frameworks'
  };

  let loginURL = TestConfig.adf.url + TestConfig.adf.port + '/login';

  beforeAll(async (done) => {
    let uploadActions = new UploadActions();

    this.alfrescoJsApi = new AlfrescoApi({
      provider: 'ECM',
      hostEcm: TestConfig.adf.url
    });

    await this.alfrescoJsApi.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

    let pdfFileUploaded = await uploadActions.uploadFile(this.alfrescoJsApi, '/pdf_file.pdf', 'pdf_file.pdf', '-my-');
    Object.assign(pdfFile, pdfFileUploaded.entry);

    browser.driver.get(loginURL);

    await loginPage.login(TestConfig.adf.adminEmail, TestConfig.adf.adminPassword);

    done();
  });

  it('[C260498] Check viewer for a generated app', () => {

    let viewerUrl = TestConfig.adf.url + TestConfig.adf.port + `/documentlist(overlay:files/${pdfFile.id}/view)`;

    browser.driver.get(viewerUrl);
    browser.driver.sleep(3000); // wait open file

    viewerPage.checkFileContent('1', pdfFile.firstPageText);
    viewerPage.checkCloseButtonIsDisplayed();
    viewerPage.clickCloseButton();
  });

});
