// scripts/build-ci.js
// CI-only hardening for Vite/PostCSS url hashing that sometimes reaches for `crypto.hash`
(() => {
  const g = globalThis;

  // Try to remove any global webcrypto that might confuse deps
  try { delete g.crypto; } catch {}

  const nodeCrypto = require('node:crypto');

  // Provide a minimal shim so code that does `crypto.hash('sha256', data)` works.
  g.crypto = {
    subtle: undefined,
    getRandomValues: undefined,
    hash: (algo, input) => {
      const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
      return nodeCrypto.createHash(algo).update(buf).digest();
    }
  };
})();

(async () => {
  const { build } = await import('vite');
  await build();
})();