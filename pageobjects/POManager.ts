import { DashboardPage } from "./DashboardPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { Page } from "@playwright/test";

export class POManager {
  page: Page;
  dashboardPage: DashboardPage;
  productPage: ProductPage;
  cartPage: CartPage;

  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
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
}
