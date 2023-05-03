import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  page: Page;
  pageTitle: Locator;
  guestCheckoutOption: Locator;
  continueButton: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  emailInput: Locator;
  telephoneInput: Locator;
  address1Input: Locator;
  cityInput: Locator;
  postCodeInput: Locator;
  countryDropdown: Locator;
  regionDropdown: Locator;
  billingDetailsTitle: Locator;
  deliveryCheckbox: Locator;
  deliveryMethodTitle: Locator;
  flatShippingRadioButton: Locator;
  paymentMethodTitle: Locator;
  bankTransferRadioButton: Locator;
  termsAndConditions: Locator;
  confirmOrderButton: Locator;

  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByRole("heading", {
      name: "Checkout",
      exact: true,
    });
    this.guestCheckoutOption = page.getByLabel("Guest Checkout");
    this.continueButton = page.getByRole("button", { name: "Continue" });

    this.billingDetailsTitle = page.getByText("Your Personal Details");
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.emailInput = page.getByRole("textbox", { name: "* E-Mail" });
    this.telephoneInput = page.getByLabel("Telephone");
    this.address1Input = page.getByLabel("Address 1");
    this.cityInput = page.getByLabel("City");
    this.postCodeInput = page.getByLabel("Post Code");
    this.countryDropdown = page.getByRole("combobox", { name: "Country" });
    this.regionDropdown = page.getByRole("combobox", {
      name: "Region / State",
    });
    this.deliveryCheckbox = page.getByLabel(
      "My delivery and billing addresses are the same."
    );
    this.deliveryMethodTitle = page.getByText(
      "Please select the preferred shipping method to use on this order."
    );
    this.flatShippingRadioButton = page.getByText("Flat Shipping Rate");
    this.paymentMethodTitle = page.getByText(
      "Please select the preferred payment"
    );
    this.bankTransferRadioButton = page.getByText("Bank Transfer");
    this.termsAndConditions = page.getByRole("checkbox");
    this.confirmOrderButton = page.getByRole("button", {
      name: "Confirm Order",
    });
  }

  async verifyCheckoutPageIsDisplayed() {
    await expect(this.pageTitle).toBeVisible();
  }

  async continueAsGuest() {
    await this.guestCheckoutOption.click();
    await this.continueButton.click();
  }

  async verifyBillingDetailsAreDisplayed() {
    await expect(this.billingDetailsTitle).toBeVisible();
  }

  async fillBillingDetails(
    firstName: string,
    lastName: string,
    email: string,
    telephone: string,
    address: string,
    city: string,
    codeInput: string,
    country: string
  ) {
    await this.firstNameInput.fill("");
    await this.firstNameInput.type(firstName);
    await this.lastNameInput.fill("");
    await this.lastNameInput.type(lastName);
    await this.emailInput.fill("");
    await this.emailInput.type(email);
    await this.telephoneInput.fill("");
    await this.telephoneInput.type(telephone);
    await this.address1Input.fill("");
    await this.address1Input.type(address);
    await this.cityInput.fill("");
    await this.cityInput.type(city);
    await this.postCodeInput.fill("");
    await this.postCodeInput.type(codeInput);
    await this.countryDropdown.selectOption(country);
    await this.regionDropdown.selectOption(city);
    await this.deliveryCheckbox.check();
    await this.continueButton.click();
  }

  async verifyDeliveryMethodIsDisplayed() {
    await expect(this.deliveryMethodTitle).toBeVisible();
  }

  async fillDeliveryMethod() {
    await this.flatShippingRadioButton.check();
    await this.continueButton.click();
  }

  async verifyPaymentMethodIsDisplayed() {
    await expect(this.paymentMethodTitle).toBeVisible();
  }

  async fillPaymentMethod() {
    await this.bankTransferRadioButton.check();
    await this.termsAndConditions.check();
    await this.continueButton.click();
  }

  async verifyConfirmOrderIsDisplayed(
    firstProductName: string,
    secondProductName: string,
    totalCost: string
  ) {
    const firstProductNameLocator = this.page.getByRole("link", {
      name: firstProductName,
    });

    const secondProductNameLocator = this.page.getByRole("link", {
      name: secondProductName,
    });

    const totalCostLocator = this.page.getByRole("cell", {
      name: totalCost,
    });

    await expect(firstProductNameLocator).toBeVisible();
    await expect(secondProductNameLocator).toBeVisible();
    await expect(totalCostLocator).toBeVisible();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
