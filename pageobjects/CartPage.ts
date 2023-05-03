import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  page: Page;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("link", {
      name: "Checkout",
      exact: true,
    });
  }

  async verifyProductsWereAdded(
    firstProductName: string,
    firstProductPrice: string,
    secondProductName: string,
    secondProductPrice: string,
    secondProductColor: string
  ) {
    const firstProductLocator = await this.page.getByRole("cell", {
      name: `${firstProductName} Reward Points`,
    });

    const firstProductPriceLocator = await this.page
      .getByRole("cell", { name: firstProductPrice })
      .nth(1);

    const secondProductLocator = await this.page.getByRole("cell", {
      name: `${secondProductName} Select: ${secondProductColor}`,
    });

    const secondProductPriceLocator = await this.page
      .getByRole("cell", { name: secondProductPrice })
      .nth(1);

    await expect(firstProductLocator).toBeVisible();
    await expect(secondProductLocator).toBeVisible();
    await expect(firstProductPriceLocator).toBeVisible();
    await expect(secondProductPriceLocator).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
