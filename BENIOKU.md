<div align="center">
  <h1> 𝓖𝓪𝔃𝓲 𝓜. 𝓚𝓮𝓶𝓪𝓵 </h1>
</div>

# loriel-micro-waf

A zero-dependency, in-memory rate limiter and micro-WAF for Next.js Server Actions and API Routes. 
Protects your database and wallet from brute-force and spam bots without requiring Redis.

## TR

Next.js Server Action ve API rotalarınız için hiçbir bağımlılık (Redis vb.) gerektirmeyen, doğrudan RAM üzerinde çalışan hafif bir güvenlik duvarı ve istek sınırlayıcı. Veritabanınızı spam ve brute-force saldırılarından korur. (Öyle tahmin ediyorum.)

## Usage

```typescript
import { enforceRateLimit } from 'loriel-next-waf';

export async function myServerAction() {
    // In Next.js, you can get IP from headers()
    const userIP = "192.168.1.1"; 

    // Block if more than 5 requests in 60 seconds
    if (!enforceRateLimit(userIP, { limit: 5, windowMs: 60000 })) {
        throw new Error("Too many requests. Please wait.");
    }

    return "Success! Form submitted.";
}