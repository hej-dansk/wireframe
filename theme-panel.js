/* Live theme customizer — hover (or tap) the palette tab, bottom-right,
   to reveal color pickers and font selects. Everything is wired straight
   to the CSS custom properties in site.css, so a change here ripples
   across every page immediately — and is saved to localStorage so it
   carries over the moment you open (or navigate to) any other page. */
(function () {
  const STORAGE_KEY = "hejdansk-theme";
  const VARS = [
    { key: "--navy",   label: "Navy" },
    { key: "--green",  label: "Orange" },
    { key: "--amber",  label: "Glacier" },
    { key: "--red",    label: "Red" },
  ];
  const HEADING_FONTS = ["League Spartan", "Poppins", "Space Grotesk", "Fraunces", "DM Sans"];
  const BODY_FONTS = ["Inter", "Poppins", "DM Sans", "Source Sans Pro", "System UI"];

  function loadStore() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveStore(store) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }
    catch (e) { /* storage unavailable — customizer still works for this page */ }
  }

  function hexFromComputed(varName) {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (/^#([0-9a-f]{3}){1,2}$/i.test(val)) return val;
    const probe = document.createElement("div");
    probe.style.color = val;
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color.match(/\d+/g).map(Number);
    document.body.removeChild(probe);
    return "#" + rgb.slice(0, 3).map(n => n.toString(16).padStart(2, "0")).join("");
  }

  function fontFamilyValue(name) {
    return name === "System UI" ? "-apple-system, BlinkMacSystemFont, sans-serif" : `"${name}", sans-serif`;
  }

  function buildPanel() {
    const wrap = document.createElement("div");
    wrap.className = "theme-tab-wrap";
    const store = loadStore();

    let colorRows = "";
    VARS.forEach(v => {
      const hex = hexFromComputed(v.key);
      colorRows += `
        <label class="tp-row">
          <span>${v.label}</span>
          <input type="color" data-var="${v.key}" value="${hex}">
        </label>`;
    });

    const headingCurrent = (store.fonts && store.fonts.heading) || HEADING_FONTS[0];
    const bodyCurrent = (store.fonts && store.fonts.body) || BODY_FONTS[0];
    let headingOpts = HEADING_FONTS.map(f => `<option value="${f}" ${f === headingCurrent ? "selected" : ""}>${f}</option>`).join("");
    let bodyOpts = BODY_FONTS.map(f => `<option value="${f}" ${f === bodyCurrent ? "selected" : ""}>${f}</option>`).join("");

    wrap.innerHTML = `
      <button class="theme-tab" type="button" aria-label="Customize colors and fonts">🎨</button>
      <div class="theme-panel">
        <div class="tp-title">Customize</div>
        <div class="tp-hint">Applies to every page</div>
        <div class="tp-section-label">Colors</div>
        ${colorRows}
        <div class="tp-section-label">Fonts</div>
        <label class="tp-row tp-row--select">
          <span>Headings</span>
          <select data-font="--font-display" data-fontkey="heading">${headingOpts}</select>
        </label>
        <label class="tp-row tp-row--select">
          <span>Body</span>
          <select data-font="--font-body" data-fontkey="body">${bodyOpts}</select>
        </label>
        <button class="tp-reset" type="button">Reset to default</button>
      </div>
    `;
    document.body.appendChild(wrap);

    // pin open on click (for touch), still opens on hover via CSS
    const tab = wrap.querySelector(".theme-tab");
    tab.addEventListener("click", () => wrap.classList.toggle("is-pinned"));
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove("is-pinned");
    });

    wrap.querySelectorAll('input[type="color"]').forEach(input => {
      input.addEventListener("input", () => {
        document.documentElement.style.setProperty(input.dataset.var, input.value);
        const s = loadStore();
        s.colors = s.colors || {};
        s.colors[input.dataset.var] = input.value;
        saveStore(s);
      });
    });

    wrap.querySelectorAll("select[data-font]").forEach(sel => {
      sel.addEventListener("change", () => {
        document.documentElement.style.setProperty(sel.dataset.font, fontFamilyValue(sel.value));
        const s = loadStore();
        s.fonts = s.fonts || {};
        s.fonts[sel.dataset.fontkey] = sel.value;
        saveStore(s);
      });
    });

    wrap.querySelector(".tp-reset").addEventListener("click", () => {
      VARS.forEach(v => document.documentElement.style.removeProperty(v.key));
      document.documentElement.style.removeProperty("--font-display");
      document.documentElement.style.removeProperty("--font-body");
      saveStore({});
      wrap.querySelectorAll('input[type="color"]').forEach(input => {
        input.value = hexFromComputed(input.dataset.var);
      });
      wrap.querySelectorAll("select").forEach(sel => sel.selectedIndex = 0);
    });
  }

  document.addEventListener("DOMContentLoaded", buildPanel);
})();
