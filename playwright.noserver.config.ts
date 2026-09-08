// Server-less run for tests that import handlers directly (no webServer).
import { defineConfig } from "@playwright/test";
export default defineConfig({ testDir: "./tests", testMatch: /middleware-analytics-auth\.spec\.ts|api-kpi-snapshot\.spec\.ts|api-analytics-kpi-config-route\.spec\.ts/, reporter: "list" });
