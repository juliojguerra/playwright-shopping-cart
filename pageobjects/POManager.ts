import { DashboardPage } from "./DashboardPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { SuccessPage } from "./SuccessPage";
import { Page } from "@playwright/test";

export class POManager {
  page: Page;
  dashboardPage: DashboardPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  successPage: SuccessPage;

  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.successPage = new SuccessPage(page);
  }

  getDashboardPage() {
    return this.dashboardPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getSuccessPage() {
    return this.successPage;
  }
}
