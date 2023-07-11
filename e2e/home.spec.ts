import { test, expect } from "@playwright/test"

test("should navigate to the home page", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("/")
  // The page should contain a test id with "Get started by editing app/page.tsx"
  await expect(page.getByTestId("number-of-ticket")).toContainText(
    "Number of tickets:"
  )
})
