/* Mock Writing page: countdown timer, section stepper, live word
   counts on both tasks, an A/B task toggle, and a simulated
   "Advanced Writing Feedback" panel — a sample of the kind of
   5-dimension breakdown the real feature would give, computed here
   from simple heuristics on what you actually wrote (word count,
   length, structure cues) rather than real language-model grading. */
(function () {
  function wordCount(text) {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }

  document.addEventListener("DOMContentLoaded", function () {

    // ---- countdown timer (2h30m) ----
    const timerEl = document.getElementById("examTimer");
    if (timerEl) {
      let seconds = 2 * 3600 + 30 * 60;
      setInterval(() => {
        if (seconds <= 0) return;
        seconds--;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        timerEl.textContent = `⏱ ${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
      }, 1000);
    }

    // ---- section stepper (scrollspy, same pattern as mock-reading.js) ----
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

    // ---- word counters ----
    const w1 = document.getElementById("writing1");
    const c1 = document.getElementById("count1");
    if (w1) w1.addEventListener("input", () => { c1.textContent = `${wordCount(w1.value)} ord`; });

    const w2 = document.getElementById("writing2");
    const c2 = document.getElementById("count2");
    if (w2) w2.addEventListener("input", () => {
      const n = wordCount(w2.value);
      c2.textContent = `${n} / 200 ord`;
      c2.classList.toggle("is-ok", n >= 200);
    });

    // ---- Task A / B toggle ----
    const toggle = document.getElementById("taskToggle");
    if (toggle) {
      toggle.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
          toggle.querySelectorAll("button").forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          document.getElementById("taskA").style.display = btn.dataset.task === "A" ? "" : "none";
          document.getElementById("taskB").style.display = btn.dataset.task === "B" ? "" : "none";
        });
      });
    }

    // ---- simulated "Advanced Writing Feedback" ----
    const feedbackBtn = document.getElementById("getFeedback");
    if (feedbackBtn) {
      feedbackBtn.addEventListener("click", () => {
        const text = w2.value.trim();
        const n = wordCount(text);
        const panel = document.getElementById("feedbackPanel");

        if (n < 40) {
          panel.style.display = "block";
          panel.innerHTML = `
            <div class="feedback-panel__head">
              <img src="assets/mascot-didyouknow.png" alt="">
              <div>
                <div class="feedback-panel__verdict">Write a bit more first</div>
                <p style="color:var(--ink-soft); margin:0">Get Feedback works best once you've got a real attempt down — aim for the 200-word minimum before checking.</p>
              </div>
            </div>`;
          panel.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }

        // Heuristic-driven mock scoring — deterministic on the text
        // itself (via a simple hash) so the same answer always gets
        // the same demo score, rather than random noise on reload.
        let hash = 0;
        for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
        const jitter = (seed, spread) => (hash % (seed + 7)) % spread;

        const lengthScore = Math.min(100, Math.round((n / 200) * 70 + 20));
        const sentenceCount = (text.match(/[.!?]+/g) || []).length || 1;
        const avgSentenceLen = n / sentenceCount;
        const structureScore = Math.max(45, Math.min(95, Math.round(100 - Math.abs(avgSentenceLen - 14) * 3)));

        const dims = [
          { label: "Opgaveløsning (task achievement)", value: Math.min(96, lengthScore + jitter(1, 10)) },
          { label: "Sammenhæng og struktur", value: structureScore },
          { label: "Ordforråd", value: 60 + jitter(3, 30) },
          { label: "Grammatik", value: 55 + jitter(5, 32) },
          { label: "Register og tone", value: 65 + jitter(7, 28) },
        ];
        const overall = Math.round(dims.reduce((a, d) => a + d.value, 0) / dims.length);
        const passed = overall >= 60 && n >= 200;

        panel.style.display = "block";
        panel.innerHTML = `
          <div class="feedback-panel__head">
            <img src="${passed ? "assets/mascot-welldone.png" : "assets/mascot-tryagain.png"}" alt="">
            <div>
              <div class="feedback-panel__verdict ${passed ? "is-pass" : "is-fail"}">${passed ? "Pass — solid attempt" : "Not quite there yet"}</div>
              <p style="color:var(--ink-soft); margin:0">${n} ord · overall score ${overall}/100</p>
            </div>
          </div>
          <div class="feedback-dims">
            ${dims.map(d => `
              <div>
                <div class="feedback-dim__label"><span>${d.label}</span><span>${d.value}/100</span></div>
                <div class="feedback-dim__bar"><span style="width:${d.value}%"></span></div>
              </div>`).join("")}
          </div>
          <div class="feedback-note">
            ${n < 200
              ? `<strong>Under minimum:</strong> you're at ${n} words — the real exam requires at least 200. Add more detail to your last point, which should carry about half your answer.`
              : `<strong>Sample note:</strong> this is a demo of the structured feedback Hejdansk's Advanced plan would give — a real submission would include specific line-by-line grammar and vocabulary corrections here.`}
          </div>
        `;
        panel.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  });
})();
