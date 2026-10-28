<div align="center">
  <h1> 𝓖𝓪𝔃𝓲 𝓜. 𝓚𝓮𝓶𝓪𝓵 </h1>
</div>

##WARNING
I forgot to run `npm build`. You can download the project, open a Command Prompt in the main folder, and run the command `npm i & npm run build` to get the output. I don’t think anyone using this project would need to know this, but we’re in the age of AI's, so we need to consider everyone. :)

##UYARI
`npm build` komutunu çalıştırmayı unutmuşum. Projeyi indirebilir, ana klasörde bir Komut İstemi açabilir ve `npm i & npm run dev` komutunu çalıştırarak çıktıyı alabilirsiniz. Bu projeyi kullanan kimsenin bunu bilmesi gerektiğini sanmıyorum, ancak yapay zeka çağındayız, bu yüzden herkesi dikkate almamız gerekiyor.

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
