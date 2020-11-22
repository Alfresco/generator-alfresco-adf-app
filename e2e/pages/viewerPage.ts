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

import { Util } from "../util";
import { element, by } from "protractor";

export class ViewerPage {

  closeButton = element(by.css('button[data-automation-id="adf-toolbar-back"]'));

  checkFileContent(pageNumber, text) {
    let allPages = element.all(by.css('div[class="canvasWrapper"] > canvas')).first();
    let pageLoaded = element.all(by.css('div[data-page-number="' + pageNumber + '"][data-loaded="true"]')).first();
    let textLayerLoaded = element.all(by.css('div[data-page-number="' + pageNumber + '"] div[class="textLayer"] > span')).first();
    let specificText = element.all(by.cssContainingText('div[data-page-number="' + pageNumber + '"] div[class="textLayer"] > span', text)).first();

    Util.waitUntilElementIsVisible(allPages);
    Util.waitUntilElementIsVisible(pageLoaded);
    Util.waitUntilElementIsVisible(textLayerLoaded);
    Util.waitUntilElementIsVisible(specificText);
  }

  checkCloseButtonIsDisplayed() {
    Util.waitUntilElementIsVisible(this.closeButton);
  }

  clickCloseButton() {
    Util.waitUntilElementIsVisible(this.closeButton);
    return this.closeButton.click();
  }

}
