# Learnings from Token Vulnerability Fix

- **Middleware in Next.js:** Runs in the Edge runtime, meaning Node.js built-ins like `Buffer` are not available globally. `atob` and `btoa` should be used for base64 encoding/decoding.
- **Testing Authentication:** When modifying authentication logic, test it by passing proper `Authorization` headers (e.g. `Basic` and `Bearer`) instead of using URL tokens which are susceptible to exposure.
