# Jona Setiawan Portfolio

Static desktop-style portfolio website for Jona Setiawan. The site is built with plain HTML, CSS, and JavaScript, with Firebase used for optional live data features such as Firestore projects, guestbook messages, user profiles, avatar uploads, and hosted photography images.

This README is written as a handoff note for the next AI or developer who continues the project.

## Quick Start

There is no package manager, build step, or framework.

Run the site from a local static server so module scripts, Firebase Auth, Firestore, and iframes behave correctly:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

Opening files directly with `file://` can work for basic HTML/CSS previewing, but Firebase and some browser features may fail.

## Current Main Experience

The active homepage is:

- `index.html`
- `desktop-layout.css`
- `desktop-layout.js`

The homepage is a Windows/macOS-style desktop portfolio. It contains draggable/resizable windows for About, Projects, Skills, Experience, Achievement, Certifications, Browser, and Guestbook. Project links are opened inside an in-page browser iframe window when possible.

Current homepage highlights:

- premium frosted-glass About workspace inspired by a futuristic OS dashboard
- scrollable latest-project cards inside the About window, currently showing 7 project previews
- shared OS-style window controls for About, Portfolio Browser, and Guestbook
- About-only cinematic close/minimize motion system with reduced-motion fallbacks
- Firebase-backed desktop Guestbook window using Firestore live updates and anonymous Auth
- local desktop Furina/Webmeji-style mascot behavior

Important: the root `index.html` currently loads `desktop-layout.js` and `desktop-guestbook-firebase.js`. Older shared scripts such as `admin-panel.js`, `testimonials-guestbook.js`, `theme-controls.js`, and `zoom-controls.js` are still used by other pages or kept for prior site versions, but they are not loaded on the current desktop homepage unless added manually.

## Repository Map

```text
.
+-- index.html                         # Main desktop portfolio entry
+-- desktop-layout.css                 # Main desktop UI styling
+-- desktop-layout.js                  # Window system, browser tabs, explorer data, window motion, Furina desktop sprite
+-- desktop-guestbook-firebase.js      # Firebase-backed Guestbook for the desktop homepage
+-- certification.html                 # Certification archive page
+-- changelog.html                     # Dated changelog page
+-- CODEX_SPEC.md                      # Codex-ready rebuild specification
+-- ARCHITECTURE_NOTES.md              # Architecture map and phased implementation notes
+-- project/
|   +-- pages/                         # Portfolio project detail pages
|   +-- scripts/photography-archive.js # Photography archive data model
|   +-- assets/                        # Local project images, PDFs, cursors, source files
+-- webmeji-main/                      # Webmeji/Shimeji-style mascot engine and sprite assets
+-- firebase-config.js                 # Browser Firebase SDK setup
+-- admin-panel.js                     # Firestore project admin panel logic for older/main portfolio UI
+-- testimonials-guestbook.js          # Firebase guestbook, auth, profile, avatar upload logic
+-- project-card-utils.js              # Shared dynamic project card generator
+-- language-controls.js               # ID/EN language toggle and translations
+-- theme-init.js                      # Early theme bootstrap
+-- theme-controls.js                  # Theme persistence and theme button syncing
+-- theme-palettes.css                 # Shared theme tokens and cross-page theme styles
+-- zoom-controls.js / zoom-controls.css
+-- performance-utils.js               # Lazy/image performance helpers
+-- performance-sw.js                  # Service worker cache helper
+-- firestore.rules                    # Firestore security rules
+-- storage.rules                      # Firebase Storage security rules
+-- FIREBASE_SECURITY.md               # Extra Firebase security notes
```

There are duplicated `webmeji-main/webmeji-main/` files and sprite folders. Treat the top-level `webmeji-main/config.js`, `webmeji-main/webmeji.js`, and `webmeji-main/Furina/` as the active copy used by most pages.

## Main Code Areas

### Desktop Homepage

`desktop-layout.js` is the brain of the current homepage.

It handles:

- opening, focusing, closing, maximizing, dragging, and resizing desktop windows
- taskbar recent-window buttons
- browser tabs inside `#window-browser`
- intercepting `.html` and external links and opening them in the portfolio browser
- File Explorer-style project/certification/skill/photography preview data
- About window dissolve/minimize motion helpers and reduced-motion fallbacks
- animated Furina sprite that walks/climbs/sits around the desktop windows
- the clock in the menu bar

The desktop Firebase Guestbook is handled by `desktop-guestbook-firebase.js`. `desktop-layout.js` still contains an older localStorage fallback, but it intentionally skips the current Guestbook form because `index.html` marks it with `data-guestbook-source="firebase"`.

The desktop explorer data is hardcoded in `portfolioData` inside `desktop-layout.js`. If you add a new project to the desktop explorer, update both:

- the visible project card markup in `index.html`
- the related `portfolioData.projects.folders` entry in `desktop-layout.js`

The About window also has its own latest-project preview cards in `index.html` under `.about-project-scroll`. Keep that list in sync with important project additions if the About window should stay current.

### About Workspace

The current About window is the visual foundation for the newer OS direction.

Important pieces:

- Markup: `#window-about` in `index.html`
- Styling: About-specific glassmorphism, latest project cards, and motion clone styles in `desktop-layout.css`
- Motion hooks: `dissolveWindow()`, `genieMinimizeWindow()`, `minimizeWindow()`, and `closeWindow()` in `desktop-layout.js`

The right panel uses `.about-project-scroll` and contains 7 latest project cards:

1. Personal GFX Design Collection
2. Designer Bag on IKM
3. Honkai: Star Rail E-Money
4. Lariso Brand Identity
5. Documentary Kota Tua UKK
6. Logo Design Collection
7. Marketing & Assistant HR

Each card uses a real image preview and a status pill such as `Still Going` or `Completed`.

### Window Controls

The newer premium OS controls use SVG icons inside `.traffic` buttons:

- `data-window-minimize`
- `data-window-maximize`
- `data-window-close`

About, Portfolio Browser, and Guestbook currently use the newer three-button control set. Dynamically-created browser windows also use the same SVG controls from `createBrowserWindowElement()` in `desktop-layout.js`.

### Project Pages

Project detail pages live in `project/pages/`.

Most pages are standalone HTML files with inline page-specific CSS and JavaScript. They usually load these shared helpers near the bottom:

- `../../language-controls.js`
- `../../theme-controls.js`
- `../../zoom-controls.js`
- `../../webmeji-main/config.js`
- `../../webmeji-main/webmeji.js`

When creating a new project page, follow the path style already used in `project/pages/*.html`: assets should usually reference `../assets/...`, while shared root scripts use `../../...`.

### Photography Archive

The photography page is data-driven:

- Page: `project/pages/photography.html`
- Data: `project/scripts/photography-archive.js`

`photography-archive.js` defines `window.photographyArchive`, an array of entries with this shape:

```js
{
  year: 2026,
  slug: "example-slug",
  title: "Project Title",
  dateLabel: "January 2026",
  projectType: "Client Event Documentation",
  location: "Short context",
  description: "Short archive description",
  folderLink: "https://drive.google.com/...", // optional
  coverImage: buildStorageMediaUrl("photography/.../cover.JPG"),
  images: buildSortImages("photography/.../", ["file1.JPG", "file2.JPG"]),
  sorts: [/* optional sub-gallery groups */]
}
```

The image URLs point to Firebase Storage public media URLs. Add new Firebase Storage image paths to `photography-archive.js`; do not manually paste long Firebase download URLs unless needed.

### Certification Archive

The certification page is mostly static:

- Page: `certification.html`
- Files: `project/assets/certification-files/`

To add a certificate, add a new `.certificate-card` in `certification.html` and place the file under `project/assets/certification-files/`. Update the card's `data-category` and `data-type` so search/filter UI continues to work.

### Language System

`language-controls.js` injects a floating `ID / ENG` language toggle and stores the selected language in:

```text
localStorage key: portfolio-language
```

It translates using two methods:

- keyed elements: `data-i18n-key` or `data-i18n-html-key`
- exact text replacement from the large `textPairs` and `attributePairs` maps

For new text on shared/project pages, the cleanest approach is to add either:

```html
<span data-i18n-key="new-key">English text</span>
```

and then define the key in `keyedTranslations`, or add exact text pairs to `textPairs`.

### Theme System

Shared theme state is handled by:

- `theme-init.js`
- `theme-controls.js`
- `theme-palettes.css`

Theme selection is stored in:

```text
localStorage key: portfolio-color-theme
```

Supported values are currently:

- `blue`
- `light`
- `galaxy`

Pages that need shared theme support should load `theme-init.js` in the `<head>` before styles, then load `theme-controls.js` near the bottom.

### Zoom System

`zoom-controls.js` expects the page to include the `#page-zoom-control` markup. It writes:

```css
body {
  --page-zoom: 0.8;
}
```

The current script defaults to `80%`, with a 60-120 range. Some pages include per-page `data-zoom-storage-key` attributes, but the current script uses the shared key internally:

```text
localStorage key: portfolio-shared-page-zoom
```

### Webmeji / Furina Mascot

Active files:

- `webmeji-main/config.js`
- `webmeji-main/webmeji.js`
- `webmeji-main/webmeji.css`
- `webmeji-main/Furina/*.png`

`config.js` defines `window.SPAWNING` and the `FURINA_CONFIG` animation/action map. `webmeji.js` preloads frames, creates the sprite, then runs movement, falling, drag, pet, edge, and mouse-chase behavior.

The desktop homepage also has a separate simplified Furina sprite implemented directly in `desktop-layout.js` and `desktop-layout.css`. So there are two mascot systems:

- desktop homepage: custom built into `desktop-layout.js`
- project/certification/changelog pages: shared Webmeji engine

## Firebase Data Model

Firebase web app setup is in `firebase-config.js`. It initializes:

- Firebase App
- Auth
- Firestore
- Storage

The config is public browser config. Do not put service account JSON, admin SDK secrets, or private keys in browser code.

### Firestore Collections

Rules are in `firestore.rules`.

#### `projects`

Used by `admin-panel.js`.

Expected fields:

```js
{
  title: string,
  category: string,
  status: string,
  description: string,
  imageUrl: string,
  projectLink: string,
  dateLabel: string,
  projectType: string,
  techStack: string[],
  createdAt: serverTimestamp()
}
```

Rules:

- public read
- write only by admin UID `SGqCpB7UmfeO1I8BiWug6EH8W1N2`

#### `guestbookMessages`

Used by:

- `desktop-guestbook-firebase.js` on the current desktop homepage
- `testimonials-guestbook.js` on older/richer guestbook surfaces

Expected fields:

```js
{
  uid: string,
  displayName: string,
  name: string,
  photoURL: string,
  avatarPosition: string,
  provider: "author" | "google.com" | "guest-username" | "desktop-anonymous" | string,
  source: "desktop-window" | string,
  usernameKey: string,
  text: string,
  createdAt: serverTimestamp()
}
```

Rules:

- public read
- signed-in users can create messages only for their own UID
- message text must be 1-400 characters
- update/delete only by admin UID

#### `users`

Used by `testimonials-guestbook.js` for profile and avatar state.

Expected fields:

```js
{
  username: string,
  usernameKey: string,
  displayName: string,
  photoURL: string,
  avatarPosition: string,
  avatarStoragePath: string,
  provider: string,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
}
```

Rules:

- each signed-in user can read/write only their own document

### Firebase Storage Paths

Rules are in `storage.rules`.

#### `guestbook-avatars/{userId}/{fileName}`

Used by custom guestbook avatar uploads.

Rules:

- public read
- create/update only by the signed-in owner
- file must be an image
- file size must be under 2 MB
- delete only by the owner

#### `photography/{allPaths=**}`

Used by `project/scripts/photography-archive.js`.

Rules:

- public read
- no public writes

All other Storage paths are denied by default.

## Common Editing Tasks

### Add A Desktop Homepage Project

1. Add a new card in `index.html` inside `.project-grid-archive`.
2. Add or reuse preview assets under `project/assets/...`.
3. Add the matching explorer folder entry in `portfolioData.projects.folders` inside `desktop-layout.js`.
4. If it should appear in the About workspace, add/update the corresponding `.project-preview-card` inside `.about-project-scroll`.
5. If it has a detail page, create it under `project/pages/` and link to it with a relative path like `project/pages/new-page.html`.

### Update The Desktop Guestbook

1. Edit the Guestbook markup in `#window-guestbook` inside `index.html`.
2. Keep `data-guestbook-source="firebase"` on `#guestbook-form` if the Firestore integration should stay active.
3. Edit Firebase behavior in `desktop-guestbook-firebase.js`.
4. Edit glassmorphism styling in the Guestbook section of `desktop-layout.css`.
5. Keep Firestore writes compatible with `firestore.rules`: authenticated UID, `text` as a 1-400 character string, and public reads.

### Add A Project Detail Page

1. Copy the structure from an existing page in `project/pages/`.
2. Keep shared scripts at the bottom with `../../` paths.
3. Add local assets under `project/assets/<project-name>/`.
4. Link the new page from `index.html` and `desktop-layout.js`.
5. Add translations to `language-controls.js` if the page should support ID/EN switching.

### Add Photography Work

1. Upload images to Firebase Storage under `photography/{year}/{month-or-project}/...`.
2. Add folder/file constants in `project/scripts/photography-archive.js`.
3. Add a new entry to `window.photographyArchive`.
4. Check `project/pages/photography.html` in a browser and verify the cover, filter, preview, and lightbox.

### Add A Certification

1. Add the PDF/JPG under `project/assets/certification-files/`.
2. Add a `.certificate-card` in `certification.html`.
3. Set `data-category` and `data-type`.
4. Confirm search and dropdown filters still show the new file.

### Change Firebase Rules

1. Edit `firestore.rules` or `storage.rules`.
2. Keep public reads only where needed.
3. Keep admin-only writes tied to the current admin UID unless the auth model changes.
4. Deploy rules from Firebase CLI outside this repo workflow.

## Important Notes For The Next AI

- Do not assume all old scripts are active on the current homepage. Check script tags first.
- The current homepage guestbook is Firebase-backed through `desktop-guestbook-firebase.js`.
- `desktop-layout.js` still contains a local guestbook fallback for older markup, but the active homepage form opts into Firebase with `data-guestbook-source="firebase"`.
- The richer legacy guestbook with profile/avatar upload behavior is still in `testimonials-guestbook.js` and needs matching HTML to run.
- `admin-panel.js` depends on form and admin popout elements that are not present in the current `index.html`.
- Project pages are mostly standalone, so changing shared CSS may not affect every page.
- `language-controls.js` uses exact text replacement, so changing English copy can silently break translations until the text map is updated.
- `desktop-layout.js` contains hardcoded portfolio data separate from the visible HTML cards.
- The About latest-project cards are another separate visible list in `index.html`; keep them aligned manually with the project archive when needed.
- The Firebase web config is safe to expose, but service account keys are not.
- There are many large binary assets in `project/assets/`; avoid renaming or moving them unless you update every reference.
- Some text in older files may contain mojibake characters from encoding issues. Preserve behavior first, then clean encoding only when specifically working on that file.

## Security Checklist

- Never commit Firebase service account JSON.
- Never add admin SDK credentials to browser JavaScript.
- Keep admin UID checks in both client logic and Firebase rules.
- Keep guestbook avatar uploads restricted by UID, content type, and size.
- If any private key was ever committed, revoke it in Google Cloud/Firebase immediately.

## Manual QA Checklist

Before handing off a change, open these pages through a local server:

- `index.html`
- `certification.html`
- `changelog.html`
- `project/pages/photography.html`
- any project page you edited

Check:

- desktop windows open, focus, drag, resize, close, and maximize
- About, Browser, and Guestbook show the three matching SVG controls
- About latest-project cards scroll and link to the correct project pages
- project links open in the portfolio browser
- Guestbook connects to Firebase, loads messages, and can submit a note through anonymous Auth
- mobile layout does not overflow
- theme switching still persists across pages
- language switching still updates visible text
- Webmeji/Furina loads and can be dragged on pages that use it
- Firebase-backed features still respect Auth and security rules
