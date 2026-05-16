(function () {
  const storageKey = "portfolio-color-theme";

  function isDesktopHomepage() {
    const pathname = window.location.pathname;
    const path = pathname.replace(/\/+$/, "");
    const pageName = path.split("/").pop();

    return pathname === "/" || pathname.endsWith("/") || pageName === "index.html" || pageName === "index";
  }

  const pageTheme = isDesktopHomepage() ? "blue" : "light";

  window.portfolioThemeConfig = {
    defaultTheme: pageTheme,
    storageKey,
    supportedThemes: ["blue", "light"],
    isThemeLocked: true,
    mode: "page-based",
  };

  try {
    window.localStorage.setItem(storageKey, pageTheme);
  } catch (error) {
    // Ignore storage access errors. The DOM theme attribute is still applied.
  }

  document.documentElement.setAttribute("data-theme", pageTheme);
})();
