import { by, element } from "protractor";

export class AdfAppPage {

  getToolbar() {
    return element(by.tagName('adf-toolbar'));
  }
}
