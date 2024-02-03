import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // Expect a title "to contain" a substring.

  //get teh sign in button

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("neeraj@mailinator.com");
  await page.locator("[name=password]").fill("Admin@123");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Logged In Successfully ")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${
    Math.floor(Math.random() * 90000) + 10000
  }@mailinator.com`;

  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(page.getByRole("heading", { name: "Create" })).toBeVisible();

  await page.locator("[name=firstName]").fill("Neeraj");
  await page.locator("[name=lastName]").fill("Singh");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("Admin@123");
  await page.locator("[name=confirmPassword]").fill("Admin@123");

  await page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText("Registration Success ")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
