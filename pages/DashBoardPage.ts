import { Page, Locator, expect } from "@playwright/test";

export class DashBoardPage {
  readonly page: Page;
  readonly newButton = () =>
    this.page.locator('[data-tag="SchedulerHeader__button-new"]');
  readonly appointmentOption = () =>
    this.page.locator('[data-tag="SchedulerHeader__item-appointment"]');
  readonly bookingWindow = () => this.page.locator(".BookingWindow");
  readonly walkInButton = () =>
    this.page.locator(".btn-violet-link", { hasText: "Walk In" });
  readonly categoryName = () =>
    this.page.locator('[data-bem="CategoryItem__name"]', {
      hasText: "Stripe Payment Responses",
    });
  readonly categoryList = () =>
    this.page.locator('[data-bem="ServiceCategory__category-list"]');
  readonly categoryServiceListName = () =>
    this.page.locator('[data-bem="ServiceItem__name"]', {
      hasText: "Fail with call_issuer",
    });
  readonly saveBookingButton = () =>
    this.page.locator('[data-bem="BookingSummary__save-button"]');
  readonly selectStylistButton = () =>
    this.page.getByText("Select Stylist", { exact: true });
  readonly firstStylist = () =>
    this.page.locator(".the-stylist-button").first();
  readonly selectedStylist = () =>
    this.page.locator(".the-stylist-button.selected");
  readonly selectTimeButton = () =>
    this.page.locator("div.show-edit-done", { hasText: "Select Time" });
  readonly timeSlotContainer = () => this.page.locator('[data-bem="TimeSlot"]');
  readonly timeSlot = () =>
    this.page.locator('.the-time-shape[data-slot-display="8:00 AM"]');
  readonly selectedTimeslot = () =>
    this.page.locator(".the-time-shape.selected");
  readonly clientButton = () =>
    this.page.locator('[data-tag="SchedulerHeader__today--gensearch"]');
  readonly addNewClientID = () =>
    this.page.locator("span", { hasText: "ADD A NEW CLIENT" });
  readonly saveNewClientButton = () =>
    this.page.locator('[data-tag="EditDetailsContainer__save-client-button"]');
  readonly newClientForm = () =>
    this.page.locator('[data-bem="EditDetailsContainer__bw-content"]');
  readonly clientName = () =>
    this.page.locator('[data-tag="EditDetailsContainer__client-name"] input');

  constructor(page: Page) {
    this.page = page;
  }

  async selectNewClientWalkInAppointment() {
    await this.page.waitForTimeout(300);
    await this.newButton().evaluate((el) => (el as HTMLElement).click());
    await this.page.waitForTimeout(300);
    await this.appointmentOption().waitFor({ state: "visible" });
    await this.appointmentOption().evaluate((el) =>
      (el as HTMLElement).click()
    );
    await expect(this.bookingWindow()).toBeVisible();
    await this.walkInButton().evaluate((el) => (el as HTMLElement).click());
    await this.categoryName().evaluate((el) => (el as HTMLElement).click());
    await expect(this.categoryList()).toBeVisible();
    await this.categoryServiceListName().evaluate((el) =>
      (el as HTMLElement).click()
    );
    await expect(this.saveBookingButton()).toBeVisible();
  }

  async selectStylist() {
    await this.selectStylistButton().evaluate((el) =>
      (el as HTMLElement).click()
    );
    await this.page.waitForTimeout(300);
    await this.firstStylist().evaluate((el) => (el as HTMLElement).click());
    await expect(this.selectedStylist()).toBeVisible();
  }

  async selectTime() {
    await this.page.waitForTimeout(300);
    await this.selectTimeButton().evaluate((el) => (el as HTMLElement).click());
    await this.timeSlotContainer().evaluate((el) => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    await expect(this.timeSlotContainer()).toBeVisible();
    await this.timeSlot().click({ force: true });
    await expect(this.selectedTimeslot()).toBeVisible();
  }

  async saveBooking() {
    await this.saveBookingButton().click({ force: true });
  }

  async addNewClient() {
    await this.clientButton().evaluate((el) => (el as HTMLElement).click());
    await this.page.waitForTimeout(300);
    await expect(this.addNewClientID()).toBeVisible();
    await this.page
      .getByText("ADD A NEW CLIENT", { exact: true })
      .evaluate((el) => (el as HTMLElement).click());
    await this.page.waitForTimeout(300);
    await expect(this.newClientForm()).toBeVisible();
    await expect(this.clientName()).toBeVisible();
  }

  async verifySaveNewClientButtonIsDisabled() {
    await expect(this.saveNewClientButton()).toHaveAttribute(
      "data-disabled",
      "true"
    );
  }
}
