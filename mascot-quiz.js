/* Graded quiz engine. Any .q-opt with a data-correct="true"/"false"
   attribute is treated as a real, checked answer: click it and the
   Hej Dansk swan mascot shows up to tell you how you did, right there
   in the question card. This is what makes the quiz pages genuinely
   testable rather than just decorative click-to-select. */
(function () {
  const MASCOT = {
    correct: { src: "assets/mascot-welldone.png", headline: "Well done!", sub: "That's the correct answer." },
    wrong:   { src: "assets/mascot-incorrect.png", headline: "Incorrect", sub: "Give it another go." },
  };

  function buildPop(card) {
    const pop = document.createElement("div");
    pop.className = "mascot-pop";
    pop.innerHTML = `
      <img alt="">
      <div class="mascot-pop__text">
        <span class="pop-headline"></span>
        <small class="pop-sub"></small>
      </div>
    `;
    card.appendChild(pop);
    return pop;
  }

  function showFeedback(card, correct) {
    let pop = card.querySelector(".mascot-pop");
    if (!pop) pop = buildPop(card);
    const data = correct ? MASCOT.correct : MASCOT.wrong;
    pop.querySelector("img").src = data.src;
    pop.querySelector(".pop-headline").textContent = data.headline;
    let sub = pop.querySelector(".pop-sub");
    sub.innerHTML = data.sub + (correct ? "" : ' — <span class="retry-link">Try again</span>');
    pop.classList.add("is-visible");

    if (!correct) {
      const retry = sub.querySelector(".retry-link");
      retry.addEventListener("click", () => resetCard(card));
    }
  }

  function resetCard(card) {
    card.classList.remove("is-answered-correct", "is-answered-wrong");
    card.querySelectorAll(".q-opt").forEach(o => {
      o.classList.remove("is-selected", "is-correct", "is-wrong", "is-dimmed", "is-locked");
    });
    const pop = card.querySelector(".mascot-pop");
    if (pop) pop.classList.remove("is-visible");
  }

  function lockCard(card, chosenCorrectly) {
    card.querySelectorAll(".q-opt").forEach(o => {
      o.classList.add("is-locked");
      if (o.dataset.correct !== "true") o.classList.add("is-dimmed");
    });
  }

  function updateProgress() {
    const cards = document.querySelectorAll(".q-card");
    const total = cards.length;
    if (!total) return;
    const correctCount = document.querySelectorAll(".q-card.is-answered-correct").length;

    document.querySelectorAll(".quiz-progress-line").forEach(line => {
      line.textContent = line.textContent.replace(/\d+\/\d+ answered/, `${correctCount}/${total} answered`);
    });
    document.querySelectorAll(".quiz-submit-bar span").forEach(span => {
      if (/answered$/.test(span.textContent)) span.textContent = `${correctCount}/${total} answered`;
    });
    const submitBtn = document.querySelector(".quiz-submit-bar .btn");
    if (submitBtn) submitBtn.disabled = correctCount < total;
    const answeredBar = document.querySelector(".answered-bar");
    if (answeredBar) answeredBar.textContent = `${correctCount} / ${total} besvaret`;

    const banner = document.querySelector(".quiz-summary-banner");
    if (banner) {
      if (correctCount === total) {
        banner.querySelector("img").src = "assets/mascot-welldone.png";
        banner.querySelector("h3").textContent = "Well done — all correct!";
        banner.querySelector("p").textContent = `You got ${correctCount} out of ${total}. Nice work.`;
        banner.classList.add("is-visible");
      } else {
        banner.classList.remove("is-visible");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".q-opt[data-correct]").forEach(opt => {
      opt.addEventListener("click", function () {
        if (this.classList.contains("is-locked")) return;
        const card = this.closest(".q-card");
        const correct = this.dataset.correct === "true";

        this.classList.add("is-selected");
        this.classList.add(correct ? "is-correct" : "is-wrong");
        card.classList.add(correct ? "is-answered-correct" : "is-answered-wrong");
        card.classList.remove(correct ? "is-answered-wrong" : "is-answered-correct");

        if (correct) lockCard(card, true);
        showFeedback(card, correct);
        updateProgress();
      });
    });

    // ---- "↺ Reset" clears every question on the page and shows a
    // brief "Try Again!" toast up top ----
    const resetBtn = document.querySelector(".quiz-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        document.querySelectorAll(".q-card").forEach(resetCard);
        const banner = document.querySelector(".quiz-summary-banner");
        if (banner) banner.classList.remove("is-visible");
        updateProgress();
        showResetToast();
      });
    }

    updateProgress();
  });

  function showResetToast() {
    let toast = document.querySelector(".mascot-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "mascot-toast";
      toast.innerHTML = `<img src="assets/mascot-tryagain.png" alt="">`;
      document.body.appendChild(toast);
    }
    toast.classList.remove("is-visible");
    // force reflow so the animation replays on repeated clicks
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }
})();
