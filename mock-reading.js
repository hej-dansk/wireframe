/* Mock Reading page: countdown timer, section stepper (scrollspy),
   and grading logic for Delprøve B (sentence-gap) and C (cloze) —
   Delprøve A's multiple-choice is already handled by mascot-quiz.js
   since it uses the same .q-opt[data-correct] pattern. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {

    // ---- countdown timer ----
    const timerEl = document.getElementById("examTimer");
    if (timerEl) {
      let seconds = 65 * 60;
      setInterval(() => {
        if (seconds <= 0) return;
        seconds--;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        timerEl.textContent = `⏱ ${m}:${s.toString().padStart(2, "0")}`;
      }, 1000);
    }

    // ---- section stepper: click to jump, scrollspy to highlight ----
    const steps = document.querySelectorAll(".exam-stepper__step");
    steps.forEach(step => {
      step.addEventListener("click", () => {
        const target = document.getElementById(step.dataset.target);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    const sections = Array.from(steps).map(s => document.getElementById(s.dataset.target)).filter(Boolean);
    if (sections.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const idx = sections.indexOf(entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            steps.forEach((s, i) => {
              s.classList.toggle("is-active", i === idx);
              s.classList.toggle("is-done", i < idx);
            });
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      sections.forEach(sec => io.observe(sec));
    }

    // ---- Delprøve B: sentence-gap reconstruction ----
    const checkB = document.getElementById("checkB");
    if (checkB) {
      checkB.addEventListener("click", () => {
        const rows = document.querySelectorAll("#delproveBAnswers .gapfill-answer-row");
        let correct = 0;
        rows.forEach(row => {
          const select = row.querySelector("select");
          const isCorrect = select.value === row.dataset.correct;
          row.classList.toggle("is-correct", isCorrect && select.value !== "");
          row.classList.toggle("is-wrong", !isCorrect && select.value !== "");
          if (isCorrect && select.value !== "") correct++;
        });
        const banner = document.getElementById("scoreB");
        const total = rows.length;
        banner.querySelector("img").src = correct >= total - 1 ? "assets/mascot-welldone.png" : "assets/mascot-tryagain.png";
        banner.querySelector("h3").textContent = correct === total ? "Well done — all correct!" : `${correct} of ${total} correct`;
        banner.querySelector("p").textContent = correct === total
          ? "You reconstructed the passage perfectly."
          : "Review the sentences that don't fit, then try the ones you missed again.";
        banner.classList.add("is-visible");
      });
    }

    // ---- Delprøve C: vocabulary cloze ----
    // pre-mark the example (blank 0) as correct and lock it
    const example = document.querySelector('.cloze-select[data-blank="0"]');
    if (example) {
      example.value = example.dataset.correct;
      example.disabled = true;
      example.classList.add("is-correct");
    }
    const checkC = document.getElementById("checkC");
    if (checkC) {
      checkC.addEventListener("click", () => {
        const selects = document.querySelectorAll('.cloze-select:not([data-blank="0"])');
        let correct = 0;
        selects.forEach(sel => {
          const isCorrect = sel.value === sel.dataset.correct;
          sel.classList.toggle("is-correct", isCorrect && sel.value !== "");
          sel.classList.toggle("is-wrong", !isCorrect && sel.value !== "");
          if (isCorrect && sel.value !== "") correct++;
        });
        const banner = document.getElementById("scoreC");
        const total = selects.length;
        banner.querySelector("img").src = correct >= total - 1 ? "assets/mascot-welldone.png" : "assets/mascot-tryagain.png";
        banner.querySelector("h3").textContent = correct === total ? "Well done — all correct!" : `${correct} of ${total} correct`;
        banner.querySelector("p").textContent = correct === total
          ? "Great feel for how these connector words work in context."
          : "Look again at the highlighted words, then give the wrong ones another try.";
        banner.classList.add("is-visible");
      });
    }
  });
})();
