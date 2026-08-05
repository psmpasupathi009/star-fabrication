/** Race a promise against a timeout so public pages fail over to fallbacks quickly. */
export async function withTimeout<T>(
  promise: Promise<T>,
  ms = 4000,
  fallback?: T
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timer = setTimeout(() => reject(new Error("DB_TIMEOUT")), ms);
      }),
    ]);
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
