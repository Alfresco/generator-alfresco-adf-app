import { AdfAppPage } from './app.po';

describe('adf-app App', () => {
  let page: AdfAppPage;

  beforeEach(() => {
    page = new AdfAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
