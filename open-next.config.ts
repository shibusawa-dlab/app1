import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Minimal OpenNext config for Cloudflare Workers.
// No incremental cache override — ISR/cache is not used by this site.
export default defineCloudflareConfig({});
