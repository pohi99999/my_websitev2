# 🧪 Add tests for useRichMediaEnabled hook

🎯 **What:**
Added automated testing for the `useRichMediaEnabled` custom React hook. Because the project utilizes Playwright as an E2E testing solution without specific hook-testing libraries (like `@testing-library/react`), the hook is tested indirectly through the `SequentialVideoBackground` component which utilizes it on the homepage. This approach verifies the logic safely without requiring modifications to production components or stubbing React internals.

📊 **Coverage:**
The tests effectively mock the browser environment features (`prefers-reduced-motion`, `navigator.connection.saveData`, and undefined behaviors) using `page.emulateMedia` and `page.addInitScript`. Tested scenarios include:
1. Video is rendered when rich media is enabled (no preferences set).
2. Video is hidden and fallback shown when user prefers reduced motion.
3. Video is hidden and fallback shown when `saveData` is enabled in connection settings.
4. Video gracefully handles environments where `navigator.connection` object doesn't exist.

✨ **Result:**
Increased testing coverage ensuring accessibility and performance-conscious UI features won't regress in future modifications, providing a safety net for developers.
