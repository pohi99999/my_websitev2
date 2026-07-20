export type RateWindow = { count: number; resetAtMs: number };
export const RATE_WINDOW_MS = 60 * 1000; // 1 minute
export const RATE_MAX = 20;
export const rateMemory = new Map<string, RateWindow>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const win = rateMemory.get(ip);
  if (!win || now > win.resetAtMs) {
    rateMemory.set(ip, { count: 1, resetAtMs: now + RATE_WINDOW_MS });
    return true;
  }
  if (win.count >= RATE_MAX) return false;
  win.count++;
  return true;
}
