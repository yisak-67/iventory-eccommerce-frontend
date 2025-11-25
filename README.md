

---
title: "Frontend — Inventory E‑Commerce"
author: "Yisak Zemedu"
output: html_document
---

# Overview

This document explains how to run and develop the frontend part of the Inventory E‑Commerce project (React/Vite + Tailwind CSS).

# Prerequisites

- Node.js (v18+ recommended). Verify:
  - PowerShell:
    - node -v
    - npm -v
- Git (optional)

github projecte

# Install dependencies

Open PowerShell in the frontend folder and run:
```powershell
cd "C:\Users\A Y U B COMPUTERS\inventory_eccommerce\frontend"
npm install
```

If package.json is missing:
```powershell
npm init -y
npm install -D tailwindcss postcss autoprefixer
npm install
```

# Tailwind setup (recommended)

1. Create Tailwind entry CSS if missing:
```css
/* src/styles/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Initialize configs (use the local binary to avoid npx resolution issues):
```powershell
# from frontend folder
.\node_modules\.bin\tailwindcss.cmd init -p
```
If `.bin` is not present, install dev deps first:
```powershell
npm install -D tailwindcss postcss autoprefixer
```

3. Add scripts to `package.json` (example):
```json
// add under "scripts"
"build:css": "tailwindcss -i ./src/styles/tailwind.css -o ./public/dist/tailwind.css --minify",
"watch:css": "tailwindcss -i ./src/styles/tailwind.css -o ./public/dist/tailwind.css --watch",
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

Use npm exec if npx fails:
```powershell
npm exec -- tailwindcss -i .\src\styles\tailwind.css -o .\public\dist\tailwind.css --minify
npm run watch:css
```

# Development

Start CSS watcher and dev server in two terminals:

Terminal 1 (watch Tailwind):
```powershell
npm run watch:css
```

Terminal 2 (start app):
```powershell
npm run dev
```

Open the app at the address Vite prints (typically http://localhost:5173).

# Build for production

```powershell
npm run build
npm run build:css   # if you require a separate CSS build step
```

Ensure `public/dist/tailwind.css` is included in your production HTML.

# Troubleshooting

- "tailwindcss not recognized": check `node_modules/.bin/tailwindcss.cmd` exists; run via direct path or `npm exec`.
- Purged classes (production): ensure `tailwind.config.js` content globs include your templates:
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: { extend: {} },
  plugins: [],
}
```
- CSS link 404: confirm `public/dist/tailwind.css` exists and path in HTML is correct.

# Notes

Adjust file paths and package scripts to match your repo layout. For help updating package.json or adding the Tailwind files, provide permission to edit files in the workspace.
