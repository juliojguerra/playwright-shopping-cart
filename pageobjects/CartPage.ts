import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductsWereAdded(
    firstProductName: string,
    secondProductName: string,
    secondProductColor: string
  ) {
    const firstProductLocator = await this.page.getByRole("cell", {
      name: `${firstProductName} Reward Points`,
    });

    const secondProductLocator = await this.page.getByRole("cell", {
      name: `${secondProductName} Select: ${secondProductColor}`,
    });

    await expect(firstProductLocator).toBeVisible();
    await expect(secondProductLocator).toBeVisible();
  }
}
