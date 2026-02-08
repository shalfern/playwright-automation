import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  use: {
    baseURL: "https://staging-salon.getslick.com",
    headless: false,
    browserName: "chromium",
  },
});
