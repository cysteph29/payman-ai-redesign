// Case study deck: one .slide at a time, arrow keys and buttons, slide number kept in the URL hash
(() => {
  const deck = document.getElementById("deck");
  if (!deck) return;
  const slides = [...deck.querySelectorAll(".slide")];
  const prev = deck.querySelector('[data-dir="-1"]');
  const next = deck.querySelector('[data-dir="1"]');
  const count = document.getElementById("deck-count");
  const pad = (n) => String(n).padStart(2, "0");
  let cur = -1;

  const fromHash = () => { const n = parseInt(location.hash.slice(1), 10); return Number.isInteger(n) ? n - 1 : 0; };
  const typing = (el) => el instanceof Element && (el.isContentEditable || !!el.closest("input, textarea, select"));

  const go = (i) => {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === cur) return;
    const focused = document.activeElement;
    cur = i;
    slides.forEach((s, k) => { const on = k === i; s.classList.toggle("is-active", on); s.inert = !on; s.setAttribute("aria-hidden", String(!on)); });
    slides[i].scrollTop = 0;
    lives.forEach((l) => { if (slides[i].contains(l.box)) l.restart(); });
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
    if ((focused === prev || focused === next) && focused.disabled) (focused === prev ? next : prev).focus();
    count.textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
    history.replaceState(null, "", i ? `#${i + 1}` : location.pathname + location.search);
  };

  [prev, next].forEach((b) => b.addEventListener("click", () => go(cur + Number(b.dataset.dir))));
  document.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || typing(e.target)) return;
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    go(cur + dir);
  });
  addEventListener("hashchange", () => go(fromHash()));

  // Before/after: the range drives --x; released after a drag so arrow keys return to the deck
  deck.querySelectorAll(".ba").forEach((ba) => {
    const r = ba.querySelector("input");
    const set = () => ba.style.setProperty("--x", `${r.value}%`);
    r.addEventListener("input", set);
    r.addEventListener("pointerup", () => r.blur());
    set();
  });

  // Live sections: the site itself in a frame at its 1296px design width, scaled to the board and cropped to one section
  const lives = [...deck.querySelectorAll(".live")].map((box) => {
    const frame = box.querySelector("iframe");
    let sec = null;
    const fit = () => {
      if (!sec) return;
      const s = box.clientWidth / frame.offsetWidth, h = sec.offsetHeight;
      frame.style.height = `${h}px`;
      frame.style.transform = `scale(${s})`;
      box.style.height = `${h * s}px`;
      frame.contentWindow.scrollTo(0, sec.getBoundingClientRect().top + frame.contentWindow.scrollY);
    };
    const restart = () => { fit(); sec?.querySelector(box.dataset.restart)?.click(); };
    frame.addEventListener("load", () => {
      const doc = frame.contentDocument;
      doc.head.insertAdjacentHTML("beforeend", "<style>html{scroll-behavior:auto;overflow:hidden}.nav{display:none}</style>");
      sec = doc.querySelector(box.dataset.section);
      fit();
      restart();
      doc.fonts.ready.then(fit);
    });
    new ResizeObserver(fit).observe(box);
    return { box, restart };
  });

  go(fromHash());
  deck.dataset.ready = "";
  void deck.offsetWidth;
  deck.classList.add("is-animated");
})();
