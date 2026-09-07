// Tiny live theme-switcher, shared by all six pages.
// Setting data-theme on <html> is all a real theme needs to do —
// every color in theme.css cascades from that one attribute.
(function () {
  var THEMES = ["glacier", "sunset", "mono"];

  function apply(theme) {
    if (theme === "glacier") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    document.querySelectorAll(".swatch").forEach(function (el) {
      el.classList.toggle("is-active", el.dataset.theme === theme);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".swatch").forEach(function (el) {
      el.addEventListener("click", function () {
        apply(el.dataset.theme);
      });
    });
  });
})();
