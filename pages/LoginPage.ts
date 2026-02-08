import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly pinKeyboard: Locator;

  readonly DIGIT_INDEX: Record<string, number> = {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    "0": 9,
  };

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-pw-id="UserEmail"]');
    this.passwordInput = page.locator('[data-pw-id="PasswordInput"]');
    this.loginButton = page.locator('[data-pw-id="login"]');
    this.pinKeyboard = page.locator(".PinForm_keyboardButtons__qtr6A");
  }

  async gotoLogin() {
    await this.page.goto("/salon/#/login");
  }

  async enterLoginDetails(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForPinScreen() {
    await expect(this.pinKeyboard).toBeVisible();
  }

  async enterPin(pin: string) {
    await this.page.locator(".PinForm_keyboardButtons__qtr6A").waitFor();
    for (const digit of pin) {
      await this.page
        .locator(".PinForm_keyButton__SHoZT")
        .nth(this.DIGIT_INDEX[digit])
        .evaluate((el) => (el as HTMLElement).click());
      await this.page.waitForTimeout(300);
    }
  }

  async login(email: string, password: string, pin = "3064") {
    await this.gotoLogin();
    await this.enterLoginDetails(email, password);
    await this.waitForPinScreen();
    await this.enterPin(pin);
  }
}
