/* Lightweight, dependency-free interactions so you can click around
   and see how the palette behaves in real states (selected, checked,
   pressed, chosen) — not just the static screen. Every :active press
   effect is handled in CSS; this file handles the states that need
   to persist after the click. */
(function () {
  function on(selector, event, handler) {
    document.querySelectorAll(selector).forEach(el => el.addEventListener(event, handler));
  }

  document.addEventListener("DOMContentLoaded", function () {

    // ---- Toggle buttons: Bookmark / In Progress / Mark Done ----
    on(".btn--toggle", "click", function () {
      this.classList.toggle("is-on");
    });

    // ---- Plan page: checkbox tasks ----
    on(".task__check", "click", function () {
      this.classList.toggle("is-checked");
      const task = this.closest(".task");
      if (task) task.classList.toggle("is-done", this.classList.contains("is-checked"));
    });

    // ---- Quiz / reading options: click to select (single choice
    // within its own question card) ----
    on(".q-opt", "click", function () {
      const scope = this.closest(".q-card") || this.parentElement;
      scope.querySelectorAll(".q-opt").forEach(o => o.classList.remove("is-selected"));
      this.classList.add("is-selected");
      updateAnsweredCount();
    });

    // ---- Quick-check options on the chapter page ----
    on(".qc-opt", "click", function () {
      const scope = this.closest(".quick-check") || this.parentElement;
      scope.querySelectorAll(".qc-opt").forEach(o => o.classList.remove("is-selected"));
      this.classList.add("is-selected");
    });

    // ---- Chapter tabs: only the placeholder ones (href="#") get a
    // client-side toggle; real links (Chapter Quiz) navigate as normal ----
    on(".chapter-tabs a", "click", function (e) {
      if (this.getAttribute("href") !== "#") return;
      e.preventDefault();
      this.closest(".chapter-tabs").querySelectorAll("a").forEach(a => a.classList.remove("is-active"));
      this.classList.add("is-active");
    });

    // ---- Pricing cards: click "Get X" to mark a plan as chosen ----
    on(".price-card .btn", "click", function (e) {
      e.preventDefault();
      if (!this.dataset.label) this.dataset.label = this.textContent.trim();
      document.querySelectorAll(".price-card .btn").forEach(b => {
        b.classList.remove("is-chosen");
        if (b.dataset.label) b.textContent = b.dataset.label;
      });
      this.classList.add("is-chosen");
      this.textContent = "Selected ✓";
    });

    // ---- Live "N/M answered" counters on quiz-style pages ----
    function updateAnsweredCount() {
      document.querySelectorAll(".q-card").forEach(card => {
        // no-op per-card; counts are aggregated below
      });
      const total = document.querySelectorAll(".q-card").length;
      if (!total) return;
      const answered = document.querySelectorAll(".q-card .q-opt.is-selected").length;
      document.querySelectorAll(".quiz-progress-line").forEach(line => {
        line.textContent = line.textContent.replace(/\d+\/\d+ answered/, `${answered}/${total} answered`);
      });
      document.querySelectorAll(".quiz-submit-bar span").forEach(span => {
        if (/answered$/.test(span.textContent)) span.textContent = `${answered}/${total} answered`;
      });
      const submitBtn = document.querySelector(".quiz-submit-bar .btn");
      if (submitBtn) submitBtn.disabled = answered < total;
      const answeredBar = document.querySelector(".answered-bar");
      if (answeredBar) answeredBar.textContent = `${answered} / ${total} besvaret`;
    }
  });
})();
