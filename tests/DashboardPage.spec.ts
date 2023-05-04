import { test } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
import data from "../utils/productsTestData.json";

test.describe("@dashboardPage tests", () => {
  test("Add product to favorites", async ({ page }) => {
    const productName = data.firstProductName;

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    await loginPage.goto();
    await loginPage.validLogin(data.user.email, data.user.password);

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.goto();

    await dashboardPage.addProductToFavorites(productName);

    await dashboardPage.verifyProductWasAddedToFavoritesNotification(
      productName
    );

    await dashboardPage.visitWishlistPage();

    const wishlistPage = poManager.getWishlistPage();

    await wishlistPage.verifyWishlistPageIsDisplayed();
    await wishlistPage.verifyProductWasAddedToWishlist(productName);
  });
});
