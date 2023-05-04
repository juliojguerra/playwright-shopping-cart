import { DashboardPage } from "./DashboardPage";
import { ProductPage } from "./ProductPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { SuccessPage } from "./SuccessPage";
import { LoginPage } from "./LoginPage";
import { WishlistPage } from "./WishlistPage";
import { Page } from "@playwright/test";

export class POManager {
  page: Page;
  dashboardPage: DashboardPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  successPage: SuccessPage;
  loginPage: LoginPage;
  wishlistPage: WishlistPage;

  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.successPage = new SuccessPage(page);
    this.loginPage = new LoginPage(page);
    this.wishlistPage = new WishlistPage(page);
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

  getLoginPage() {
    return this.loginPage;
  }

  getWishlistPage() {
    return this.wishlistPage;
  }
}
