# Codex Implementation Spec

This document is the product and implementation brief for the next Codex pass. The goal is to evolve the portfolio into a premium futuristic operating-system experience, not a flashy web demo.

## Product Vision

Build a desktop-style portfolio interface that feels like a polished personal OS:

- refined glass surfaces
- precise window motion
- clear desktop hierarchy
- elegant iconography
- responsive behavior that still feels intentional on mobile
- Webmeji behavior that feels alive but controlled
- animations that support navigation rather than distract from it

The interface should feel premium, calm, and futuristic. Avoid noisy effects, cluttered gradients, gimmicky motion, and animation for its own sake.

## Core Experience Goals

- The homepage should behave like a lightweight operating system shell.
- Windows should feel tactile: open, focus, drag, resize, minimize, restore, and close should all have clear visual feedback.
- Icons should feel like OS objects, not simple website buttons.
- Motion should be smooth, readable, and respectful of `prefers-reduced-motion`.
- Webmeji should feel like a companion process inside the OS, not a chaotic overlay.
- Project browsing should feel integrated with the desktop/browser metaphor.

## Design Direction

### Reference Image Interpretation

The provided reference image should guide the rebuild more than generic "glass UI" language.

Key traits to carry into the portfolio:

- wide frosted-glass application shell centered over an atmospheric blue-to-warm gradient
- soft blur and muted transparency instead of sharp opaque panels
- large rounded container with subtle inner depth
- left-side productivity/inbox panel with greeting, compact lists, search/add actions, and scrollable cards
- right-side floating card grid with document-like preview cards
- restrained typography with strong hierarchy and generous spacing
- subtle glow near the lower card edges
- low-contrast borders that still define every surface
- calm premium motion, not energetic novelty motion

The portfolio does not need to copy the exact content from the image. It should translate the structure and mood into the existing portfolio system.

### Visual Style

- Premium futuristic OS.
- Glassmorphism with restraint: layered translucency, soft borders, subtle shadows, readable contrast.
- Avoid overusing saturated purple/blue gradients.
- Use depth through blur, light, shadow, and layering rather than decorative blobs.
- Keep UI surfaces crisp and functional.
- Preserve the portfolio identity: creative, personal, playful, but not messy.

### Layout

- Desktop-first shell with responsive mobile adaptation.
- Mobile should not pretend to be a cramped desktop if it becomes unusable.
- On smaller screens, windows can become stacked panels or app-like views.
- Maintain the sense of an OS environment across breakpoints.
- Main desktop rebuild should use a two-zone composition inspired by the reference:
  - left panel for greeting, recent drafts/tasks, search/add controls, expandable thought inbox, and scrollable compact cards
  - right panel for floating content cards in a refined grid
- Preserve portfolio content while adapting it into this calmer productivity/OS layout.

### Icons

- Redesign desktop icons as premium OS shortcuts.
- Prefer consistent icon containers, labels, hover/focus states, and selected states.
- Social icons should feel native to the desktop shell.
- Avoid random asset styles mixed together.

### Window Controls

Window controls should support:

- focus
- close
- minimize
- maximize / restore
- drag
- resize on desktop
- accessible labels
- keyboard-safe behavior

Close animation target: Thanos dust / dissolve effect.

Minimize animation target: macOS genie-style motion into the dock/taskbar.

## Motion Direction

Motion should communicate state:

- opening: window appears with depth and focus
- focusing: subtle elevation and border change
- minimizing: window visually travels into dock/taskbar
- restoring: window returns from dock/taskbar
- closing: window dissolves out
- dragging: direct manipulation, no laggy flourishes
- Webmeji: simplified state machine with predictable transitions

Avoid:

- long animation chains that block interaction
- random huge movements
- layout shifts during animation
- animation files that become monolithic

## Technical Direction

This project is currently plain HTML, CSS, and JavaScript. Continue with that unless there is a strong reason to introduce a build step.

Preferred approach:

- modular JavaScript files
- small focused systems
- CSS custom properties for tokens
- no framework unless explicitly approved
- avoid large dependencies
- keep animation logic separated from UI state logic

The requested ideal stack mentions React, Next.js, TailwindCSS, Framer Motion, GSAP, and Three.js. Treat that as a future full-rebuild option, not an automatic requirement for this static repo. If the current codebase is kept, implement the same architecture with plain modular JavaScript and CSS first. Introduce GSAP or Three.js only if the dissolve/genie effects cannot meet the quality bar with lightweight CSS/canvas modules.

Suggested future module split:

```text
desktop-layout.js              # temporary integration entry while refactoring
desktop/
  window-manager.js            # window lifecycle/state
  window-animations.js         # open/minimize/restore/close effects
  desktop-icons.js             # shortcut rendering/selection
  browser-window.js            # tabbed iframe browser
  explorer-window.js           # explorer data/rendering
  desktop-state.js             # shared state/store helpers
webmeji/
  behavior-state.js            # movement state machine
  movement-engine.js           # physics/position updates
  sprite-animation.js          # frame playback
  interactions.js              # drag/pet/mouse tracking
```

Keep the first implementation practical. Do not split files just for ceremony. Split when a system has a clear boundary.

## Performance Constraints

- Keep main-thread work light.
- Avoid creating many timers per animated object.
- Prefer `requestAnimationFrame` for continuous motion.
- Avoid heavy DOM rewrites inside animation loops.
- Do not animate expensive layout properties when transforms can work.
- Use CSS transitions/keyframes for surface-level UI motion when possible.
- Keep image assets compressed and avoid committing local binaries.
- Respect `prefers-reduced-motion`.

## Accessibility Constraints

- Every control needs an accessible name.
- Window controls must be real buttons.
- Focus state must remain visible.
- If animation changes visibility, update ARIA state consistently.
- Do not trap focus unless implementing a true modal.
- Reduced motion should disable dissolve/genie complexity and use simple fades.

## Webmeji Behavior Fixes

The current Webmeji system is feature-rich but too complex. Stabilize it before adding more behavior.

Implementation goals:

- simplify movement states
- reduce hidden flags
- make transitions explicit
- prevent impossible combinations such as dragging plus falling plus edge-idle
- separate sprite playback from behavior decisions
- use one movement tick loop per creature
- make mouse chase optional and rate-limited
- keep drag reliable under page zoom
- make edge behavior predictable
- restore a calm default behavior where walking and idling dominate
- add cooldowns between special actions
- prevent rapid switching between states

Preferred core states:

```text
idle
walk
run
sit
chase
drag
fall
recover
edgeHang
edgeClimb
```

Target action distribution:

```text
walk: 70%
idle: 20%
small interaction: 7%
rare climb: 2%
rare run: 1%
```

Priority order:

```text
idle
walk
small interaction
rare climb
rare run
```

Each state should define:

- enter behavior
- update behavior
- exit behavior
- allowed next states
- sprite animation key

## Desktop UI Redesign

Rebuild the desktop shell toward a cohesive OS.

Implementation goals:

- shared glass tokens
- consistent titlebars
- consistent controls
- stronger dock/taskbar behavior
- selected and focused states for desktop icons
- refined browser and explorer chrome
- responsive fallback that remains usable
- left productivity-style panel inspired by the reference image
- right floating portfolio-card grid inspired by the reference image
- subtle ambient glow and noise texture in the background

Preserve:

- current content and project links
- desktop metaphor
- browser iframe concept
- explorer concept
- guestbook concept
- Furina/Webmeji personality

Replace or refactor:

- hardcoded UI logic mixed inside one large `desktop-layout.js`
- ad hoc animation behavior
- duplicated mascot behavior between desktop and Webmeji where practical
- inconsistent icon visuals
- encoded/mojibake control glyph workarounds

## Animation Systems

### Dissolve Close Animation

Target: a Thanos-dust-style close animation that feels premium and controlled.

Preferred implementation:

- capture or approximate window surface
- animate particles or clipped fragments outward
- use an elegant cinematic duration around 1.2-2 seconds only for deliberate close actions
- avoid huge particle counts
- fall back to opacity/scale for reduced motion or low-end devices
- freeze the window briefly before dissolve begins
- dissolve progressively from scattered regions
- fade fragments with soft blur and outward drift

Potential implementation paths:

- CSS mask/clip-path fragments for lightweight dissolve
- canvas overlay for richer particles
- DOM fragment grid for medium complexity

Do not place this directly inside general window state logic. Expose it through a function like:

```js
closeWithDissolve(windowElement, options)
```

### Genie Minimize Animation

Target: macOS-inspired minimize into dock/taskbar.

Preferred implementation:

- compute source window bounds
- compute destination dock/taskbar button bounds
- animate a clone or overlay instead of distorting the actual window layout
- hide the real window at animation completion
- restore should reverse or use a matching pop-back motion
- target duration around 0.8-1.4 seconds
- use smooth bezier motion and subtle elastic deformation
- keep high FPS by avoiding layout work during the animation

Expose through functions like:

```js
minimizeWithGenie(windowElement, targetElement, options)
restoreFromDock(windowElement, sourceElement, options)
```

## Implementation Phases

### Phase 1: Stabilize Webmeji Behavior

Goals:

- simplify movement states
- clean state transitions
- reduce flag-based behavior conflicts
- keep drag, fall, idle, walk, sit, edge, and chase reliable
- preserve existing Furina frames

Deliverables:

- clearer Webmeji state machine
- fewer timers
- explicit animation entry points
- reduced-motion fallback
- no visual regression in sprite loading

### Phase 2: Rebuild Desktop UI

Goals:

- rebuild desktop UI surface language
- create glassmorphism token system
- improve responsive layout
- redesign icons
- clean visual hierarchy

Deliverables:

- refined desktop shell
- consistent titlebars and panels
- premium dock/taskbar styling
- selected/focused desktop icons
- mobile layout that does not overflow

### Phase 3: Window Controls And Signature Animations

Goals:

- improve window controls
- add minimize behavior
- add genie minimize animation
- add dissolve close animation
- preserve maximize/restore and drag/resize

Deliverables:

- window lifecycle API
- animation module
- dock/taskbar integration
- reduced-motion support
- clean animation cleanup after completion

### Phase 4: Performance, Motion Polish, Cleanup

Goals:

- remove old duplicated behavior
- split large files where useful
- optimize heavy DOM and image work
- polish motion timings
- document new architecture

Deliverables:

- smaller, clearer modules
- documented animation entry points
- no monolithic animation file
- stable manual QA path
- pack-safe asset rules

## Quality Bar

The final result should feel:

- premium
- intentional
- readable
- responsive
- calm under interaction
- alive without being chaotic

The final result should not feel:

- like a generic landing page
- like a particle demo
- like a cluttered toy desktop
- like a one-off animation experiment

## Final Acceptance Checklist

- Webmeji does not get stuck in broken states.
- Dragging and dropping Webmeji works under page zoom.
- Window open, focus, close, minimize, maximize, and restore are stable.
- Close dissolve and minimize genie have reduced-motion fallbacks.
- Desktop icons have consistent visual language.
- Mobile layout remains usable.
- Project links still open correctly.
- The browser and explorer metaphors still work.
- No large local tool binaries are tracked.
- Documentation stays current with the implemented architecture.
