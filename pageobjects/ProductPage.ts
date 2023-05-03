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
    await this.qtyInput.type(units);
    await this.qtyInput.blur();
  }

  async addToCart() {
    try {
      const [response] = await Promise.all([
        this.page.waitForResponse(
          (res) =>
            res.status() === 200 &&
            res.url() ===
              "http://opencart.abstracta.us/index.php?route=checkout/cart/add",
          { timeout: 15000 } // 10 seconds timeout
        ),
        this.addToCartButton.click(),
      ]);

      if (!response) {
        throw new Error("Expected response not received.");
      }
    } catch (error) {
      console.error("Failed to add the product to the cart:", error);
      throw error;
    }
  }

  async verifyProductWasAddedToCart(productName: string) {
    const notificationLocator = this.page.locator(".alert-success");
    await notificationLocator.waitFor();

    const notificationMessage = await this.page.getByText(
      `Success: You have added ${productName} to your shopping cart!`
    );

    await expect(notificationMessage).toBeVisible();
  }

  async viewCart() {
    await this.itemsDropdown.click();
    await this.viewCartLink.click();
  }

  getHeading(productName) {
    return this.page.getByRole("heading", { name: productName });
  }
}
