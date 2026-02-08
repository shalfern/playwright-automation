import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashBoardPage } from "../pages/DashBoardPage";

test.describe.configure({ mode: "serial" });

test.describe("Dashboard page Actions", () => {
  let page: Page;
  let dashboardPage: DashBoardPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(
      process.env.LOGIN_EMAIL!,
      process.env.LOGIN_PASSWORD!,
      process.env.LOGIN_PIN!
    );
    dashboardPage = new DashBoardPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Book appointment successfully", async () => {
    await dashboardPage.selectNewClientWalkInAppointment();
    await dashboardPage.selectStylist();
    await dashboardPage.selectTime();
    await dashboardPage.saveBooking();
  });

  test("Should prevent saving a new client when mandatory fields are empty", async () => {
    await dashboardPage.addNewClient();
    await dashboardPage.verifySaveNewClientButtonIsDisabled();
  });
});
