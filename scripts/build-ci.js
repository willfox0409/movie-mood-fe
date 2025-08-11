// Nuke global webcrypto for the entire Vite/PostCSS process
delete globalThis.crypto;

const { build } = await import('vite');
await build();