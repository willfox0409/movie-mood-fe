# Debugging Pivot Checklist (Frontend/CI)

A quick reference for “why won’t CI build?!” moments — especially for Vite, Tailwind, PostCSS, DaisyUI setups.

---

## 1) Reproduce + Read
- Run the exact CI build command locally:
    ```
    npm run build
    ```
- Copy the exact stack lines (file + line number).
- If local passes but CI fails → suspect environment or inputs.

---

## 2) Parity Check (CI vs Local)
- Check Node/npm versions:
    ```
    node -v
    npm -v
    ```
- Inspect dependency tree in CI:
    ```
    npm ls vite
    npm ls postcss
    npm ls tailwindcss
    npm ls daisyui
    ```
- Use `npm ci` and commit `package-lock.json` to lock versions.

---

## 3) Minimal Surface Area
- Comment out the minimal suspicious code the stack points to (one CSS rule, one import, one plugin).
- If the error disappears → fix/remove that code, then revert unrelated changes.

---

## 4) Assets & CSS Gotchas
- For `url(...)` errors in CSS:
  - Prefer `public/` + absolute path (`/foo.png`) for static assets.
  - Or import the asset in JS and apply via inline style or a CSS variable.
  - If truly needed, you can disable URL processing: `vite.config.js → css: { url: false }`.

---

## 5) Config Sanity
- Inspect `vite.config.js`, `postcss.config.js`, `tailwind.config.js` for unusual plugins or aliases.
- Temporarily remove one plugin at a time (Tailwind/DaisyUI/PostCSS extras) to isolate.

---

## 6) Environment Probes (CI Only)
Add a one-off step in CI to inspect `crypto` or other globals:
    ```
    - run: |
        node -e "console.log('crypto present?', !!globalThis.crypto)"
        node -e "console.log('createHash?', !!require('node:crypto').createHash)"
    ```
If browser-style globals appear, a polyfill/collision is likely.

---

## 7) Rollback Points
- Pin exact versions of build tooling (Vite, PostCSS, Tailwind, DaisyUI).
- Remove unrelated dependencies from `dependencies`.
- Keep a clean branch for the fix; avoid mixing feature work.

---

## 8) When to Pivot (Rule of 3)
If you try three targeted fixes and the error is unchanged:
1. Stop.
2. Paste implicated files/configs.
3. Share exact logs + CI “Print versions” output.
4. Ask: “Are we even using this file?” “Can we delete or bypass it?”

---

## 9) Good “Context Bundle” to Share
- Error block + top 10 stack lines.
- `vite.config.js`, `postcss.config.js`, `tailwind.config.js`.
- File/lines named in the stack (e.g., `index.css` snippet).
- Build-related deps from `package.json`.
- CI workflow steps.

---

## 10) Finalize
- After fixing, remove hacks (unless they’re part of the solution).
- Keep the version pins that stabilized the build.

---

**Pro tip:** Many CSS build errors point to unused files or assets. Before deep-diving config, ask: “Is this even used in the app?”