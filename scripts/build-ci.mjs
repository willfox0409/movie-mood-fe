// scripts/build-ci.mjs

// CI-only hardening for Vite/PostCSS url hashing that sometimes reaches for `crypto.hash`
import { webcrypto as nodeWebcrypto, createHash } from 'node:crypto';

// Nuke any pre-existing webcrypto that might confuse deps
try { delete globalThis.crypto; } catch {}

// Provide a minimal shim so code that does `crypto.hash('sha256', data)` works.
// We emulate `hash(algo, data)` -> Buffer
globalThis.crypto = {
  subtle: undefined,
  getRandomValues: undefined,
  hash: (algo, input) => {
    const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
    return createHash(algo).update(buf).digest();
  },
  // Optional: expose webcrypto if something probes for it but doesn’t depend on subtle
  ...nodeWebcrypto, // safe to spread; consumers checking `crypto.subtle` will still see undefined above
};

const { build } = await import('vite');
await build();