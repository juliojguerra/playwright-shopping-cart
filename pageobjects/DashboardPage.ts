import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  mainContent: Locator;
  wishList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#content div");
    this.wishList = page.getByRole("link", { name: "Wish List" }).first();
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
      await productLocator.click();
    }
  }

  async addProductToFavorites(productName: string) {
    const wishlistLocator = this.mainContent
      .filter({ hasText: productName })
      .nth(1)
      .locator(
        "button[type='button'][data-toggle='tooltip'][data-original-title='Add to Wish List']"
      );

    const count = await wishlistLocator.count();

    if (count > 0) {
      await Promise.all([
        this.page.waitForResponse(
          (res) =>
            res.status() === 200 &&
            res.url() ===
              "http://opencart.abstracta.us/index.php?route=account/wishlist/add",
          { timeout: 15000 } // 15 seconds timeout
        ),
        wishlistLocator.click(),
      ]);
    }
  }

  async verifyProductWasAddedToFavoritesNotification(productName: string) {
    const notificationLocator = this.page.getByText(
      `Success: You have added ${productName} to your wish list!`
    );
    await expect(notificationLocator).toBeVisible();
  }

  async visitWishlistPage() {
    await this.wishList.click();
  }
}
