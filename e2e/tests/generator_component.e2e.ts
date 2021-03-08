/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { browser } from 'protractor';
import { ViewerPage } from '../pages/viewerPage';
import { LoginPage } from '../pages/loginPage';
import { ApiService, UploadActions } from '@alfresco/adf-testing';

describe('Content Services Viewer', () => {
  let viewerPage = new ViewerPage();
  let loginPage = new LoginPage();
  const apiService = new ApiService();
  const uploadActions = new UploadActions(apiService);

  let pdfFile: any = {
    name: browser.params.resources.Files.PDF.file_name,
    location: browser.params.resources.Files.PDF.file_path
  };

  const loginURL = browser.params.testConfig.adf.url + browser.params.testConfig.adf.port + '/login';

  beforeAll(async (done) => {
    try {
      await apiService.loginWithProfile('admin');
      await uploadActions.uploadFile(pdfFile.location, pdfFile.name, '-my-');

      browser.driver.get(loginURL);
      await loginPage.login(
        browser.params.testConfig.adf.adminEmail,
        browser.params.testConfig.adf.adminPassword
      );
    } catch (err) {
      console.log(err)
    }


    done();
  });

  it('[C260498] Check viewer for a generated app', () => {
    let viewerUrl =
      browser.params.testConfig.adf.url +
      browser.params.testConfig.adf.port +
      `/documents(overlay:files/${pdfFile.id}/view)`;

    browser.driver.get(viewerUrl);
    browser.driver.sleep(3000); // wait open file

    // viewerPage.checkFileContent('1', pdfFile.firstPageText);
    viewerPage.checkCloseButtonIsDisplayed();
    viewerPage.clickCloseButton();
  });
});
