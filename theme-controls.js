(function () {
  const storageKey = "portfolio-color-theme";
  const supportedThemes = ["blue", "light"];

  function isDesktopHomepage() {
    const pathname = window.location.pathname;
    const path = pathname.replace(/\/+$/, "");
    const pageName = path.split("/").pop();

    return pathname === "/" || pathname.endsWith("/") || pageName === "index.html" || pageName === "index";
  }

  function getPageTheme() {
    return isDesktopHomepage() ? "blue" : "light";
  }

  function applyPageTheme() {
    const pageTheme = getPageTheme();

    document.documentElement.setAttribute("data-theme", pageTheme);

    if (document.body) {
      document.body.setAttribute("data-theme", pageTheme);
    }

    try {
      window.localStorage.setItem(storageKey, pageTheme);
    } catch (error) {
      // Ignore storage access errors.
    }

    document.querySelectorAll("[data-theme-value]").forEach((button) => {
      const isActive = button.dataset.themeValue === pageTheme;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      button.hidden = true;
      button.setAttribute("aria-hidden", "true");
      button.setAttribute("tabindex", "-1");
    });

    document.querySelectorAll(".theme-toggle, #desktop-theme-toggle").forEach((button) => {
      button.hidden = true;
      button.setAttribute("aria-hidden", "true");
      button.setAttribute("tabindex", "-1");
    });

    document.dispatchEvent(
      new CustomEvent("portfolio-theme-change", {
        detail: { theme: pageTheme, locked: true, mode: "page-based" },
      }),
    );

    return pageTheme;
  }

  function normalizeTheme() {
    return getPageTheme();
  }

  function getStoredTheme() {
    return getPageTheme();
  }

  function initThemeControls() {
    return applyPageTheme();
  }

  window.portfolioThemeConfig = {
    defaultTheme: getPageTheme(),
    storageKey,
    supportedThemes: [...supportedThemes],
    isThemeLocked: true,
    mode: "page-based",
  };

  window.portfolioTheme = {
    applyTheme: applyPageTheme,
    getStoredTheme,
    initThemeControls,
    normalizeTheme,
    storageKey,
    supportedThemes: [...supportedThemes],
    syncThemeButtons: applyPageTheme,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeControls, { once: true });
  } else {
    initThemeControls();
  }
})();
