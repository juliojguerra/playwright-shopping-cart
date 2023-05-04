import { expect, Locator, Page } from "@playwright/test";

export class WishlistPage {
  page: Page;
  title: Locator;

  constructor(page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Account", exact: true });
  }

  async verifyWishlistPageIsDisplayed() {
    await expect(this.title).toBeVisible();
    await expect(this.page).toHaveURL(/.*route=account\/wishlist/);
  }

  async verifyProductWasAddedToWishlist(productName: string) {
    const productLocator = this.page.getByText(productName).last();

    expect(productLocator).toBeVisible();
  }
}
