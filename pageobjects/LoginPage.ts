import { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel("E-Mail Address");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async goto() {
    await this.page.goto(
      "https://opencart.abstracta.us/index.php?route=account/login"
    );
  }

  async validLogin(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.type(password);
    await this.loginButton.click();
    await this.page.waitForLoadState();
  }
}
