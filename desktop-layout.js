(function () {
  let windows = Array.from(document.querySelectorAll("[data-window]"));
  const desktopStage = document.querySelector(".desktop-stage");
  const triggers = Array.from(document.querySelectorAll("[data-window-target]"));
  const clock = document.getElementById("desktop-clock");
  const taskbarRecents = document.getElementById("taskbar-recents");
  const windowLabels = {
    about: "About",
    projects: "Project",
    skills: "Skill tree",
    experience: "Experience",
    achievement: "Achievement",
    certifications: "Certifications",
    browser: "Browser",
    guestbook: "Guestbook"
  };
  const browserInstances = new Map();
  const portfolioData = {
    projects: {
      label: "Projects",
      folders: [
        {
          key: "personal-gfx",
          label: "Personal GFX",
          logo: "GFX",
          organization: "Jona Setiawan",
          title: "Personal GFX Design Collection",
          status: "On-going",
          description: "An ongoing personal GFX project featuring character edits, poster compositions, layered effects, and typography experiments built from recent design work.",
          tools: ["Photoshop", "Illustrator", "Photo Manipulation", "Typography"],
          date: "Still Going",
          type: "Personal Project",
          href: "project/pages/personal-gfx-design-collection.html"
        },
        {
          key: "ikm",
          label: "IKM Design",
          logo: "IKM",
          organization: "PT Internusa Kreasindo Mandiri",
          title: "IKM Design Creative Project",
          status: "On-going",
          description: "Main job work focused on IKM design tasks and creative production for brand and bag-related visual needs.",
          tools: ["Photoshop", "Illustrator", "Canva"],
          date: "Agustus 2025",
          type: "Main Work",
          href: "project/pages/ikm-design-creative-project.html"
        },
        {
          key: "marketing-hr",
          label: "Marketing HR",
          logo: "HR",
          organization: "Fortress",
          title: "Marketing & Assistant HR",
          status: "Completed",
          description: "Training and PKL project focused on marketing support, social media tasks, advertisement records, and assistant HR administration.",
          tools: ["Excel", "Marketing", "Advertisement", "Assistant HR"],
          date: "Sep - Nov 2022",
          type: "Training / PKL",
          href: "project/pages/marketing-assistant-hr.html"
        },
        {
          key: "lariso",
          label: "Lariso",
          logo: "LA",
          organization: "Lariso",
          title: "Lariso Brand Identity",
          status: "Completed",
          description: "A snack brand identity project built from logo construction to pouch packaging iteration, final mockup presentation, and branded invoice collateral.",
          tools: ["Illustrator", "Photoshop", "Brand Identity"],
          date: "4 January 2026",
          type: "Client Work",
          href: "project/pages/lariso-brand-identity.html"
        }
      ]
    },
    skills: {
      label: "Skills",
      folders: [
        {
          key: "branding",
          label: "Branding",
          logo: "BR",
          organization: "Creative System",
          title: "Branding Skill Tree",
          status: "Active",
          description: "Logo design, visual identity systems, brand color direction, and presentation-ready identity rules.",
          tools: ["Logo", "Identity", "Color", "Guidelines"],
          date: "Current",
          type: "Skill Area",
          href: ""
        },
        {
          key: "gfx-skill",
          label: "GFX Design",
          logo: "GX",
          organization: "Creative System",
          title: "GFX Design Skill Tree",
          status: "Active",
          description: "Photoshop compositing, poster-style layouts, character framing, typography, and dramatic visual effects.",
          tools: ["Photoshop", "Compositing", "Poster", "Effects"],
          date: "Current",
          type: "Skill Area",
          href: ""
        },
        {
          key: "ui-web",
          label: "UI / Web",
          logo: "UI",
          organization: "Creative System",
          title: "UI and Web Layout",
          status: "Active",
          description: "HTML, CSS, responsive layouts, interactive desktop metaphors, and portfolio page systems.",
          tools: ["HTML", "CSS", "JavaScript", "Responsive"],
          date: "Current",
          type: "Skill Area",
          href: ""
        }
      ]
    },
    certifications: {
      label: "Certifications",
      folders: [
        {
          key: "myskill",
          label: "MySkill",
          logo: "MS",
          organization: "MySkill",
          title: "MySkill Certificate Collection",
          status: "On-going",
          description: "A growing certification archive covering graphic design, brand identity, UX research, content marketing, color systems, typography, and web development foundations.",
          tools: ["Graphic Design", "Brand Identity", "UX Research", "Typography"],
          date: "2025 - Present",
          type: "Certification Archive",
          href: "certification.html"
        },
        {
          key: "toefl",
          label: "TOEFL Training",
          logo: "TF",
          organization: "TOEFL Training",
          title: "TOEFL ITP Learning Archive",
          status: "Completed",
          description: "Listening, reading, written structure, vocabulary, and TOEFL ITP preparation materials organized as PDF study records.",
          tools: ["Listening", "Reading", "Structure", "Vocabulary"],
          date: "Training Files",
          type: "PDF Archive",
          href: "certification.html"
        },
        {
          key: "trainee",
          label: "Trainee",
          logo: "AR",
          organization: "Aryaduta Country Club",
          title: "Trainee Performance Records",
          status: "Completed",
          description: "Aryaduta trainee documents including website certification and performance scoring records from the Sport Desk work period.",
          tools: ["Guest Service", "Reporting", "Operations", "Promotion"],
          date: "Jul - Oct 2024",
          type: "Trainee Record",
          href: "certification.html"
        },
        {
          key: "competition",
          label: "Competition",
          logo: "KT",
          organization: "Kota Tangerang",
          title: "Competition Award Archive",
          status: "Completed",
          description: "Award documentation from the Kota Tangerang competition archive, grouped with achievement records for easy review inside the portfolio.",
          tools: ["Competition", "Award", "Achievement", "Documentation"],
          date: "February 2024",
          type: "Achievement",
          href: "certification.html"
        }
      ]
    },
    photography: {
      label: "Photography",
      folders: [
        {
          key: "photo-archive",
          label: "Photography Archive",
          logo: "PH",
          organization: "Photography",
          title: "Photography Archive",
          status: "Growing",
          description: "A living archive of client photography projects, organized by year with cover highlights and gallery previews.",
          tools: ["Event Coverage", "Portraits", "Storytelling"],
          date: "November 2025",
          type: "Client Work",
          href: "project/pages/photography.html"
        },
        {
          key: "event-coverage",
          label: "Event Coverage",
          logo: "EV",
          organization: "Photography",
          title: "Event Coverage",
          status: "Growing",
          description: "Event documentation with candid moments, atmosphere, venue details, and story-focused coverage.",
          tools: ["Events", "Candid", "Coverage"],
          date: "Ongoing",
          type: "Photo Category",
          href: "project/pages/photography.html"
        },
        {
          key: "documentary",
          label: "Documentary",
          logo: "DC",
          organization: "Photography",
          title: "Documentary Kota Tua",
          status: "In Progress",
          description: "School project documentation created in Kota Tua for a UKK assignment, focused on visual storytelling and editing.",
          tools: ["Premiere Pro", "Photoshop", "Documentary"],
          date: "UKK Project",
          type: "School Work",
          href: "project/pages/documentary-kota-tua-ukk.html"
        }
      ]
    }
  };
  let topZ = 100;
  let activeDrag = null;
  let activeResize = null;
  let nextBrowserWindowId = 2;

  function getDesktopScale() {
    return Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--desktop-zoom")) || 1;
  }

  function focusWindow(windowElement) {
    if (!windowElement) {
      return;
    }

    topZ += 1;
    windows.forEach((item) => item.classList.remove("is-focused"));
    windowElement.classList.add("is-focused");
    windowElement.style.zIndex = String(topZ);
    syncRecentActive(windowElement.dataset.window);
  }

  function syncRecentActive(activeName) {
    taskbarRecents?.querySelectorAll("[data-taskbar-window]").forEach((button) => {
      const windowElement = document.querySelector(`[data-window="${button.dataset.taskbarWindow}"]`);
      const isOpen = windowElement?.classList.contains("is-open");
      button.classList.toggle("is-active", isOpen && button.dataset.taskbarWindow === activeName);
    });
  }

  function addRecentWindow(name) {
    if (!taskbarRecents || !name) {
      return;
    }

    const existingButton = taskbarRecents.querySelector(`[data-taskbar-window="${name}"]`);
    if (existingButton) {
      taskbarRecents.prepend(existingButton);
      syncRecentActive(name);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-window-btn";
    button.dataset.taskbarWindow = name;
    button.textContent = windowLabels[name] || name;
    button.setAttribute("aria-label", `Open ${windowLabels[name] || name} window`);
    button.addEventListener("click", () => openWindow(name));
    taskbarRecents.prepend(button);
    syncRecentActive(name);
  }

  function removeRecentWindow(name) {
    taskbarRecents?.querySelector(`[data-taskbar-window="${name}"]`)?.remove();
    syncRecentActive(null);
  }

  function openWindow(name) {
    const windowElement = document.querySelector(`[data-window="${name}"]`);

    if (!windowElement) {
      return;
    }

    stabilizeWindowFrame(windowElement);
    windowElement.classList.remove("is-closing");
    windowElement.classList.add("is-open");
    focusWindow(windowElement);
    addRecentWindow(name);
  }

  function stabilizeWindowFrame(windowElement) {
    if (!windowElement || windowElement.dataset.frameReady === "true") {
      return;
    }

    const bounds = getViewportBounds();
    const rect = windowElement.getBoundingClientRect();
    const scale = getDesktopScale();
    const computed = getComputedStyle(windowElement);
    const minHeight = Number.parseFloat(computed.minHeight) || 240;
    const cssHeight = Number.parseFloat(computed.height);
    const currentHeight = cssHeight || rect.height / scale;
    const fallbackHeight = Math.min(Math.max(currentHeight || 0, minHeight), Math.max(320, bounds.height - 150));

    if (!windowElement.style.height) {
      windowElement.style.height = `${fallbackHeight}px`;
    }

    windowElement.dataset.frameReady = "true";
  }

  function closeWindow(windowElement) {
    if (!windowElement || !windowElement.classList.contains("is-open")) {
      return;
    }

    windowElement.classList.remove("is-open", "is-maximized");
    windowElement.classList.add("is-closing");
    removeRecentWindow(windowElement.dataset.window);

    window.setTimeout(() => {
      windowElement.classList.remove("is-closing", "is-focused");
      syncRecentActive(null);
    }, 260);
  }

  function toggleMaximize(windowElement) {
    if (!windowElement) {
      return;
    }

    if (windowElement.classList.contains("is-maximized")) {
      const restore = windowElement.dataset.restoreFrame ? JSON.parse(windowElement.dataset.restoreFrame) : null;
      windowElement.classList.remove("is-maximized");

      if (restore) {
        windowElement.style.left = restore.left;
        windowElement.style.top = restore.top;
        windowElement.style.width = restore.width;
        windowElement.style.height = restore.height;
      }

      focusWindow(windowElement);
      return;
    }

    const bounds = getViewportBounds();
    const rootStyles = getComputedStyle(document.documentElement);
    const topBarHeight = Number.parseFloat(rootStyles.getPropertyValue("--top-bar-height")) || 38;
    const taskbarHeight = Number.parseFloat(rootStyles.getPropertyValue("--taskbar-height")) || 76;
    const margin = 24;
    const top = topBarHeight + 14;
    const bottomSpace = taskbarHeight + 24;
    const maxWidth = Math.min(1440, bounds.width - margin * 2);
    const nextWidth = Math.max(Math.min(windowElement.offsetWidth, maxWidth), Math.min(maxWidth, bounds.width - margin * 2));
    const nextHeight = Math.max(320, bounds.height - top - bottomSpace);
    const nextLeft = Math.max(margin, (bounds.width - nextWidth) / 2);

    windowElement.dataset.restoreFrame = JSON.stringify({
      left: windowElement.style.left || `${windowElement.offsetLeft}px`,
      top: windowElement.style.top || `${windowElement.offsetTop}px`,
      width: windowElement.style.width || `${windowElement.offsetWidth}px`,
      height: windowElement.style.height || `${windowElement.offsetHeight}px`
    });

    windowElement.classList.add("is-maximized");
    windowElement.style.left = `${nextLeft}px`;
    windowElement.style.top = `${top}px`;
    windowElement.style.width = `${nextWidth}px`;
    windowElement.style.height = `${nextHeight}px`;
    focusWindow(windowElement);
  }

  function getBrowserTabTitle(link) {
    if (link.dataset.browserTab) {
      return link.dataset.browserTab;
    }

    return link.textContent.trim() || link.getAttribute("href") || "Portfolio Page";
  }

  function isPortfolioPageLink(link) {
    const href = link.getAttribute("href") || "";

    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return false;
    }

    const path = href.split(/[?#]/)[0];
    return path.endsWith(".html") || /^https?:\/\//i.test(href);
  }

  function createBrowserInstance(windowElement) {
    const name = windowElement.dataset.window;
    const instance = {
      name,
      windowElement,
      tabs: [],
      activeTabId: null,
      nextTabId: 1,
      tabbar: windowElement.querySelector(".browser-tabbar"),
      frame: windowElement.querySelector(".browser-frame"),
      address: windowElement.querySelector(".browser-address-input")
    };

    instance.address?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      navigateActiveTab(instance, instance.address.value);
    });

    instance.frame?.addEventListener("load", () => {
      try {
        prepareFrameDocument(instance);
      } catch (error) {
        // Cross-origin pages may block frame access. That is expected for some sites.
      }
    });

    browserInstances.set(name, instance);
    return instance;
  }

  function getBrowserInstance(name = "browser") {
    const existing = browserInstances.get(name);

    if (existing) {
      return existing;
    }

    const windowElement = document.querySelector(`[data-window="${name}"]`);
    return windowElement ? createBrowserInstance(windowElement) : null;
  }

  function renderBrowserTabs(instance) {
    if (!instance?.tabbar) {
      return;
    }

    instance.tabbar.replaceChildren();

    instance.tabs.forEach((tab) => {
      const tabButton = document.createElement("button");
      tabButton.type = "button";
      tabButton.className = `browser-tab${tab.id === instance.activeTabId ? " is-active" : ""}`;
      tabButton.dataset.browserTabId = String(tab.id);
      tabButton.setAttribute("role", "tab");
      tabButton.setAttribute("aria-selected", String(tab.id === instance.activeTabId));

      const title = document.createElement("span");
      title.className = "browser-tab-title";
      title.textContent = tab.title;

      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "browser-tab-close";
      closeButton.setAttribute("aria-label", `Close ${tab.title}`);
      closeButton.textContent = "x";

      closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        closeBrowserTab(instance, tab.id);
      });

      bindTabDrag(tabButton, instance, tab.id);
      tabButton.append(title, closeButton);
      instance.tabbar.appendChild(tabButton);
    });
  }

  function activateBrowserTab(instance, tabId) {
    const tab = instance?.tabs.find((item) => item.id === tabId);

    if (!instance || !tab || !instance.frame || !instance.address) {
      return;
    }

    instance.activeTabId = tab.id;
    instance.frame.src = tab.href;
    instance.address.value = tab.href;
    renderBrowserTabs(instance);
    openWindow(instance.name);
  }

  function addBrowserTab(instance, href, title) {
    const tab = {
      id: instance.nextTabId,
      href,
      title: title || href
    };

    instance.nextTabId += 1;
    instance.tabs.push(tab);
    activateBrowserTab(instance, tab.id);
    return tab;
  }

  function openBrowserTab(href, title, browserName = "browser") {
    const instance = getBrowserInstance(browserName);

    if (!instance) {
      return;
    }

    addBrowserTab(instance, href, title);
  }

  function closeBrowserTab(instance, tabId) {
    const tabIndex = instance.tabs.findIndex((tab) => tab.id === tabId);

    if (tabIndex === -1) {
      return null;
    }

    const wasActive = instance.tabs[tabIndex].id === instance.activeTabId;
    const removed = instance.tabs.splice(tabIndex, 1)[0];

    if (!instance.tabs.length) {
      instance.activeTabId = null;
      instance.frame?.removeAttribute("src");
      if (instance.address) {
        instance.address.value = "Open a portfolio page";
      }
      renderBrowserTabs(instance);
      return removed;
    }

    if (wasActive) {
      const nextTab = instance.tabs[Math.max(0, tabIndex - 1)];
      activateBrowserTab(instance, nextTab.id);
      return removed;
    }

    renderBrowserTabs(instance);
    return removed;
  }

  function normalizeAddress(value) {
    const rawValue = String(value || "").trim();

    if (!rawValue) {
      return "";
    }

    if (rawValue.toLowerCase() === "google") {
      return "https://www.google.com/webhp?igu=1";
    }

    if (/^https?:\/\//i.test(rawValue)) {
      return rawValue;
    }

    if (rawValue.endsWith(".html") || rawValue.startsWith("project/") || rawValue.startsWith("./") || rawValue.startsWith("../")) {
      return rawValue;
    }

    if (/^[^\s]+\.[^\s]+$/.test(rawValue)) {
      return `https://${rawValue}`;
    }

    return `https://www.google.com/search?igu=1&q=${encodeURIComponent(rawValue)}`;
  }

  function navigateActiveTab(instance, value) {
    const href = normalizeAddress(value);
    const tab = instance.tabs.find((item) => item.id === instance.activeTabId);

    if (!href) {
      return;
    }

    if (!tab) {
      addBrowserTab(instance, href, value.trim() || href);
      return;
    }

    tab.href = href;
    tab.title = value.trim() || href;
    activateBrowserTab(instance, tab.id);
  }

  function prepareFrameDocument(instance) {
    if (!instance.frame?.contentDocument) {
      return;
    }

    const doc = instance.frame.contentDocument;
    const style = doc.createElement("style");
    style.textContent = `
      .back-btn,
      a[href*="index.html"].cta-btn,
      a[href*="index.html"].action-btn {
        display: none !important;
      }
    `;
    doc.head.appendChild(style);

    doc.querySelectorAll('a[href*="index.html"]').forEach((link) => {
      const text = link.textContent.trim().toLowerCase();
      if (
        text.includes("back to portfolio") ||
        text.includes("back to portofolio") ||
        text.includes("back to home") ||
        text.includes("back to projects") ||
        text.includes("kembali")
      ) {
        link.remove();
      }
    });

    doc.addEventListener("click", (event) => {
      const link = event.target.closest?.("a[href]");

      if (!link || !isPortfolioPageLink(link)) {
        return;
      }

      event.preventDefault();
      openBrowserTab(link.getAttribute("href"), getBrowserTabTitle(link), instance.name);
    });
  }

  function bindTabDrag(tabButton, instance, tabId) {
    let drag = null;

    function removeGhost() {
      drag?.ghost?.remove();
      if (drag) {
        drag.ghost = null;
      }
    }

    function moveGhost(event) {
      if (!drag?.ghost) {
        return;
      }

      drag.ghost.style.left = `${event.clientX}px`;
      drag.ghost.style.top = `${event.clientY}px`;
    }

    tabButton.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest(".browser-tab-close")) {
        return;
      }

      drag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        moved: false
      };
      tabButton.setPointerCapture(event.pointerId);
    });

    tabButton.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }

      const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
      if (distance > 10) {
        drag.moved = true;
        tabButton.classList.add("is-dragging");
        if (!drag.ghost) {
          const tab = instance.tabs.find((item) => item.id === tabId);
          drag.ghost = document.createElement("div");
          drag.ghost.className = "tab-drag-ghost";
          drag.ghost.textContent = tab?.title || "Tab";
          document.body.appendChild(drag.ghost);
        }
        moveGhost(event);
      }
    });

    tabButton.addEventListener("pointerup", (event) => {
      if (!drag || event.pointerId !== drag.pointerId) {
        return;
      }

      tabButton.classList.remove("is-dragging");
      removeGhost();
      tabButton.releasePointerCapture(event.pointerId);

      const tabbarRect = instance.tabbar.getBoundingClientRect();
      const isOutsideTabbar =
        event.clientY < tabbarRect.top - 20 ||
        event.clientY > tabbarRect.bottom + 42 ||
        event.clientX < tabbarRect.left - 40 ||
        event.clientX > tabbarRect.right + 40;

      if (drag.moved && isOutsideTabbar) {
        detachBrowserTab(instance, tabId, event.clientX, event.clientY);
      } else {
        activateBrowserTab(instance, tabId);
      }

      drag = null;
    });

    tabButton.addEventListener("pointercancel", () => {
      tabButton.classList.remove("is-dragging");
      removeGhost();
      drag = null;
    });
  }

  function createBrowserWindowElement(name, title) {
    const section = document.createElement("section");
    section.className = "desktop-window browser-window";
    section.dataset.window = name;
    section.setAttribute("aria-labelledby", `${name}-title`);
    section.innerHTML = `
      <div class="window-titlebar">
        <div class="traffic-lights">
          <button class="traffic maximize" type="button" data-window-maximize aria-label="Maximize Browser"></button>
          <button class="traffic close" type="button" data-window-close aria-label="Close Browser"></button>
        </div>
        <p id="${name}-title">${title || "Portfolio Browser"}</p>
      </div>
      <div class="browser-shell">
        <div class="browser-tabbar" role="tablist" aria-label="Open page tabs"></div>
        <div class="browser-addressbar">
          <span class="browser-lock" aria-hidden="true"></span>
          <input class="browser-address-input" type="text" value="Open a portfolio page" aria-label="Browser address or search" />
        </div>
        <iframe class="browser-frame" title="Portfolio page preview"></iframe>
      </div>
    `;
    return section;
  }

  function detachBrowserTab(instance, tabId, clientX, clientY) {
    const tab = closeBrowserTab(instance, tabId);

    if (!tab || !desktopStage) {
      return;
    }

    const name = `browser-${nextBrowserWindowId}`;
    nextBrowserWindowId += 1;
    windowLabels[name] = tab.title;

    const windowElement = createBrowserWindowElement(name, tab.title);
    desktopStage.appendChild(windowElement);
    windows.push(windowElement);
    setupWindow(windowElement);

    const scale = getDesktopScale();
    windowElement.style.left = `${Math.max(24, clientX / scale - 220)}px`;
    windowElement.style.top = `${Math.max(54, clientY / scale - 32)}px`;
    windowElement.style.width = "900px";
    windowElement.style.height = "620px";

    const detachedInstance = getBrowserInstance(name);
    addBrowserTab(detachedInstance, tab.href, tab.title);
  }

  function getViewportBounds() {
    const desktopScale = getDesktopScale();
    const desktopRect = document.querySelector(".desktop-stage")?.getBoundingClientRect();

    return {
      width: (desktopRect?.width || window.innerWidth) / desktopScale,
      height: (desktopRect?.height || window.innerHeight) / desktopScale
    };
  }

  function getBoundedPosition(left, top, windowElement) {
    const desktopRect = document.querySelector(".desktop-stage")?.getBoundingClientRect();
    const windowRect = windowElement.getBoundingClientRect();
    const desktopScale = getDesktopScale();
    const viewportWidth = (desktopRect?.width || window.innerWidth) / desktopScale;
    const viewportHeight = (desktopRect?.height || window.innerHeight) / desktopScale;
    const width = windowRect.width / desktopScale;
    const height = windowRect.height / desktopScale;
    const minVisible = 120;

    return {
      left: Math.min(Math.max(left, -width + minVisible), viewportWidth - minVisible),
      top: Math.min(Math.max(top, 42), viewportHeight - Math.min(90, height))
    };
  }

  function startWindowDrag(event, windowElement) {
    if (
      event.button !== 0 ||
      event.target.closest(".traffic")
    ) {
      return;
    }

    windowElement.classList.remove("is-maximized");
    const desktopScale = getDesktopScale();
    const left = windowElement.offsetLeft;
    const top = windowElement.offsetTop;

    activeDrag = {
      pointerId: event.pointerId,
      windowElement,
      startX: event.clientX / desktopScale,
      startY: event.clientY / desktopScale,
      left,
      top,
      scale: desktopScale
    };

    windowElement.classList.add("is-dragging");
    windowElement.setPointerCapture(event.pointerId);
    focusWindow(windowElement);
  }

  function moveWindowDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    const nextLeft = activeDrag.left + event.clientX / activeDrag.scale - activeDrag.startX;
    const nextTop = activeDrag.top + event.clientY / activeDrag.scale - activeDrag.startY;
    const bounded = getBoundedPosition(nextLeft, nextTop, activeDrag.windowElement);

    activeDrag.windowElement.style.left = `${bounded.left}px`;
    activeDrag.windowElement.style.top = `${bounded.top}px`;
  }

  function endWindowDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    activeDrag.windowElement.classList.remove("is-dragging");
    activeDrag.windowElement.releasePointerCapture(event.pointerId);
    activeDrag = null;
  }

  function createResizeHandles(windowElement) {
    if (windowElement.dataset.resizeReady === "true") {
      return;
    }

    ["n", "e", "s", "w", "ne", "nw", "se", "sw"].forEach((direction) => {
      const handle = document.createElement("span");
      handle.className = `resize-handle resize-handle-${direction}`;
      handle.dataset.resizeDirection = direction;
      handle.setAttribute("aria-hidden", "true");
      windowElement.appendChild(handle);
    });

    windowElement.dataset.resizeReady = "true";
  }

  function startWindowResize(event, windowElement, direction) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    windowElement.classList.remove("is-maximized");

    const desktopScale = getDesktopScale();
    const rect = windowElement.getBoundingClientRect();

    activeResize = {
      pointerId: event.pointerId,
      windowElement,
      direction,
      scale: desktopScale,
      startX: event.clientX / desktopScale,
      startY: event.clientY / desktopScale,
      left: windowElement.offsetLeft,
      top: windowElement.offsetTop,
      width: rect.width / desktopScale,
      height: rect.height / desktopScale,
      minWidth: Number.parseFloat(getComputedStyle(windowElement).minWidth) || 360,
      minHeight: Number.parseFloat(getComputedStyle(windowElement).minHeight) || 240
    };

    windowElement.classList.add("is-dragging");
    event.target.setPointerCapture(event.pointerId);
    focusWindow(windowElement);
  }

  function moveWindowResize(event) {
    if (!activeResize || event.pointerId !== activeResize.pointerId) {
      return;
    }

    const bounds = getViewportBounds();
    const deltaX = event.clientX / activeResize.scale - activeResize.startX;
    const deltaY = event.clientY / activeResize.scale - activeResize.startY;
    let nextLeft = activeResize.left;
    let nextTop = activeResize.top;
    let nextWidth = activeResize.width;
    let nextHeight = activeResize.height;
    const dir = activeResize.direction;

    if (dir.includes("e")) {
      nextWidth = activeResize.width + deltaX;
    }
    if (dir.includes("s")) {
      nextHeight = activeResize.height + deltaY;
    }
    if (dir.includes("w")) {
      nextWidth = activeResize.width - deltaX;
      nextLeft = activeResize.left + deltaX;
    }
    if (dir.includes("n")) {
      nextHeight = activeResize.height - deltaY;
      nextTop = activeResize.top + deltaY;
    }

    if (nextWidth < activeResize.minWidth) {
      if (dir.includes("w")) {
        nextLeft -= activeResize.minWidth - nextWidth;
      }
      nextWidth = activeResize.minWidth;
    }

    if (nextHeight < activeResize.minHeight) {
      if (dir.includes("n")) {
        nextTop -= activeResize.minHeight - nextHeight;
      }
      nextHeight = activeResize.minHeight;
    }

    const maxWidth = bounds.width - Math.max(24, nextLeft);
    const maxHeight = bounds.height - Math.max(50, nextTop) - 18;
    nextWidth = Math.min(nextWidth, maxWidth);
    nextHeight = Math.min(nextHeight, maxHeight);
    nextLeft = Math.min(Math.max(nextLeft, 0), bounds.width - activeResize.minWidth);
    nextTop = Math.min(Math.max(nextTop, 42), bounds.height - activeResize.minHeight);

    activeResize.windowElement.style.left = `${nextLeft}px`;
    activeResize.windowElement.style.top = `${nextTop}px`;
    activeResize.windowElement.style.width = `${nextWidth}px`;
    activeResize.windowElement.style.height = `${nextHeight}px`;
  }

  function endWindowResize(event) {
    if (!activeResize || event.pointerId !== activeResize.pointerId) {
      return;
    }

    activeResize.windowElement.classList.remove("is-dragging");
    activeResize = null;
  }

  function setupWindow(windowElement) {
    if (!windowElement || windowElement.dataset.windowReady === "true") {
      return;
    }

    createResizeHandles(windowElement);
    windowElement.addEventListener("pointerdown", () => focusWindow(windowElement));
    windowElement.querySelector(".window-titlebar")?.addEventListener("pointerdown", (event) => {
      startWindowDrag(event, windowElement);
    });
    windowElement.querySelectorAll("[data-resize-direction]").forEach((handle) => {
      handle.addEventListener("pointerdown", (event) => {
        startWindowResize(event, windowElement, handle.dataset.resizeDirection);
      });
      handle.addEventListener("pointermove", moveWindowResize);
      handle.addEventListener("pointerup", endWindowResize);
      handle.addEventListener("pointercancel", endWindowResize);
    });
    windowElement.addEventListener("pointermove", moveWindowDrag);
    windowElement.addEventListener("pointerup", endWindowDrag);
    windowElement.addEventListener("pointercancel", endWindowDrag);

    if (windowElement.classList.contains("is-open")) {
      stabilizeWindowFrame(windowElement);
    }

    windowElement.querySelector("[data-window-close]")?.addEventListener("click", () => {
      closeWindow(windowElement);
    });

    windowElement.querySelector("[data-window-maximize]")?.addEventListener("click", () => {
      toggleMaximize(windowElement);
    });

    if (windowElement.classList.contains("browser-window")) {
      createBrowserInstance(windowElement);
    }

    windowElement.dataset.windowReady = "true";
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (trigger.closest(".desktop-icons")) {
        return;
      }

      openWindow(trigger.dataset.windowTarget);
    });
  });

  document.querySelectorAll(".desktop-icons button, .desktop-icons a").forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll(".desktop-icons .is-selected").forEach((item) => item.classList.remove("is-selected"));
      icon.classList.add("is-selected");

      const href = icon.getAttribute("href");
      if (href) {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    });

    icon.addEventListener("dblclick", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (icon.matches("a[href]")) {
        return;
      }

      if (icon.dataset.windowTarget) {
        openWindow(icon.dataset.windowTarget);
      }
    });
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");

    if (!link || !isPortfolioPageLink(link)) {
      return;
    }

    event.preventDefault();
    openBrowserTab(link.getAttribute("href"), getBrowserTabTitle(link));
  });

  windows.forEach(setupWindow);

  function setupGuestbook() {
    const form = document.getElementById("guestbook-form");
    const nameInput = document.getElementById("guestbook-name");
    const messageInput = document.getElementById("guestbook-message");
    const notesElement = document.getElementById("guestbook-notes");

    if (!form || !nameInput || !messageInput || !notesElement) {
      return;
    }

    const storageKey = "jona-portfolio-guestbook";
    const getNotes = () => {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || "[]");
      } catch (error) {
        return [];
      }
    };

    const renderNotes = () => {
      const notes = getNotes();
      notesElement.replaceChildren();

      if (!notes.length) {
        const empty = document.createElement("div");
        empty.className = "guestbook-note";
        empty.innerHTML = "<strong>Jona OS</strong><p>No notes yet. Be the first one here.</p>";
        notesElement.appendChild(empty);
        return;
      }

      notes.forEach((note) => {
        const item = document.createElement("article");
        item.className = "guestbook-note";
        const name = document.createElement("strong");
        const message = document.createElement("p");
        name.textContent = note.name;
        message.textContent = note.message;
        item.append(name, message);
        notesElement.appendChild(item);
      });
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        return;
      }

      const notes = getNotes();
      notes.unshift({ name, message });
      localStorage.setItem(storageKey, JSON.stringify(notes.slice(0, 8)));
      form.reset();
      renderNotes();
    });

    renderNotes();
  }

  function setupExplorerWindow() {
    const preview = document.getElementById("explorer-preview");
    let activeInfo = null;

    if (!preview) {
      return;
    }

    function normalizeExplorerChrome() {
      const navLabels = ["<", ">", "^", "R"];
      document.querySelectorAll(".explorer-nav-buttons button").forEach((button, index) => {
        button.textContent = navLabels[index] || button.textContent;
      });

      const ribbonLabels = ["+", "X", "C", "P", "A", "D", "S", "O", "V", "..."];
      document.querySelectorAll(".explorer-ribbon button span").forEach((icon, index) => {
        icon.textContent = ribbonLabels[index] || icon.textContent;
      });

      const viewLabels = ["=", "[]"];
      document.querySelectorAll(".explorer-view-switcher button").forEach((button, index) => {
        button.textContent = viewLabels[index] || button.textContent;
      });
    }

    function renderPassivePreview() {
      preview.innerHTML = `
        <div class="explorer-preview-empty">
          <span class="explorer-preview-empty-icon"></span>
          <p>Select a folder to preview.</p>
        </div>
      `;
    }

    function renderDetailCard(info) {
      activeInfo = info;
      const pills = info.tools.map((tool) => `<span>${tool}</span>`).join("");
      preview.innerHTML = `
        <article class="explorer-detail-card">
          <div class="explorer-detail-logo">${info.logo}</div>
          <p class="explorer-detail-org">${info.organization}</p>
          <div class="explorer-detail-title-row">
            <h3>${info.title}</h3>
            <span class="explorer-detail-status">${info.status}</span>
          </div>
          <p>${info.description}</p>
          <div class="explorer-detail-pills">${pills}</div>
          <div class="explorer-detail-meta">
            <span>${info.date}</span>
            <span>${info.type}</span>
          </div>
          <button class="explorer-detail-cta" type="button">View Full Project -></button>
        </article>
      `;

      preview.querySelector(".explorer-detail-cta")?.addEventListener("click", () => {
        if (info.href) {
          openBrowserTab(info.href, info.title);
        }
      });
    }

    function selectItem(item, info) {
      document.querySelectorAll(".explorer-item").forEach((entry) => entry.classList.remove("is-selected"));
      item.classList.add("is-selected");

      if (info) {
        renderDetailCard(info);
      }
    }

    window.renderExplorerGrid = function renderExplorerGrid(context) {
      const grid = document.getElementById("explorer-files");
      const breadcrumb = document.getElementById("explorer-breadcrumb-current");
      const search = document.getElementById("explorer-search-input");
      const count = document.getElementById("explorer-status-count");
      const tab = document.querySelector(".explorer-tab.is-active");
      const category = portfolioData[context] || portfolioData.certifications;

      if (!grid || !category) {
        return;
      }

      grid.replaceChildren();
      activeInfo = null;

      if (breadcrumb) {
        breadcrumb.textContent = category.label;
      }

      if (tab) {
        tab.textContent = category.label;
      }

      if (search) {
        search.placeholder = `Search ${category.label}`;
        search.value = "";
      }

      if (count) {
        const itemCount = category.folders.length;
        count.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"}`;
      }

      category.folders.forEach((folder) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "explorer-item";
        item.dataset.folderKey = folder.key;
        item.innerHTML = `
          <span class="explorer-folder-icon"></span>
          <strong>${folder.label}</strong>
        `;
        item.addEventListener("click", () => selectItem(item, folder));
        item.addEventListener("dblclick", () => {
          selectItem(item, folder);
          if (folder.href) {
            openBrowserTab(folder.href, folder.title);
          }
        });
        grid.appendChild(item);
      });

      const firstItem = grid.querySelector(".explorer-item");
      firstItem?.classList.add("is-selected");
      renderPassivePreview();
    };

    normalizeExplorerChrome();
    window.renderExplorerGrid("certifications");
    renderPassivePreview();
  }

  function updateExplorerSidebar(context) {
    const rootButtons = document.querySelectorAll("[data-sidebar-root]");
    const category = portfolioData[context] || portfolioData.certifications;

    rootButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.sidebarRoot === context);
    });

    window.renderExplorerGrid?.(category ? context : "certifications");
  }

  function setupExplorerSidebarNavigation() {
    document.querySelectorAll("[data-sidebar-root]").forEach((button) => {
      button.addEventListener("click", () => {
        updateExplorerSidebar(button.dataset.sidebarRoot);
      });
    });

    document.querySelectorAll("[data-explorer-context]").forEach((item) => {
      item.addEventListener("click", () => {
        updateExplorerSidebar(item.dataset.explorerContext);
      });
    });

    updateExplorerSidebar("certifications");
  }

  function setupDesktopFurina() {
    const furina = document.getElementById("desktop-furina");
    const image = furina?.querySelector("img");

    if (!furina || !image) {
      return;
    }

    const size = 96;
    const sprites = {
      idle: ["webmeji-main/Furina/shime1.png"],
      walk: [
        "webmeji-main/Furina/shime1.png",
        "webmeji-main/Furina/shime2.png",
        "webmeji-main/Furina/shime3.png",
        "webmeji-main/Furina/shime2.png"
      ],
      climb: [
        "webmeji-main/Furina/shime15.png",
        "webmeji-main/Furina/shime16.png",
        "webmeji-main/Furina/shime17.png"
      ],
      sit: ["webmeji-main/Furina/shime11.png", "webmeji-main/Furina/shime11v2.png"]
    };
    const state = {
      x: 420,
      y: 520,
      mode: "walk",
      frame: 0,
      targetWindow: null,
      sitUntil: 0,
      side: "left"
    };

    function getFloorY() {
      const bounds = getViewportBounds();
      return Math.max(70, bounds.height - 158);
    }

    function getOpenWindows() {
      return windows
        .filter((windowElement) => {
          return windowElement.classList.contains("is-open") && !windowElement.classList.contains("is-closing");
        })
        .sort((a, b) => (Number.parseInt(b.style.zIndex || "0", 10) || 0) - (Number.parseInt(a.style.zIndex || "0", 10) || 0));
    }

    function chooseTargetWindow() {
      const openWindows = getOpenWindows();
      const focusedWindow = openWindows.find((windowElement) => windowElement.classList.contains("is-focused"));
      return focusedWindow || openWindows[0] || null;
    }

    function getWindowTarget(windowElement) {
      const bounds = getViewportBounds();
      const left = windowElement.offsetLeft;
      const top = windowElement.offsetTop;
      const width = windowElement.offsetWidth;
      const side = state.side;
      const sideX = side === "left" ? left + 20 : left + width - size - 20;
      const sitX = Math.min(Math.max(left + width / 2 - size / 2, 10), bounds.width - size - 10);
      const sitY = Math.max(42, top - size + 8);

      return {
        sideX,
        sitX,
        sitY,
        zIndex: Number.parseInt(windowElement.style.zIndex || "100", 10) || 100
      };
    }

    function setMode(mode) {
      if (state.mode === mode) {
        return;
      }

      state.mode = mode;
      state.frame = 0;
      furina.classList.toggle("is-climbing", mode === "climb");
      furina.classList.toggle("is-sitting", mode === "sit");
    }

    function setSprite() {
      const frames = sprites[state.mode] || sprites.idle;
      image.src = frames[state.frame % frames.length];
      state.frame += 1;
    }

    function render() {
      const bounds = getViewportBounds();
      state.x = Math.min(Math.max(state.x, 8), bounds.width - size - 8);
      state.y = Math.min(Math.max(state.y, 42), bounds.height - size - 86);
      furina.style.left = `${state.x}px`;
      furina.style.top = `${state.y}px`;
    }

    function tick() {
      const now = Date.now();
      const bounds = getViewportBounds();

      if (!state.targetWindow || !state.targetWindow.classList.contains("is-open")) {
        state.targetWindow = chooseTargetWindow();
        state.side = Math.random() > 0.5 ? "left" : "right";
      }

      if (!state.targetWindow) {
        setMode("walk");
        state.x += 1.4;
        if (state.x > bounds.width - size - 24) {
          state.x = 24;
        }
        state.y = getFloorY();
        furina.classList.toggle("is-facing-left", false);
        render();
        return;
      }

      const target = getWindowTarget(state.targetWindow);

      if (state.mode === "sit") {
        state.x += (target.sitX - state.x) * 0.18;
        state.y += (target.sitY - state.y) * 0.18;
        furina.style.zIndex = String(target.zIndex + 5);

        if (now > state.sitUntil) {
          state.targetWindow = chooseTargetWindow();
          state.side = Math.random() > 0.5 ? "left" : "right";
          setMode("walk");
        }

        render();
        return;
      }

      const floorY = getFloorY();

      if (state.mode !== "climb") {
        setMode("walk");
        const deltaX = target.sideX - state.x;
        const stepX = Math.sign(deltaX) * Math.min(Math.abs(deltaX), 4.2);
        state.x += stepX;
        state.y += (floorY - state.y) * 0.12;
        furina.classList.toggle("is-facing-left", stepX < 0);

        if (Math.abs(deltaX) < 8) {
          setMode("climb");
        }
      } else {
        state.x += (target.sideX - state.x) * 0.22;
        state.y -= 5.6;
        furina.style.zIndex = String(target.zIndex + 5);

        if (state.y <= target.sitY) {
          state.y = target.sitY;
          state.x = target.sitX;
          state.sitUntil = now + 5200;
          setMode("sit");
        }
      }

      render();
    }

    state.y = getFloorY();
    render();
    setSprite();
    window.setInterval(setSprite, 260);
    window.setInterval(tick, 32);
  }

  function updateClock() {
    if (!clock) {
      return;
    }

    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(now);
  }

  addRecentWindow("about");
  setupGuestbook();
  setupExplorerWindow();
  setupExplorerSidebarNavigation();
  setupDesktopFurina();
  updateClock();
  window.setInterval(updateClock, 30000);
})();
