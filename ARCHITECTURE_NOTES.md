# Architecture Notes

This document maps the current portfolio architecture and explains where future UI, animation, and Webmeji work should attach.

## Current Entry Points

### Main Homepage

Active files:

- `index.html`
- `desktop-layout.css`
- `desktop-layout.js`

The current homepage is a static desktop shell. It does not use a framework or build system. `index.html` defines the desktop windows, dock, desktop shortcuts, and content. `desktop-layout.css` styles the shell. `desktop-layout.js` wires interactions.

### Shared Project Pages

Most project pages under `project/pages/` load shared utilities:

- `language-controls.js`
- `theme-controls.js`
- `zoom-controls.js`
- `webmeji-main/config.js`
- `webmeji-main/webmeji.js`

These pages are mostly standalone HTML files with inline page-specific CSS.

### Webmeji

Active shared Webmeji files:

- `webmeji-main/config.js`
- `webmeji-main/webmeji.js`
- `webmeji-main/webmeji.css`
- `webmeji-main/Furina/*.png`

The homepage also has a separate simplified Furina sprite inside `desktop-layout.js`. This creates duplication between the desktop homepage mascot and the shared Webmeji mascot system.

## `desktop-layout.js`

### What It Currently Does

`desktop-layout.js` is a large immediate-invoked script that controls most homepage behavior.

Current responsibilities:

- collects all `[data-window]` desktop windows
- opens windows from `[data-window-target]`
- focuses windows and manages z-index
- closes windows
- maximizes/restores windows
- creates resize handles
- handles pointer drag and resize behavior
- manages taskbar recent-window buttons
- intercepts links and opens them inside the browser window
- manages browser tabs and iframe navigation
- renders explorer data from hardcoded `portfolioData`
- manages local-only guestbook messages in `localStorage`
- animates the desktop-only Furina sprite
- updates the clock

### What Should Be Preserved

Preserve these behavior concepts:

- desktop shell metaphor
- draggable and resizable windows on desktop
- taskbar/dock recent windows
- browser iframe window
- explorer-style portfolio navigation
- project links opening inside the browser window
- local guestbook as a simple fallback if Firebase guestbook is not active
- animated desktop companion concept

### What Should Be Replaced Or Refactored

Refactor these areas:

- monolithic script structure
- mixed UI state, rendering, animation, and data in one file
- hardcoded portfolio data living beside window-manager logic
- window close behavior as simple class toggles
- maximize/restore logic embedded directly in event handlers
- repeated DOM lookups that could be centralized
- desktop Furina behavior duplicated separately from Webmeji

### Suggested Future Split

```text
desktop-layout.js
desktop/window-manager.js
desktop/window-animations.js
desktop/browser-window.js
desktop/explorer-window.js
desktop/desktop-icons.js
desktop/guestbook-local.js
desktop/desktop-state.js
desktop/desktop-furina.js
```

Keep `desktop-layout.js` as the integration entry during migration. Move one system at a time.

## `desktop-layout.css`

### What It Currently Does

`desktop-layout.css` styles:

- root desktop scale
- wallpaper
- menu bar
- desktop windows
- titlebars and traffic buttons
- resize handles
- browser chrome
- explorer chrome
- project cards
- skill map
- timeline
- guestbook panel
- desktop icons
- dock/taskbar
- desktop Furina sprite
- responsive mobile behavior

### What Should Be Preserved

Preserve:

- OS shell structure
- desktop window layering
- dock/taskbar concept
- responsive fallback
- custom cursor support if still desired
- clear content spacing

### What Should Be Replaced Or Refined

Replace/refine:

- inconsistent titlebar/control visuals
- current gradient-heavy wallpaper direction if it conflicts with premium OS style
- ad hoc glass tokens
- simple close/maximize glyph styling
- desktop icon visuals
- browser/explorer chrome polish
- mobile window sizing rules if they overflow

### Reference-Driven UI Replacement Direction

The provided reference image suggests replacing the current scattered desktop composition with a calmer frosted-glass OS workspace:

- a large central glass shell
- left panel with greeting, recent drafts/tasks, search/add controls, expandable inbox sections, and scrollable cards
- right panel with floating portfolio cards in a two-column grid
- soft blue atmospheric background with warm lower glow
- subtle noise texture and low-contrast borders
- rounded glass cards with inner depth and gentle hover lift

Current project content should be mapped into this structure rather than copied literally:

- About/Experience/Skills can feed the left-side "system overview" and recent/task-style summaries.
- Projects can become right-side floating content cards.
- Certifications and Changelog can become compact cards or explorer entries.
- Browser and Explorer windows can remain as deeper views opened from the cards.

### Suggested CSS Architecture

Use CSS layers or clear sections:

```text
tokens
base
desktop-shell
window-system
dock
desktop-icons
browser
explorer
content-windows
animations
responsive
reduced-motion
```

Important tokens should live in `:root`:

- colors
- glass backgrounds
- border colors
- shadows
- blur strength
- motion durations
- easing curves
- desktop/dock sizing

## `webmeji-main/`

### What It Currently Does

`webmeji-main/config.js` defines:

- `WEBMEJI_BASE_URL`
- helper for resolving sprite frame paths
- `window.SPAWNING`
- base `SHIMEJI_CONFIG`
- custom `FURINA_CONFIG`
- animation frame lists
- movement speeds
- action frequency arrays
- follow-up action pools
- allowances such as drag, pet, bottom, top, left, right

`webmeji-main/webmeji.js` does:

- waits for `DOMContentLoaded`
- resolves spawn configs
- preloads all animation frames
- creates `Creature` instances
- tracks mouse/touch position
- normalizes pointer coordinates under zoom
- manages sprite movement and state
- handles drag, pet, jump, fall, edge behavior, chase, sit, walk, run, dash, crawl, and recovery

`webmeji-main/webmeji.css` styles the sprite container and sprite size/position.

### What Should Be Preserved

Preserve:

- frame preload concept
- configurable spawn list
- Furina frame assets
- drag interaction
- pet interaction if it remains stable
- zoom-aware pointer math
- public config-driven behavior

### What Should Be Replaced Or Refactored

Refactor:

- many boolean flags controlling overlapping states
- scattered timers
- action transition logic embedded in one class
- duplicated drag pointer handlers
- unclear state ownership between movement, animation, and behavior
- edge behavior complexity before core bottom behavior is stable

### Webmeji Behavior Target

The next behavior pass should restore calm default movement:

```text
walk: 70%
idle: 20%
small interaction: 7%
rare climb: 2%
rare run: 1%
```

State priority should stay readable:

```text
idle -> walk -> small interaction -> rare climb -> rare run
```

Required behavior changes:

- walking is the default movement loop
- climbing requires cooldown and should be rare
- running should only happen in special cases
- special actions should not chain rapidly
- state transitions need cooldowns and explicit guards
- movement should ease into changes instead of snapping state too often

### Preferred Webmeji Architecture

```text
webmeji-main/config.js
webmeji-main/webmeji.js              # bootstrap only
webmeji-main/behavior-state.js       # state machine
webmeji-main/movement-engine.js      # position/physics
webmeji-main/sprite-animation.js     # frame playback
webmeji-main/interactions.js         # drag/pet/mouse tracking
webmeji-main/utils.js                # zoom, clamp, preload
```

Migration can be gradual. First, make the current `Creature` state transitions clearer before splitting files.

## Animation Systems

### Current Animation Systems

Current animation sources:

- CSS keyframes in `desktop-layout.css` for window open/close
- CSS transitions for window frame changes
- JavaScript pointer loops for drag/resize
- JavaScript intervals and `requestAnimationFrame` for desktop Furina
- JavaScript intervals and `requestAnimationFrame` inside Webmeji `Creature`
- inline scripts on project pages for page-specific UI such as photography lightbox

### Current Window Animation Entry Points

In `desktop-layout.js`:

- `openWindow(name)`
- `closeWindow(windowElement)`
- `toggleMaximize(windowElement)`
- `focusWindow(windowElement)`
- `addRecentWindow(name)`
- `removeRecentWindow(name)`

Current CSS classes:

- `.desktop-window.is-open`
- `.desktop-window.is-closing`
- `.desktop-window.is-focused`
- `.desktop-window.is-maximized`
- `.desktop-window.is-dragging`

### Where To Inject Dissolve Close

Primary injection point:

```js
closeWindow(windowElement)
```

Recommended future flow:

```text
closeWindow(windowElement)
  -> WindowManager marks state as closing
  -> WindowAnimations.closeWithDissolve(windowElement)
  -> after animation completes:
       remove is-open/is-focused/is-closing
       update taskbar recent state
       cleanup overlay/particles
```

Do not put particle generation directly inside `closeWindow`. Use a separate animation module.

Suggested API:

```js
closeWithDissolve(windowElement, {
  duration: 1400,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches
});
```

The dissolve module should support a 1.2-2 second cinematic mode. It should still use a simple fade/scale fallback for reduced motion and low-end devices.

### Where To Inject Genie Minimize

New window lifecycle entry point needed:

```js
minimizeWindow(windowElement)
restoreWindow(name)
```

Likely injection points:

- titlebar minimize button
- taskbar recent-window button
- dock item click

Recommended future flow:

```text
minimizeWindow(windowElement)
  -> find matching dock/taskbar target
  -> WindowAnimations.minimizeWithGenie(windowElement, targetElement)
  -> set state minimized
  -> hide actual window after clone animation

restoreWindow(name)
  -> set state restoring
  -> WindowAnimations.restoreFromDock(windowElement, sourceElement)
  -> focus window
```

Suggested API:

```js
minimizeWithGenie(windowElement, targetElement, options)
restoreFromDock(windowElement, sourceElement, options)
```

Use a clone/overlay for the genie distortion. Avoid distorting the real window box while layout is active.

Target minimize duration is 0.8-1.4 seconds. Use one measured target element from the dock/taskbar and avoid recalculating layout during the animation.

## Window Manager Logic

### Current State Model

Current window state is mostly implicit in:

- DOM classes
- inline styles
- `data-window`
- `data-frame-ready`
- `data-restore-frame`
- `topZ` variable
- `activeDrag`
- `activeResize`
- taskbar buttons

There is no central state object for windows.

### Recommended State Model

Introduce a lightweight state registry:

```js
const windows = new Map();

windows.set("about", {
  element,
  status: "open", // closed | opening | open | minimized | closing
  zIndex,
  frame,
  restoreFrame,
  isFocused
});
```

Preserve DOM classes as render output, not the only state source.

### Dependency Relationships

Current dependencies:

```text
index.html
  -> desktop-layout.css
  -> desktop-layout.js

desktop-layout.js
  -> existing DOM markup
  -> project page URLs
  -> localStorage for guestbook
  -> webmeji-main/Furina image paths for desktop Furina
```

Future desktop dependency direction:

```text
desktop-state
  -> window-manager
      -> window-animations
      -> dock/taskbar rendering
  -> browser-window
  -> explorer-window
  -> desktop-icons
```

Animation modules should depend on DOM elements and geometry only. They should not own project data or window business logic.

## UI Rendering Flow

### Current Homepage Flow

1. Browser loads `index.html`.
2. Browser loads `desktop-layout.css`.
3. DOM contains all windows up front.
4. `desktop-layout.js` runs immediately.
5. It collects DOM elements and binds event listeners.
6. Existing open windows are stabilized.
7. Browser, explorer, guestbook, Furina, and clock systems initialize.
8. User actions mutate classes, inline styles, iframe `src`, and localStorage.

### Future Preferred Flow

1. Load markup and CSS.
2. Bootstrap desktop shell.
3. Register windows from DOM.
4. Initialize window manager.
5. Initialize dock/taskbar.
6. Initialize browser and explorer modules.
7. Initialize animation engine.
8. Initialize Webmeji/desktop companion.
9. Render state changes from explicit state updates.

Avoid full re-rendering the desktop every time. This is not a virtual DOM app.

## State Management

### Current State

Current state sources:

- window classes
- inline `left`, `top`, `width`, `height`, `zIndex`
- localStorage key `jona-portfolio-guestbook`
- browser tab arrays inside browser instances
- explorer active context through rendered DOM
- `portfolioData` hardcoded object
- Furina internal state object
- Webmeji `Creature` instance properties

### Preserve

- localStorage guestbook fallback
- browser tab state model
- explorer context concept
- Webmeji config-driven data

### Replace

- implicit window lifecycle state
- scattered animation flags
- hardcoded explorer data inside the window manager file

## Animation Entry Points Summary

Desktop:

- `openWindow(name)`
- `closeWindow(windowElement)`
- future `minimizeWindow(windowElement)`
- future `restoreWindow(name)`
- `toggleMaximize(windowElement)`
- pointer drag start/move/end
- pointer resize start/move/end

Browser:

- `openBrowserTab(href, title, browserName)`
- `activateBrowserTab(instance, tabId)`
- `closeBrowserTab(instance, tabId)`

Explorer:

- `window.renderExplorerGrid(context)`
- `updateExplorerSidebar(context)`

Homepage Furina:

- `setupDesktopFurina()`
- internal `tick()`
- internal `setSprite()`

Shared Webmeji:

- `DOMContentLoaded` listener in `webmeji.js`
- `new Creature(id, cfg)`
- `Creature.startAction(action)`
- `Creature.setNextAction()`
- `Creature.animate(time)`
- `Creature.fallToBottom()`
- `Creature.startChaseMouse()`
- `Creature.enableDragInteraction()`

## Replacement And Preservation Matrix

| System | Preserve | Replace / Refactor |
| --- | --- | --- |
| Desktop windows | core metaphor, drag, resize, focus | implicit state, simple close animation |
| Dock/taskbar | recent-window concept | visual design, minimize/restore behavior |
| Browser window | iframe tabs, link interception | tab polish, external-site handling UX |
| Explorer window | context browsing, preview card idea | hardcoded data location, visual chrome |
| Desktop icons | shortcut concept | icon design and selected states |
| Homepage guestbook | local fallback | consider Firebase integration later |
| Desktop Furina | companion idea | duplicated behavior if Webmeji becomes reusable |
| Shared Webmeji | assets, config, drag, zoom math | state machine and timer complexity |
| CSS | responsive shell, window layers | inconsistent tokens and controls |

## Phased Implementation Plan

### Phase 1: Stabilize Webmeji Behavior

Tasks:

- audit current `Creature` flags
- define explicit state names
- make state transitions predictable
- centralize frame playback
- keep drag/fall/recover reliable
- simplify chase behavior
- preserve existing sprite assets
- implement the 70/20/7/2/1 behavior weighting
- add cooldowns for climb, run, and interaction states

Success criteria:

- no stuck states
- no drag/fall conflicts
- no runaway timers
- stable under page zoom

### Phase 2: Rebuild Desktop UI

Tasks:

- define glassmorphism token system
- refine wallpaper/background
- redesign window surfaces
- redesign titlebars and controls
- redesign desktop icons
- improve dock/taskbar visual hierarchy
- improve responsive behavior
- translate the reference image into a left-panel/right-card workspace
- add atmospheric background, subtle noise, and controlled ambient glow
- standardize card blur, border transparency, spacing, and shadows

Success criteria:

- premium futuristic OS feel
- readable content
- mobile layout does not overflow
- visual consistency across windows
- the UI feels like a calm operating system, not a landing page or flashy demo

### Phase 3: Window Controls And Signature Animations

Tasks:

- add minimize state
- add minimize button
- implement genie minimize using overlay/clone
- implement restore from dock
- implement dissolve close animation
- add reduced-motion fallbacks

Success criteria:

- close animation cleans up after itself
- minimize and restore preserve window frame
- taskbar/dock state stays in sync
- interactions remain responsive

### Phase 4: Performance, Motion Polish, Cleanup

Tasks:

- split large systems into modules where useful
- remove dead code
- optimize image loading
- reduce layout thrash
- tune animation timings
- update documentation

Success criteria:

- no monolithic animation file
- clean dependency boundaries
- documented entry points
- Git pack stays below target size

## Coding Guidelines

- Keep code modular.
- Avoid monolithic animation files.
- Separate UI, animation, and behavior systems.
- Keep comments sparse but useful.
- Prefer clear function names over explanatory comments.
- Do not introduce a framework without a strong reason.
- Do not commit local binaries or generated dependency folders.
- Respect existing user content and project links.
