/**
 * ==========================================
 * @module Loriel Next.js Micro-WAF
 * @author Bora Dogan (github.com/LorieL06)
 * @description Zero-config rate limiter for Next.js App Router (no redis falan needed)
 * ==========================================
 * 
 * --- contribution ledger (time spent) ---
 * [format: name - hours - scope]
 * 1. Bora Dogan  - 3h - Core In-Memory Store & Rate Limiter Logic
 * 2. 
 * ==========================================
 */

interface RateLimitRecord {
    count: number;
    lastReset: number;
}

// ın-memory store: Perfect for serverless single-region or edge middlewares
const store = new Map<string, RateLimitRecord>();

export interface WafOptions {
    limit?: number;     // kaç isteğe izin verilecek (def: 5)
    windowMs?: number;  // ne kadar sürede (def: 60 saniye)
}

/**
 * validates and limits incoming requests based on a unique identifier (IP, Session ID, etc.)
 */
export function enforceRateLimit(identifier: string, options: WafOptions = {}): boolean {
    if (!identifier) return false;

    const limit = options.limit || 5;
    const windowMs = options.windowMs || 60000;
    const now = Date.now();

    const record = store.get(identifier) || { count: 0, lastReset: now };

    // zaman penceresi dolduysa sıfırla
    if (now - record.lastReset > windowMs) {
        record.count = 0;
        record.lastReset = now;
    }

    // limit aşıldıysa engelle
    if (record.count >= limit) {
        console.warn(`[LorieL WAF] Rate limit exceeded for identifier: ${identifier} 🚨🚨🚨`);
        return false; // blokla
    }

    // isteği kaydet ve izin ver
    record.count++;
    store.set(identifier, record);
    return true; // izin ver
}

/**
 * clears the in-memory store useful for test environments
 */
export function clearWafMemory(): void {
    store.clear();
    console.log('[LorieL WAF] Memory cleared.');
}