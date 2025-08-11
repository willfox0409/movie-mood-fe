// scripts/build-ci.mjs
import { createHash } from 'node:crypto';

function logCrypto(phase) {
  const c = globalThis.crypto;
  const keys = c ? Object.getOwnPropertyNames(c).sort().join(', ') : '(none)';
  console.log(`[build-ci] ${phase} | crypto present?`, !!c, '| keys:', keys);
}

// BEFORE we touch anything
logCrypto('BEFORE');

// Install an immutable crypto with a Node-backed hash()
const shim = {
  subtle: undefined,          // force libs to avoid webcrypto path
  getRandomValues: undefined, // not needed for build
  hash: (algo, input) => {
    const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
    return createHash(algo).update(buf).digest();
  },
};

Object.defineProperty(globalThis, 'crypto', {
  value: Object.freeze(shim),
  writable: false,
  configurable: false,
  enumerable: true,
});

logCrypto('AFTER SET');

// Run the Vite build
const { build } = await import('vite');
await build();