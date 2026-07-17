import type { NextRequest } from "next/server";

// Rate-limit simple par IP, en mémoire — suffisant pour un process unique,
// non partagé entre instances serverless — à remplacer par un store partagé
// (Redis/Upstash) si le trafic le justifie. Partagé par toutes les routes
// publiques qui en ont besoin (chat, RSS…) : un compteur indépendant par
// route grâce à createRateLimiter(), jamais un seul compteur global.
export function createRateLimiter(windowMs: number, maxRequests: number) {
  const requestLog = new Map<string, number[]>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (timestamps.length >= maxRequests) {
      requestLog.set(ip, timestamps);
      return true;
    }
    timestamps.push(now);
    requestLog.set(ip, timestamps);
    return false;
  };
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
