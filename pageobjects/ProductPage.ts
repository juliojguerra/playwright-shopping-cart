import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  page: Page;
  colorDropdown: Locator;
  qtyInput: Locator;
  addToCartButton: Locator;
  itemsDropdown: Locator;
  viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.colorDropdown = page.getByRole("combobox", { name: "* Select" });
    this.qtyInput = page.getByLabel("qty");
    this.addToCartButton = page.getByRole("button", { name: "add to cart" });
    this.itemsDropdown = page.getByRole("button", { name: "item" });
    this.viewCartLink = page.getByRole("link", { name: "view cart" });
  }

  async verifyProductPageIsDisplayed(productName: string) {
    return await expect(this.getHeading(productName)).toBeVisible();
  }

  async selectColor(color: string) {
    await this.colorDropdown.selectOption({ value: color });
  }

  async fillQuantity(units: string) {
    await this.qtyInput.fill("");
    await this.qtyInput.fill(units);
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForLoadState();
  }

  async verifyProductWasAddedToCart(productName: string) {
    await expect(
      this.page.getByText(
        `Success: You have added ${productName} to your shopping cart!`
      )
    ).toBeVisible();
  }

  async viewCart() {
    await this.itemsDropdown.click();
    await this.viewCartLink.click();
  }

  getHeading(productName) {
    return this.page.getByRole("heading", { name: productName });
  }
}
