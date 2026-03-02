const buckets = new Map<string, number[]>();

type RateLimitOptions = {
  key: string;
  windowMs: number;
  limit: number;
};

export function rateLimit({ key, windowMs, limit }: RateLimitOptions): boolean {
  const now = Date.now();
  const timestamps = buckets.get(key) ?? [];
  const fresh = timestamps.filter((value) => now - value < windowMs);

  if (fresh.length >= limit) {
    buckets.set(key, fresh);
    return false;
  }

  fresh.push(now);
  buckets.set(key, fresh);
  return true;
}
