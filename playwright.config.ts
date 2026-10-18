import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		// own port instead of vite's default 4173, which other local projects often occupy;
		// no reuseExistingServer, so a busy port fails loudly instead of testing a foreign app
		command: 'npm run preview -- --port 4380 --strictPort',
		port: 4380,
		timeout: 120_000
	},
	testDir: 'e2e'
});
