import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(destination) {
    return browser.get(destination);
  }

  getButtonText() {
    return element(by.deepCss('app-root ion-button')).getText();
  }
}
