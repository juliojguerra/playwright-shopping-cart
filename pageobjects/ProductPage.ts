import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  page: Page;
  colorDropdown: Locator;
  qtyInput: Locator;
  addToCartButton: Locator;
  itemsDropdown: Locator;
  viewCartLink: Locator;
  notificationAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.colorDropdown = page.getByRole("combobox", { name: "* Select" });
    this.qtyInput = page.getByLabel("qty");
    this.addToCartButton = page.getByRole("button", { name: "add to cart" });
    this.itemsDropdown = page.getByRole("button", { name: "item" });
    this.viewCartLink = page.getByRole("link", { name: "view cart" });
    this.notificationAlert = page.locator(".alert-success");
  }

  async verifyProductPageIsDisplayed(productName: string) {
    return await expect(this.getHeading(productName)).toBeVisible();
  }

  async selectColor(color: string) {
    await this.colorDropdown.selectOption({ value: color });
  }

  async fillQuantity(units: string) {
    await this.qtyInput.fill("");
    await this.qtyInput.type(units);
    await this.qtyInput.blur();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.addToCartButton.waitFor();
  }

  async verifyProductWasAddedToCart(productName: string) {
    await this.notificationAlert.waitFor();

    const notificationAlert = await this.page.getByText(
      `Success: You have added ${productName} to your shopping cart!`
    );

    await expect(notificationAlert).toBeVisible();
  }

  async viewCart() {
    await this.itemsDropdown.click();
    await this.viewCartLink.click();
  }

  getHeading(productName) {
    return this.page.getByRole("heading", { name: productName });
  }
}
