import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#content div");
  }

  async goto() {
    await this.page.goto("http://opencart.abstracta.us/");
  }

  async addProductToCart(productName: string) {
    const productLocator = this.mainContent
      .filter({ hasText: productName })
      .nth(1)
      .locator("button:has-text('Add to Cart')");

    const count = await productLocator.count();

    if (count > 0) {
      //console.log("product exists");
      await productLocator.click();
    }
  }
}
