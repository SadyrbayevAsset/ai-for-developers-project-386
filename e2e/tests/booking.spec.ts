import { test, expect } from "@playwright/test";

test("guest can book a slot and owner sees it", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("admin-link").click();
  await expect(page).toHaveURL(/\/admin/);

  await page.getByTestId("meeting-type-name-input").fill("Консультация");
  await page.getByTestId("meeting-type-description-input").fill("15 минут");
  await page.getByTestId("meeting-type-duration-input").fill("15");
  await page.getByTestId("create-meeting-type-button").click();

  await expect(page.getByText("Консультация")).toBeVisible();

  await page.goto("/");
  await page.getByTestId("booking-cta").click();
  await expect(page).toHaveURL(/\/booking/);

  await page.getByText("Консультация").click();
  await expect(page).toHaveURL(/\/booking\/.*\/slots/);

  const slotButton = page.locator('[data-testid^="slot-"]').first();
  await slotButton.click();
  await expect(page).toHaveURL(/\/booking\/.*\/slots\/.*/);

  await page.getByTestId("guest-name-input").fill("Анна");
  await page.getByTestId("guest-email-input").fill("anna@example.com");
  await page.getByTestId("confirm-booking-button").click();

  await expect(page.getByText("Запись подтверждена")).toBeVisible();

  await page.goto("/admin");
  await expect(page.getByText("Анна")).toBeVisible();
});
