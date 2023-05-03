import { test, expect, Locator } from "@playwright/test";

export class SuccessPage {
  page: Locator;
  title: Locator;
  continueButton: Locator;

  constructor(page) {
    this.page = page;
    this.title = page.getByRole("heading", {
      name: "Your order has been placed!",
    });
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async verifySuccessPageIsDisplayed() {
    await this.title.waitFor();

    const isTitleVisible = await this.title.isVisible();
    const isContinueButtonVisible = await this.continueButton.isVisible();

    expect(isTitleVisible).toBeTruthy();
    expect(isContinueButtonVisible).toBeTruthy();
  }
}
