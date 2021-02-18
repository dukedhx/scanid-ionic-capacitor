import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/scanid');
    });
    it('should have button', () => {
      expect(page.getButtonText()).toContain('capture')
    });
  });
});
