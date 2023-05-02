import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  pageTitle: Locator;

  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", {
      name: "Checkout",
      exact: true,
    });
  }

  async verifyCheckoutPageIsDisplayed() {
    await expect(this.pageTitle).toBeVisible();
  }
}
