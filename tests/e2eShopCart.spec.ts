import { test } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
import data from "../utils/productsTestData.json";

test("E2E Shop two items", async ({ page }) => {
  const poManager = new POManager(page);

  // Dashboard Page
  const dashboardPage = poManager.getDashboardPage();

  await dashboardPage.goto();
  await dashboardPage.addProductToCart(data.firstProductName);
  await dashboardPage.addProductToCart(data.secondProductName);

  // Product Page
  const productPage = poManager.getProductPage();

  await productPage.verifyProductPageIsDisplayed(data.secondProductName);
  await productPage.selectColor(data.colorOptions["Blue"]);
  await productPage.fillQuantity(data.secondProductQty);
  await productPage.addToCart();
  await productPage.verifyProductWasAddedToCart(data.secondProductName);
  await productPage.viewCart();

  // Shopping Cart Page
  const cartPage = poManager.getCartPage();

  await cartPage.verifyProductsWereAdded(
    data.firstProductName,
    data.firstProductPrice,
    data.secondProductName,
    data.secondProductPrice,
    Object.keys(data.colorOptions)[1]
  );

  await cartPage.checkout();

  // Checkout Page
  const checkoutPage = poManager.getCheckoutPage();

  await checkoutPage.verifyCheckoutPageIsDisplayed();
  await checkoutPage.continueAsGuest();
  await checkoutPage.verifyBillingDetailsAreDisplayed();
  await checkoutPage.fillBillingDetails(
    data.firstName,
    data.lastName,
    data.email,
    data.telephone,
    data.address,
    data.city,
    data.codeInput,
    data.country
  );

  await checkoutPage.verifyDeliveryMethodIsDisplayed();
  await checkoutPage.fillDeliveryMethod();
  await checkoutPage.verifyPaymentMethodIsDisplayed();
  await checkoutPage.fillPaymentMethod();
  await checkoutPage.verifyConfirmOrderIsDisplayed(
    data.firstProductName,
    data.secondProductName,
    data.totalCost
  );
  await checkoutPage.confirmOrder();

  // Success Page
  const successPage = poManager.getSuccessPage();

  await successPage.verifySuccessPageIsDisplayed();
});
