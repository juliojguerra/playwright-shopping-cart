import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://opencart.abstracta.us/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Your Store/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://opencart.abstracta.us/");

  // Click the get started link.
  await page.getByRole("link", { name: "Shopping Cart" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*route=checkout\/cart/);
});
