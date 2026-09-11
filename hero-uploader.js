/* Hero cover-photo tester. Ships with one default photo; upload 1 to
   swap it, or 2–3 to see a slow auto-advancing carousel. Uploads are
   downsized on-device (canvas) and saved to localStorage, so the
   choice persists across reloads and other visits to this page. */
(function () {
  const STORAGE_KEY = "hejdansk-hero-images";
  const DEFAULT_IMAGE = "assets/hero-default.jpg";
  const MAX_IMAGES = 3;
  const SLIDE_MS = 4500;
  const MAX_DIMENSION = 1600;

  const hero = document.querySelector(".hero");
  if (!hero) return; // only the landing page has a hero

  const stack = hero.querySelector(".hero__bg-stack");
  const dotsWrap = hero.querySelector(".hero__dots");
  const fileInput = hero.querySelector(".hero__file-input");
  const uploadBtn = hero.querySelector(".hero__upload-btn");
  const resetBtn = hero.querySelector(".hero__reset-btn");

  let images = [];
  let activeIndex = 0;
  let timer = null;

  function loadStoredImages() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(raw) && raw.length) return raw;
    } catch (e) {}
    return [DEFAULT_IMAGE];
  }

  function saveStoredImages(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }
    catch (e) { console.warn("Couldn't save hero images (storage full?)", e); }
  }

  function render() {
    stack.innerHTML = "";
    images.forEach((src, i) => {
      const layer = document.createElement("div");
      layer.className = "hero__bg-layer" + (i === activeIndex ? " is-active" : "");
      layer.style.backgroundImage = `url("${src}")`;
      stack.appendChild(layer);
    });

    dotsWrap.innerHTML = "";
    if (images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero__dot" + (i === activeIndex ? " is-active" : "");
        dot.setAttribute("aria-label", "Show cover photo " + (i + 1));
        dot.addEventListener("click", () => { goTo(i); restartTimer(); });
        dotsWrap.appendChild(dot);
      });
    }
  }

  function goTo(index) {
    activeIndex = (index + images.length) % images.length;
    const layers = stack.querySelectorAll(".hero__bg-layer");
    layers.forEach((l, i) => l.classList.toggle("is-active", i === activeIndex));
    dotsWrap.querySelectorAll(".hero__dot").forEach((d, i) => d.classList.toggle("is-active", i === activeIndex));
  }

  function restartTimer() {
    if (timer) clearInterval(timer);
    if (images.length > 1) timer = setInterval(() => goTo(activeIndex + 1), SLIDE_MS);
  }

  function resizeToDataURL(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = () => { img.src = reader.result; };
      reader.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  uploadBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", async () => {
    const files = Array.from(fileInput.files).slice(0, MAX_IMAGES);
    if (!files.length) return;
    uploadBtn.textContent = "Processing…";
    try {
      const dataUrls = await Promise.all(files.map(resizeToDataURL));
      images = dataUrls;
      activeIndex = 0;
      saveStoredImages(images);
      render();
      restartTimer();
    } catch (e) {
      alert("Couldn't read one of those images — try a different file.");
    }
    uploadBtn.textContent = "🖼 Change cover photo";
    fileInput.value = "";
  });

  resetBtn.addEventListener("click", () => {
    images = [DEFAULT_IMAGE];
    activeIndex = 0;
    localStorage.removeItem(STORAGE_KEY);
    render();
    restartTimer();
  });

  images = loadStoredImages();
  render();
  restartTimer();
})();
