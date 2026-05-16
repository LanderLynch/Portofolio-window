(function () {
  let windows = Array.from(document.querySelectorAll("[data-window]"));
  const desktopStage = document.querySelector(".desktop-stage");
  const triggers = Array.from(document.querySelectorAll("[data-window-target]"));
  const clock = document.getElementById("desktop-clock");
  const languageToggle = document.getElementById("desktop-language-toggle");
  const aboutTitle = document.getElementById("about-title");
  const taskbarRecents = document.getElementById("taskbar-recents");
  const windowLabels = {
    about: "About",
    projects: "Project",
    skills: "Skill tree",
    experience: "Experience",
    achievement: "Achievement",
    certifications: "Explorer",
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
          href: "project/pages/personal-gfx-design-collection.html",
          thumbnail: "project/assets/preview-professional-gfx-design-suite.jpg"
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
          href: "project/pages/ikm-design-creative-project.html",
          thumbnail: "project/assets/ikm-project/2026/March/s26 totebag.jpeg"
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
          href: "project/pages/marketing-assistant-hr.html",
          thumbnail: "project/assets/logo-preview/fortress-logo.jpg"
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
          href: "project/pages/lariso-brand-identity.html",
          thumbnail: "project/assets/lariso-project/lariso mock up concept final banner.jpg"
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

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  }

  function animateElement(element, keyframes, options) {
    if (!element?.animate) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const animation = element.animate(keyframes, options);
      animation.addEventListener("finish", resolve, { once: true });
      animation.addEventListener("cancel", resolve, { once: true });
    });
  }

  function stripMotionCloneIds(element) {
    element.removeAttribute("id");
    element.querySelectorAll("[id]").forEach((child) => child.removeAttribute("id"));
  }

  function createMotionWindowClone(windowElement, rect, cloneClass = "") {
    const clone = windowElement.cloneNode(true);
    stripMotionCloneIds(clone);
    clone.classList.add("window-static-clone");
    if (windowElement.id === "window-about") {
      clone.classList.add("about-genie-clone");
    }
    if (cloneClass) {
      clone.classList.add(cloneClass);
    }
    clone.classList.remove("is-open", "is-focused", "is-closing", "is-dragging", "is-motion-hidden");
    clone.setAttribute("aria-hidden", "true");
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.minWidth = "0";
    clone.style.minHeight = "0";
    clone.style.maxWidth = "none";
    clone.style.maxHeight = "none";
    clone.style.left = "0";
    clone.style.top = "0";
    clone.style.animation = "none";
    clone.style.transition = "none";
    clone.querySelectorAll("*").forEach((child) => {
      child.style.animation = "none";
      child.style.transition = "none";
    });
    return clone;
  }

  function createMotionLayer(windowElement, rect, cloneClass = "") {
    const layer = document.createElement("div");
    layer.className = "window-motion-clone";
    layer.style.left = `${rect.left}px`;
    layer.style.top = `${rect.top}px`;
    layer.style.width = `${rect.width}px`;
    layer.style.height = `${rect.height}px`;
    layer.style.borderRadius = getComputedStyle(windowElement).borderRadius;
    layer.appendChild(createMotionWindowClone(windowElement, rect, cloneClass));
    document.body.appendChild(layer);
    return layer;
  }

  function getMinimizeTarget(name) {
    return taskbarRecents?.querySelector(`[data-taskbar-window="${name}"]`) ||
      document.querySelector(`[data-window-target="${name}"]`) ||
      document.querySelector(".dock");
  }

  function getCloseTarget(name, rect) {
    return taskbarRecents?.querySelector(`[data-taskbar-window="${name}"]`) ||
      document.querySelector(`.dock [data-window-target="${name}"]`) ||
      document.querySelector(".dock") ||
      {
        getBoundingClientRect: () => ({
          left: rect.left + rect.width * 0.5 - 24,
          top: window.innerHeight - 58,
          width: 48,
          height: 36
        })
      };
  }

  async function closeAboutWithGenie(windowElement) {
    const rect = windowElement.getBoundingClientRect();
    const targetRect = getCloseTarget("about", rect).getBoundingClientRect();
    const layer = createMotionLayer(windowElement, rect, "genie-close-clone");
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    const dx = targetCenterX - rect.left - rect.width * 0.5;
    const dy = targetCenterY - rect.top - rect.height * 0.5;
    const scaleX = Math.max(0.055, Math.min(0.14, targetRect.width / rect.width));
    const scaleY = Math.max(0.045, Math.min(0.12, targetRect.height / rect.height));
    const skew = targetCenterX < rect.left + rect.width / 2 ? 5 : -5;

    layer.classList.add("is-genie-closing");
    layer.style.transformOrigin = `${Math.max(12, Math.min(88, ((targetCenterX - rect.left) / rect.width) * 100))}% 100%`;

    await new Promise((resolve) => requestAnimationFrame(resolve));
    windowElement.classList.add("is-motion-hidden");

    if (prefersReducedMotion()) {
      await animateElement(layer, [
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        { opacity: 0, transform: "translate3d(0, 10px, 0) scale(0.96)" }
      ], { duration: 220, easing: "ease-out", fill: "forwards" });
      layer.remove();
      return;
    }

    await animateElement(layer, [
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1, 1) skewY(0deg)",
        clipPath: "inset(0 0 0 0 round 26px)"
      },
      {
        opacity: 0.98,
        offset: 0.38,
        transform: `translate3d(${dx * 0.1}px, ${dy * 0.06}px, 0) scale(0.92, 0.86) skewY(${skew * 0.22}deg)`,
        clipPath: "inset(3% 7% 0 7% round 28px)"
      },
      {
        opacity: 0.72,
        offset: 0.74,
        transform: `translate3d(${dx * 0.62}px, ${dy * 0.72}px, 0) scale(0.34, 0.22) skewY(${skew * 0.78}deg)`,
        clipPath: "inset(12% 30% 22% 30% round 20px)"
      },
      {
        opacity: 0,
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scaleX}, ${scaleY}) skewY(${skew}deg)`,
        clipPath: "inset(28% 45% 44% 45% round 14px)"
      }
    ], {
      duration: 720,
      easing: "cubic-bezier(0.18, 0.84, 0.22, 1)",
      fill: "forwards"
    });

    layer.remove();
  }

  async function genieMinimizeWindow(windowElement, targetElement) {
    const rect = windowElement.getBoundingClientRect();
    const targetRect = targetElement?.getBoundingClientRect?.() || {
      left: rect.left + rect.width * 0.5,
      top: window.innerHeight - 48,
      width: 56,
      height: 40
    };
    const layer = createMotionLayer(windowElement, rect);
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;
    const dx = targetCenterX - rect.left;
    const dy = targetCenterY - rect.top;
    const scaleX = Math.max(0.045, Math.min(0.16, targetRect.width / rect.width));
    const scaleY = Math.max(0.04, Math.min(0.12, targetRect.height / rect.height));

    layer.style.transformOrigin = "0 100%";
    windowElement.classList.add("is-motion-hidden");

    if (prefersReducedMotion()) {
      await animateElement(layer, [
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        { opacity: 0, transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scaleX}, ${scaleY})` }
      ], { duration: 180, easing: "ease-out", fill: "forwards" });
      layer.remove();
      return;
    }

    await animateElement(layer, [
      {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1, 1) skewY(0deg)",
        clipPath: "inset(0 0 0 0 round 26px)",
        filter: "blur(0)"
      },
      {
        opacity: 0.96,
        offset: 0.38,
        transform: `translate3d(${dx * 0.18}px, ${dy * 0.18}px, 0) scale(0.9, 0.88) skewY(-1.5deg)`,
        clipPath: "inset(2% 8% 0 8% round 24px)",
        filter: "blur(0.5px)"
      },
      {
        opacity: 0.62,
        offset: 0.72,
        transform: `translate3d(${dx * 0.64}px, ${dy * 0.72}px, 0) scale(0.34, 0.2) skewY(-5deg)`,
        clipPath: "inset(12% 32% 26% 32% round 18px)",
        filter: "blur(2px)"
      },
      {
        opacity: 0,
        transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scaleX}, ${scaleY}) skewY(-8deg)`,
        clipPath: "inset(26% 44% 42% 44% round 14px)",
        filter: "blur(5px)"
      }
    ], {
      duration: 980,
      easing: "cubic-bezier(0.2, 0.86, 0.2, 1)",
      fill: "forwards"
    });

    layer.remove();
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
      const isOpen = windowElement?.classList.contains("is-open") && !windowElement.classList.contains("is-minimized");
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
    if (windowElement.dataset.motionState) {
      return;
    }

    windowElement.classList.remove("is-closing", "is-minimized", "is-motion-hidden");
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

  function finishWindowClose(windowElement) {
    windowElement.classList.remove("is-open", "is-maximized", "is-closing", "is-focused", "is-minimized", "is-motion-hidden");
    delete windowElement.dataset.motionState;
    removeRecentWindow(windowElement.dataset.window);
    syncRecentActive(null);
  }

  function closeWindow(windowElement) {
    if (!windowElement || (!windowElement.classList.contains("is-open") && !windowElement.classList.contains("is-minimized"))) {
      return;
    }

    if (windowElement.dataset.motionState) {
      return;
    }

    if (windowElement.dataset.window === "about" && windowElement.classList.contains("is-open")) {
      windowElement.dataset.motionState = "closing";
      closeAboutWithGenie(windowElement).catch(() => {}).finally(() => finishWindowClose(windowElement));
      return;
    }

    windowElement.classList.remove("is-open", "is-maximized");
    windowElement.classList.add("is-closing");
    removeRecentWindow(windowElement.dataset.window);

    window.setTimeout(() => {
      finishWindowClose(windowElement);
    }, 260);
  }

  function finishWindowMinimize(windowElement) {
    windowElement.classList.remove("is-open", "is-focused", "is-maximized", "is-motion-hidden");
    windowElement.classList.add("is-minimized");
    delete windowElement.dataset.motionState;
    syncRecentActive(null);
  }

  function minimizeWindow(windowElement) {
    if (!windowElement || !windowElement.classList.contains("is-open") || windowElement.dataset.motionState) {
      return;
    }

    const name = windowElement.dataset.window;
    addRecentWindow(name);

    if (name === "about") {
      windowElement.dataset.motionState = "minimizing";
      genieMinimizeWindow(windowElement, getMinimizeTarget(name)).catch(() => {}).finally(() => finishWindowMinimize(windowElement));
      return;
    }

    finishWindowMinimize(windowElement);
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
          <button class="traffic minimize" type="button" data-window-minimize aria-label="Minimize Browser">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14"></path></svg>
          </button>
          <button class="traffic maximize" type="button" data-window-maximize aria-label="Maximize Browser">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 7.5h6.5a2 2 0 0 1 2 2V16"></path><path d="M15.5 16.5H9a2 2 0 0 1-2-2V8"></path></svg>
          </button>
          <button class="traffic close" type="button" data-window-close aria-label="Close Browser">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12"></path><path d="M18 6 6 18"></path></svg>
          </button>
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
    windowElement.querySelectorAll(".explorer-tabs, .browser-tabbar").forEach((dragRegion) => {
      dragRegion.addEventListener("pointerdown", (event) => {
        if (event.target.closest("button, a, input, textarea, .browser-tab")) {
          return;
        }

        startWindowDrag(event, windowElement);
      });
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

    windowElement.querySelector("[data-window-minimize]")?.addEventListener("click", () => {
      minimizeWindow(windowElement);
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

    if (form.dataset.guestbookSource === "firebase") {
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
    const files = document.getElementById("explorer-files");
    const breadcrumb = document.getElementById("explorer-breadcrumb-current");
    const search = document.getElementById("explorer-search-input");
    const count = document.getElementById("explorer-status-count");
    const tabTitle = document.getElementById("explorer-tab-title");
    const shell = document.querySelector(".explorer-shell");
    const recentKey = "jona-portfolio-explorer-recents";
    const sortKey = "portfolio-explorer-sort";
    const viewKey = "portfolio-explorer-view";
    const history = [];
    const sortOptions = {
      name: "Name",
      newest: "Date modified / Newest",
      type: "Type"
    };
    const viewOptions = {
      details: "Details",
      list: "List",
      icons: "Large icons"
    };
    let historyIndex = -1;
    let activeLocation = "home";
    let activeItem = null;
    let loadingTimer = null;
    let sortMode = localStorage.getItem(sortKey) || "name";
    let viewMode = localStorage.getItem(viewKey) || "details";
    let explorerMenu = null;

    if (!preview || !files || !shell) {
      return;
    }

    if (!sortOptions[sortMode]) {
      sortMode = "name";
    }

    if (!viewOptions[viewMode]) {
      viewMode = "details";
    }

    const projectItems = [
      ...portfolioData.projects.folders,
      {
        key: "honkai-e-money",
        label: "Honkai E-Money",
        logo: "EM",
        organization: "Client Work",
        title: "Honkai: Star Rail E-Money Transit Series",
        status: "Completed",
        description: "A custom public transit card series translating Honkai: Star Rail character energy into collectible daily-use merchandise.",
        tools: ["Illustrator", "Photoshop", "Print Design"],
        date: "2 February 2026",
        type: "Client Work",
        href: "project/pages/honkai-star-rail-e-money-transit-series.html",
        thumbnail: "project/assets/E-Money card Design Honkai star rail/Preview depan E-money HSR.jpg"
      },
      {
        key: "documentary-kota-tua",
        label: "Kota Tua UKK",
        logo: "KT",
        organization: "School Project",
        title: "Documentary Kota Tua UKK",
        status: "In Progress",
        description: "School project documentation created in Kota Tua for a UKK assignment with visual storytelling and supporting design assets.",
        tools: ["Premiere Pro", "Photoshop", "Documentary"],
        date: "UKK Project",
        type: "School Work",
        href: "project/pages/documentary-kota-tua-ukk.html",
        thumbnail: "project/assets/logo-preview/yuppentek-logo-kota-tua-version-banner.jpg"
      },
      {
        key: "logo-collection",
        label: "Logo Collection",
        logo: "LG",
        organization: "Brand Identity",
        title: "Logo Design Collection",
        status: "Completed",
        description: "A collection of logo studies and brand identity explorations for varied client and presentation contexts.",
        tools: ["Illustrator", "Branding", "Logo Design"],
        date: "6 Months",
        type: "Design Archive",
        href: "project/pages/logo-design-collection.html",
        thumbnail: "project/assets/logo-preview/Folder UI Design.jpg"
      }
    ].filter((item, index, list) => list.findIndex((entry) => entry.href === item.href) === index);

    const archiveSources = Array.isArray(window.photographyArchive) ? window.photographyArchive : [];
    const photoItems = archiveSources.flatMap((archive) => {
      const images = Array.isArray(archive.images) ? archive.images : [];
      return images.map((imageUrl, index) => {
        const filename = decodeURIComponent(String(imageUrl).split("/").pop()?.split("?")[0] || `${archive.slug}-${index + 1}`);
        return {
          id: `${archive.slug}-${index}`,
          key: `${archive.slug}-${index}`,
          label: filename,
          title: filename,
          itemType: "photo",
          kind: "image",
          description: archive.description || "Photography Archive image preview.",
          date: archive.dateLabel || String(archive.year || ""),
          dateSort: archive.year || parseItemDate({ date: archive.dateLabel }),
          href: imageUrl,
          thumbnail: imageUrl,
          archiveTitle: archive.title,
          organization: archive.location || archive.projectType || "Photography Archive",
          typeLabel: "Image file"
        };
      });
    }).sort((a, b) => (b.dateSort || 0) - (a.dateSort || 0));

    const quickAccess = [
      { id: "quick-projects", label: "Projects", title: "Projects", itemType: "folder", kind: "folder", openLocation: "projects", description: "Portfolio project folders and case studies.", count: projectItems.length, typeLabel: "File folder" },
      { id: "quick-certifications", label: "Certifications", title: "Certifications", itemType: "folder", kind: "folder", openLocation: "certifications", description: "PDF-style certification and achievement records.", count: portfolioData.certifications.folders.length, typeLabel: "File folder" },
      { id: "quick-photography", label: "Photography Archive", title: "Photography Archive", itemType: "folder", kind: "folder", openLocation: "photography", description: "Photography archive grouped from newest to oldest.", count: photoItems.length, typeLabel: "File folder" },
      { id: "quick-skills", label: "Skills", title: "Skills", itemType: "folder", kind: "folder", openLocation: "skills", description: "Creative skill areas and production systems.", count: portfolioData.skills.folders.length, typeLabel: "File folder" }
    ];

    const locations = {
      home: { label: "Home", search: "Search Home" },
      gallery: { label: "Gallery", search: "Search Gallery" },
      projects: { label: "Projects", search: "Search Projects" },
      certifications: { label: "Certifications", search: "Search Certifications" },
      photography: { label: "Photography Archive", search: "Search Photography Archive" },
      skills: { label: "Skills", search: "Search Skills" },
      experience: { label: "Experience", search: "Search Experience" },
      contact: { label: "Contact", search: "Search Contact" }
    };

    function escapeHtml(value) {
      return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function normalizeDataItem(item, itemType = "project") {
      return {
        id: item.key,
        label: item.label || item.title,
        title: item.title || item.label,
        itemType,
        kind: itemType === "certification" ? "pdf" : itemType,
        organization: item.organization,
        status: item.status,
        description: item.description,
        tools: item.tools || [],
        date: item.date,
        href: item.href,
        thumbnail: item.thumbnail,
        typeLabel: itemType === "certification" ? "PDF document" : item.type || "Portfolio item"
      };
    }

    function getRecentItems() {
      try {
        return JSON.parse(localStorage.getItem(recentKey) || "[]");
      } catch (error) {
        return [];
      }
    }

    function saveRecentItem(item) {
      if (!item || item.itemType === "folder") {
        return;
      }

      const recent = getRecentItems().filter((entry) => entry.id !== item.id);
      const stored = {
        id: item.id,
        label: item.label,
        title: item.title,
        itemType: item.itemType,
        kind: item.kind,
        description: item.description,
        date: item.date,
        href: item.href,
        thumbnail: item.thumbnail,
        typeLabel: item.typeLabel
      };
      localStorage.setItem(recentKey, JSON.stringify([stored, ...recent].slice(0, 10)));
    }

    function parseItemDate(item) {
      const rawDate = String(item.date || "").trim();
      const liveDate = `${rawDate} ${item.status || ""}`.toLowerCase();
      if (/(ongoing|on-going|current|present|still)/.test(liveDate)) {
        return Date.parse("1 January 2100");
      }
      const monthNames = {
        januari: "January",
        februari: "February",
        maret: "March",
        april: "April",
        mei: "May",
        juni: "June",
        juli: "July",
        agustus: "August",
        september: "September",
        oktober: "October",
        november: "November",
        desember: "December"
      };
      const normalized = rawDate.replace(/\b(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)\b/gi, (month) => monthNames[month.toLowerCase()] || month);
      const yearMatch = normalized.match(/\b(20\d{2}|19\d{2})\b/);
      const parsed = Date.parse(normalized);

      if (!Number.isNaN(parsed)) {
        return parsed;
      }

      if (yearMatch) {
        return Date.parse(`1 January ${yearMatch[0]}`);
      }

      return 0;
    }

    function getTypeRank(item) {
      if (item.itemType === "folder") return 0;
      if (item.itemType === "project") return 1;
      if (item.itemType === "certification") return 2;
      if (item.itemType === "photo") return 3;
      if (item.itemType === "contact") return 4;
      return 5;
    }

    function sortItems(items) {
      return items
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
          if (sortMode === "newest") {
            const dateDiff = parseItemDate(b.item) - parseItemDate(a.item);
            if (dateDiff) return dateDiff;
          }

          if (sortMode === "type") {
            const typeDiff = getTypeRank(a.item) - getTypeRank(b.item);
            if (typeDiff) return typeDiff;
          }

          const nameDiff = String(a.item.label || a.item.title || "").localeCompare(String(b.item.label || b.item.title || ""), undefined, { sensitivity: "base" });
          return nameDiff || a.index - b.index;
        })
        .map(({ item }) => item);
    }

    function applyExplorerPreferences(groups) {
      return groups.map((group) => ({
        ...group,
        items: sortItems(group.items)
      }));
    }

    function getItemsForLocation(location) {
      if (location === "home") {
        return [
          { group: "Quick Access", items: quickAccess },
          { group: "Recent", items: getRecentItems() }
        ];
      }

      if (location === "gallery") {
        return [{
          group: "Photography Archive",
          items: [{ id: "gallery-photography", label: "Photography Archive", title: "Photography Archive", itemType: "folder", kind: "folder", openLocation: "photography", description: "Open the full image archive sorted newest to oldest.", count: photoItems.length, typeLabel: "File folder" }]
        }];
      }

      if (location === "projects") {
        return [{ group: "Projects", items: projectItems.map((item) => normalizeDataItem(item, "project")) }];
      }

      if (location === "certifications") {
        return [{ group: "Certifications", items: portfolioData.certifications.folders.map((item) => normalizeDataItem(item, "certification")) }];
      }

      if (location === "photography") {
        return [{ group: "Newest to oldest", items: photoItems }];
      }

      if (location === "skills") {
        return [{ group: "Skills", items: portfolioData.skills.folders.map((item) => normalizeDataItem(item, "skill")) }];
      }

      if (location === "experience") {
        return [{
          group: "Experience",
          items: [
            { id: "ikm-experience", label: "Design Creative - IKM", title: "Design Creative - PT Internusa Kreasindo Mandiri", itemType: "experience", kind: "document", description: "Producing social media visuals, product mockups, company presentation graphics, marketing layouts, and branded design assets from concept to delivery.", date: "2025 Aug - Present", openWindow: "experience", thumbnail: "project/assets/ikm-project/2026/March/s26 totebag.jpeg", typeLabel: "Experience file" },
            { id: "freelance-experience", label: "Freelance Designer & Photographer", title: "Freelance Graphic Designer & Photographer", itemType: "experience", kind: "document", description: "Handling poster design, banners, GFX visuals, event documentation, portrait sessions, and curated web project pages for personal and client-facing archives.", date: "2023 - Present", openWindow: "experience", thumbnail: "project/assets/kota-tua/cosplayer-1.jpg", typeLabel: "Experience file" },
            { id: "aryaduta-experience", label: "Sport Desk Staff", title: "Sport Desk Staff - Hotel Aryaduta Country Club", itemType: "experience", kind: "document", description: "Supported guest service, day-to-day reporting, sport facility operations, and promotion support while building stronger communication and service workflow habits.", date: "Jul - Oct 2024", openWindow: "experience", thumbnail: "project/assets/certification-files/certification-trainee/aryaduta-trainee-website-certification.jpg", typeLabel: "Experience file" }
          ]
        }];
      }

      if (location === "contact") {
        return [{
          group: "Contact",
          items: [
            { id: "email-contact", label: "Email Jona", title: "Email Jona Setiawan", itemType: "contact", kind: "document", description: "Open an email draft to contact Jona.", href: "mailto:jonasaevuddyinsetiawan@gmail.com", typeLabel: "Contact shortcut" },
            { id: "instagram-contact", label: "Instagram", title: "Instagram", itemType: "contact", kind: "document", description: "Open Instagram profile.", href: "https://www.instagram.com/jona.mmzv/", typeLabel: "Web shortcut" },
            { id: "linkedin-contact", label: "LinkedIn", title: "LinkedIn", itemType: "contact", kind: "document", description: "Open LinkedIn profile.", href: "https://www.linkedin.com/in/jona-setiawan-099149311/", typeLabel: "Web shortcut" }
          ]
        }];
      }

      return [];
    }

    function renderPassivePreview() {
      preview.innerHTML = `
        <div class="explorer-preview-empty">
          <span class="explorer-preview-empty-icon"></span>
          <p>Select an item to preview.</p>
        </div>
      `;
    }

    function getIconClass(item) {
      if (item.itemType === "folder") return "explorer-file-folder";
      if (item.itemType === "certification") return "explorer-file-pdf";
      if (item.itemType === "photo") return "explorer-file-photo";
      if (item.itemType === "skill") return "explorer-file-code";
      if (item.itemType === "contact") return "explorer-file-contact";
      return "explorer-file-document";
    }

    function renderPreview(item) {
      activeItem = item;
      const tags = (item.tools || []).map((tool) => `<span>${escapeHtml(tool)}</span>`).join("");
      const thumbnail = item.thumbnail ? `<img class="explorer-preview-image" src="${escapeHtml(item.thumbnail)}" alt="">` : "";
      const countText = item.itemType === "folder" ? `<p>${item.count || 0} items</p>` : "";
      const hint = item.href || item.openWindow || item.openLocation ? "Double-click to open" : "Preview only";

      preview.innerHTML = `
        <article class="explorer-detail-card">
          ${thumbnail || `<div class="explorer-preview-large-icon ${getIconClass(item)}"></div>`}
          <p class="explorer-detail-org">${escapeHtml(item.organization || item.typeLabel || item.itemType)}</p>
          <div class="explorer-detail-title-row">
            <h3>${escapeHtml(item.title || item.label)}</h3>
            ${item.status ? `<span class="explorer-detail-status">${escapeHtml(item.status)}</span>` : ""}
          </div>
          ${countText}
          <p>${escapeHtml(item.description || "Portfolio item ready to preview.")}</p>
          ${tags ? `<div class="explorer-detail-pills">${tags}</div>` : ""}
          <div class="explorer-detail-meta">
            <span>${escapeHtml(item.date || locations[activeLocation]?.label || "")}</span>
            <span>${escapeHtml(item.typeLabel || item.itemType || "")}</span>
          </div>
          <small>${hint}</small>
        </article>
      `;
    }

    function updateStatus(itemCount, item = null) {
      if (!count) {
        return;
      }

      const selected = item ? `1 item selected | ${item.typeLabel || item.itemType}` : "0 items selected";
      count.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"} | ${selected}`;
    }

    function selectItem(itemElement, item, itemCount) {
      document.querySelectorAll(".explorer-item").forEach((entry) => entry.classList.remove("is-selected"));
      itemElement.classList.add("is-selected");
      renderPreview(item);
      updateStatus(itemCount, item);
    }

    function openExplorerItem(item) {
      if (!item) {
        return;
      }

      if (item.openLocation) {
        navigateExplorer(item.openLocation);
        return;
      }

      saveRecentItem(item);

      if (item.openWindow) {
        openWindow(item.openWindow);
        return;
      }

      if (!item.href) {
        return;
      }

      if (item.href.startsWith("mailto:")) {
        window.location.href = item.href;
        return;
      }

      openBrowserTab(item.href, item.title || item.label);
    }

    function filterGroups(groups) {
      const term = (search?.value || "").trim().toLowerCase();
      if (!term) {
        return groups;
      }

      return groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            return [item.label, item.title, item.description, item.typeLabel]
              .filter(Boolean)
              .some((value) => String(value).toLowerCase().includes(term));
          })
        }))
        .filter((group) => group.items.length);
    }

    function renderLoading() {
      files.innerHTML = `
        <div class="explorer-loading">
          <span></span>
          <p>Loading items...</p>
        </div>
      `;
    }

    function syncExplorerControls() {
      shell.dataset.explorerView = viewMode;
      document.querySelectorAll("[data-explorer-menu-trigger]").forEach((button) => {
        const kind = button.dataset.explorerMenuTrigger;
        const activeLabel = kind === "sort" ? sortOptions[sortMode] : viewOptions[viewMode];
        button.setAttribute("aria-haspopup", "menu");
        button.setAttribute("aria-expanded", "false");
        button.title = activeLabel || "";
      });
    }

    function renderItems(location) {
      const groups = applyExplorerPreferences(filterGroups(getItemsForLocation(location)));
      const itemCount = groups.reduce((total, group) => total + group.items.length, 0);
      const selectedId = activeItem?.id;
      let selectedRow = null;
      let selectedItem = null;
      files.replaceChildren();
      files.classList.remove("is-loading");
      files.dataset.explorerLocation = location;
      files.dataset.explorerView = location === "photography" ? "gallery" : viewMode;

      if (!itemCount) {
        files.innerHTML = `<div class="explorer-empty-state">No items match this location.</div>`;
        updateStatus(0);
        renderPassivePreview();
        return;
      }

      if (viewMode === "details") {
        const columns = document.createElement("div");
        columns.className = "explorer-column-header";
        columns.innerHTML = `
          <span>Name</span>
          <span>Date modified</span>
          <span>Type</span>
          <span>Status</span>
        `;
        files.appendChild(columns);
      }

      groups.forEach((group) => {
        const section = document.createElement("section");
        section.className = "explorer-file-group";
        section.innerHTML = `<h3>${escapeHtml(group.group)}</h3>`;

        const list = document.createElement("div");
        list.className = "explorer-file-list";

        if (!group.items.length) {
          list.innerHTML = `<p class="explorer-file-empty">No recent items yet.</p>`;
          section.appendChild(list);
          files.appendChild(section);
          return;
        }

        group.items.forEach((item, index) => {
          const row = document.createElement("button");
          row.type = "button";
          row.className = "explorer-item";
          row.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 28}ms`);
          row.innerHTML = `
            <span class="explorer-item-icon ${getIconClass(item)}">${item.itemType === "photo" && item.thumbnail ? `<img src="${escapeHtml(item.thumbnail)}" alt="">` : ""}</span>
            <span class="explorer-item-main">
              <strong>${escapeHtml(item.label || item.title)}</strong>
              <small>${escapeHtml(item.description || item.typeLabel || "")}</small>
            </span>
            <span class="explorer-item-date">${escapeHtml(item.date || "")}</span>
            <span class="explorer-item-kind">${escapeHtml(item.typeLabel || item.itemType || "")}</span>
            <span class="explorer-item-status">${escapeHtml(item.status || "")}</span>
          `;
          row.addEventListener("click", () => selectItem(row, item, itemCount));
          row.addEventListener("dblclick", () => openExplorerItem(item));
          if (item.id === selectedId) {
            selectedRow = row;
            selectedItem = item;
          }
          list.appendChild(row);
        });

        section.appendChild(list);
        files.appendChild(section);
      });

      if (selectedRow && selectedItem) {
        selectItem(selectedRow, selectedItem, itemCount);
      } else {
        updateStatus(itemCount);
        renderPassivePreview();
      }
    }

    function setExplorerChrome(location) {
      const locationInfo = locations[location] || locations.home;
      shell.dataset.explorerLocation = location;

      if (breadcrumb) {
        breadcrumb.textContent = locationInfo.label;
      }

      if (tabTitle) {
        tabTitle.textContent = locationInfo.label === "Home" ? "Explorer" : locationInfo.label;
      }

      if (search) {
        search.placeholder = locationInfo.search;
      }

      document.querySelectorAll("[data-sidebar-root]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.sidebarRoot === location);
      });
      syncExplorerControls();
    }

    function closeExplorerMenu() {
      if (!explorerMenu) {
        return;
      }

      document.querySelectorAll("[data-explorer-menu-trigger]").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
      });
      explorerMenu.remove();
      explorerMenu = null;
    }

    function setSortMode(mode) {
      if (!sortOptions[mode]) {
        return;
      }

      sortMode = mode;
      localStorage.setItem(sortKey, sortMode);
      syncExplorerControls();
      renderItems(activeLocation);
    }

    function setViewMode(mode) {
      if (!viewOptions[mode]) {
        return;
      }

      viewMode = mode;
      localStorage.setItem(viewKey, viewMode);
      syncExplorerControls();
      renderItems(activeLocation);
    }

    function openExplorerMenu(kind, trigger) {
      const options = kind === "sort" ? sortOptions : viewOptions;
      const activeMode = kind === "sort" ? sortMode : viewMode;
      const rect = trigger.getBoundingClientRect();
      closeExplorerMenu();

      explorerMenu = document.createElement("div");
      explorerMenu.className = "explorer-toolbar-menu";
      explorerMenu.dataset.menuKind = kind;
      explorerMenu.setAttribute("role", "menu");
      explorerMenu.style.left = `${Math.min(rect.left, window.innerWidth - 230)}px`;
      explorerMenu.style.top = `${rect.bottom + 8}px`;
      explorerMenu.innerHTML = Object.entries(options).map(([mode, label]) => `
        <button type="button" role="menuitemradio" aria-checked="${mode === activeMode}" data-explorer-menu-option="${mode}" class="${mode === activeMode ? "is-active" : ""}">
          <span class="explorer-menu-check" aria-hidden="true"></span>
          <span>${escapeHtml(label)}</span>
        </button>
      `).join("");

      explorerMenu.addEventListener("click", (event) => {
        const option = event.target.closest("[data-explorer-menu-option]");
        if (!option) {
          return;
        }

        if (kind === "sort") {
          setSortMode(option.dataset.explorerMenuOption);
        } else {
          setViewMode(option.dataset.explorerMenuOption);
        }

        closeExplorerMenu();
      });

      document.body.appendChild(explorerMenu);
      trigger.setAttribute("aria-expanded", "true");
    }

    function navigateExplorer(location, addToHistory = true) {
      activeLocation = locations[location] ? location : "home";
      activeItem = null;
      if (addToHistory && search) {
        search.value = "";
      }
      setExplorerChrome(activeLocation);
      renderLoading();

      if (addToHistory) {
        history.splice(historyIndex + 1);
        history.push(activeLocation);
        historyIndex = history.length - 1;
      }

      window.clearTimeout(loadingTimer);
      loadingTimer = window.setTimeout(() => renderItems(activeLocation), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 140);
    }

    window.renderExplorerGrid = function renderExplorerGrid(context) {
      navigateExplorer(locations[context] ? context : "home");
    };

    search?.addEventListener("input", () => renderItems(activeLocation));
    document.querySelector("[data-explorer-refresh]")?.addEventListener("click", () => navigateExplorer(activeLocation, false));
    document.querySelector("[data-explorer-up]")?.addEventListener("click", () => navigateExplorer("home"));
    document.querySelector("[data-explorer-preview-toggle]")?.addEventListener("click", () => {
      shell.classList.toggle("is-preview-collapsed");
    });
    document.querySelectorAll("[data-explorer-menu-trigger]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const kind = button.dataset.explorerMenuTrigger;
        if (explorerMenu?.dataset.menuKind === kind) {
          closeExplorerMenu();
          return;
        }

        openExplorerMenu(kind, button);
      });
    });
    document.addEventListener("click", (event) => {
      if (!explorerMenu || explorerMenu.contains(event.target) || event.target.closest("[data-explorer-menu-trigger]")) {
        return;
      }

      closeExplorerMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeExplorerMenu();
      }
    });
    document.querySelector("[data-explorer-back]")?.addEventListener("click", () => {
      if (historyIndex <= 0) return;
      historyIndex -= 1;
      navigateExplorer(history[historyIndex], false);
    });
    document.querySelector("[data-explorer-forward]")?.addEventListener("click", () => {
      if (historyIndex >= history.length - 1) return;
      historyIndex += 1;
      navigateExplorer(history[historyIndex], false);
    });

    syncExplorerControls();
    navigateExplorer("home");
  }

  function updateExplorerSidebar(context) {
    window.renderExplorerGrid?.(context || "home");
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

    updateExplorerSidebar("home");
  }

  function setupDesktopFurina() {
    const furina = document.getElementById("desktop-furina");
    const image = furina?.querySelector("img");

    if (!furina || !image) {
      return;
    }

    const size = 96;
    const desktopScale = () => getDesktopScale();
    const sprites = {
      stand: ["webmeji-main/Furina/shime1.png", "webmeji-main/Furina/shime1.png", "webmeji-main/Furina/shime2.png"],
      walk: ["webmeji-main/Furina/shime1.png", "webmeji-main/Furina/shime2.png", "webmeji-main/Furina/shime3.png", "webmeji-main/Furina/shime2.png"],
      run: ["webmeji-main/Furina/shime4.png", "webmeji-main/Furina/shime5.png", "webmeji-main/Furina/shime6.png", "webmeji-main/Furina/shime5.png"],
      sit: ["webmeji-main/Furina/shime11.png", "webmeji-main/Furina/shime11v2.png", "webmeji-main/Furina/shime11v3.png"],
      sitFaceMouse: ["webmeji-main/Furina/shime12.png", "webmeji-main/Furina/shime13.png", "webmeji-main/Furina/shime14.png"],
      spinHead: ["webmeji-main/Furina/shime20.png", "webmeji-main/Furina/shime20v2.png", "webmeji-main/Furina/shime20v3.png", "webmeji-main/Furina/shime20v4.png"],
      dragged: ["webmeji-main/Furina/shime26.png", "webmeji-main/Furina/shime27.png"],
      thrown: ["webmeji-main/Furina/shime28.png", "webmeji-main/Furina/shime29.png"],
      fall: ["webmeji-main/Furina/shime30.png", "webmeji-main/Furina/shime31.png"],
      bounce: ["webmeji-main/Furina/shime32.png", "webmeji-main/Furina/shime33.png"],
      recover: ["webmeji-main/Furina/shime34.png", "webmeji-main/Furina/shime35.png"],
      climbWall: ["webmeji-main/Furina/shime15.png", "webmeji-main/Furina/shime16.png", "webmeji-main/Furina/shime17.png"]
    };
    const state = {
      x: 420,
      y: 0,
      vx: 1.2,
      vy: 0,
      mode: "walk",
      frame: 0,
      lastFrameAt: 0,
      nextDecisionAt: 0,
      modeUntil: 0,
      targetX: 720,
      dragging: false,
      dragPointerId: null,
      dragOffsetX: 0,
      dragOffsetY: 0,
      lastPointerX: 0,
      lastPointerY: 0,
      lastPointerAt: 0,
      mouseX: 0
    };

    function getFloorY() {
      const bounds = getViewportBounds();
      return Math.max(70, bounds.height - 158);
    }

    function clampPosition() {
      const bounds = getViewportBounds();
      state.x = Math.min(Math.max(state.x, 8), bounds.width - size - 8);
      state.y = Math.min(Math.max(state.y, 42), getFloorY());
    }

    function setMode(mode, duration = 2600) {
      if (state.mode === mode) {
        return;
      }

      state.mode = mode;
      state.frame = 0;
      state.modeUntil = performance.now() + duration;
      furina.classList.toggle("is-climbing", mode === "climbWall");
      furina.classList.toggle("is-sitting", mode === "sit" || mode === "sitFaceMouse" || mode === "spinHead");
      furina.classList.toggle("is-dragged", mode === "dragged" || mode === "thrown" || mode === "fall");
    }

    function setSprite(now) {
      const frameDuration = state.mode === "run" ? 110 : state.mode === "walk" ? 170 : 240;
      if (now - state.lastFrameAt < frameDuration) return;
      const frames = sprites[state.mode] || sprites.stand;
      image.src = frames[state.frame % frames.length];
      state.frame += 1;
      state.lastFrameAt = now;
    }

    function render() {
      clampPosition();
      furina.style.left = `${state.x}px`;
      furina.style.top = `${state.y}px`;
    }

    function chooseNextState(now) {
      const bounds = getViewportBounds();
      const roll = Math.random() * 100;
      state.nextDecisionAt = now + 2400 + Math.random() * 3200;

      if (roll < 70) {
        state.targetX = 24 + Math.random() * Math.max(120, bounds.width - size - 48);
        state.vx = state.targetX >= state.x ? 1.25 : -1.25;
        setMode("walk", 4200);
        return;
      }

      if (roll < 90) {
        setMode(Math.random() > 0.48 ? "sit" : "stand", 3000 + Math.random() * 2400);
        return;
      }

      if (roll < 97) {
        setMode(Math.random() > 0.5 ? "sitFaceMouse" : "spinHead", 2200);
        return;
      }

      if (roll < 99) {
        state.targetX = state.x < bounds.width / 2 ? 8 : bounds.width - size - 8;
        state.vx = state.targetX >= state.x ? 0.9 : -0.9;
        setMode("climbWall", 900);
        return;
      }

      state.targetX = 24 + Math.random() * Math.max(120, bounds.width - size - 48);
      state.vx = state.targetX >= state.x ? 3.2 : -3.2;
      setMode("run", 1500);
    }

    function tick(now) {
      const floorY = getFloorY();
      setSprite(now);

      if (state.dragging) {
        render();
        requestAnimationFrame(tick);
        return;
      }

      if (state.mode === "thrown" || state.mode === "fall") {
        state.vy += 0.42;
        state.x += state.vx;
        state.y += state.vy;
        if (state.y >= floorY) {
          state.y = floorY;
          state.vy = -Math.min(Math.abs(state.vy) * 0.28, 4.2);
          setMode("bounce", 520);
          state.nextDecisionAt = now + 900;
        }
        furina.classList.toggle("is-facing-left", state.vx < 0);
        render();
        requestAnimationFrame(tick);
        return;
      }

      if (state.mode === "bounce" && now > state.modeUntil) {
        setMode("recover", 620);
      }

      if (state.mode === "recover" && now > state.modeUntil) {
        setMode("stand", 1200);
        state.nextDecisionAt = now + 900;
      }

      if (state.mode === "walk" || state.mode === "run") {
        const speed = state.mode === "run" ? 3.2 : 1.25;
        const direction = state.targetX >= state.x ? 1 : -1;
        state.x += direction * speed;
        furina.classList.toggle("is-facing-left", direction < 0);
        if (Math.abs(state.targetX - state.x) < 8 || now > state.modeUntil) {
          state.nextDecisionAt = now;
        }
      } else if (state.mode === "sitFaceMouse") {
        furina.classList.toggle("is-facing-left", state.mouseX < state.x + size / 2);
      } else if (state.mode === "climbWall") {
        state.x += state.vx;
        state.y -= 0.7;
        if (now > state.modeUntil || state.y < floorY - 48) {
          state.y = Math.min(state.y + 8, floorY);
          state.nextDecisionAt = now;
          setMode("stand", 800);
        }
      }

      if (!["thrown", "fall", "bounce"].includes(state.mode)) {
        state.y += (floorY - state.y) * 0.16;
      }

      if (now >= state.nextDecisionAt && !["bounce", "recover"].includes(state.mode)) {
        chooseNextState(now);
      }

      render();
      requestAnimationFrame(tick);
    }

    furina.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const currentScale = desktopScale();
      state.dragging = true;
      state.dragPointerId = event.pointerId;
      state.dragOffsetX = event.clientX / currentScale - state.x;
      state.dragOffsetY = event.clientY / currentScale - state.y;
      state.lastPointerX = event.clientX / currentScale;
      state.lastPointerY = event.clientY / currentScale;
      state.lastPointerAt = performance.now();
      setMode("dragged", 100000);
      furina.setPointerCapture(event.pointerId);
    });

    furina.addEventListener("pointermove", (event) => {
      const currentScale = desktopScale();
      state.mouseX = event.clientX / currentScale;
      if (!state.dragging || event.pointerId !== state.dragPointerId) return;
      const now = performance.now();
      const x = event.clientX / currentScale;
      const y = event.clientY / currentScale;
      const deltaTime = Math.max(16, now - state.lastPointerAt);
      state.vx = ((x - state.lastPointerX) / deltaTime) * 16;
      state.vy = ((y - state.lastPointerY) / deltaTime) * 16;
      state.x = x - state.dragOffsetX;
      state.y = y - state.dragOffsetY;
      state.lastPointerX = x;
      state.lastPointerY = y;
      state.lastPointerAt = now;
      render();
    });

    function releaseDrag(event) {
      if (!state.dragging || event.pointerId !== state.dragPointerId) return;
      state.dragging = false;
      state.dragPointerId = null;
      furina.releasePointerCapture?.(event.pointerId);
      setMode(Math.abs(state.vx) > 2 || Math.abs(state.vy) > 2 ? "thrown" : "fall", 1000);
    }

    furina.addEventListener("pointerup", releaseDrag);
    furina.addEventListener("pointercancel", releaseDrag);
    document.addEventListener("pointermove", (event) => {
      state.mouseX = event.clientX / desktopScale();
    });

    state.y = getFloorY();
    chooseNextState(performance.now());
    render();
    requestAnimationFrame(tick);
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

    updateAboutGreeting(now);
  }

  function getTimeGreeting(date = new Date()) {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Good night";
  }

  function updateAboutGreeting(date = new Date()) {
    if (aboutTitle) {
      aboutTitle.textContent = getTimeGreeting(date);
    }
  }

  function setupTopBarControls() {
    function syncLanguageButton(language) {
      if (!languageToggle) return;
      const current = window.portfolioLanguage?.normalizeLanguage?.(language) || language || "en";
      languageToggle.textContent = current === "id" ? "IDN" : "ENG";
      languageToggle.setAttribute("aria-label", `Switch language, current ${languageToggle.textContent}`);
    }

    syncLanguageButton(window.portfolioLanguage?.getCurrentLanguage?.() || "en");

    languageToggle?.addEventListener("click", () => {
      const current = window.portfolioLanguage?.getCurrentLanguage?.() || "en";
      window.portfolioLanguage?.applyTranslations?.(current === "id" ? "en" : "id");
    });

    document.addEventListener("portfolio-language-change", (event) => {
      syncLanguageButton(event.detail?.language || "en");
    });
  }

  addRecentWindow("about");
  setupTopBarControls();
  setupGuestbook();
  setupExplorerWindow();
  setupExplorerSidebarNavigation();
  setupDesktopFurina();
  updateClock();
  window.setInterval(updateClock, 30000);
})();
