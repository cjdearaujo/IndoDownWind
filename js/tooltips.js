// Glossary tooltips: one shared role="tooltip" element, shown on hover, focus and tap; Escape or tapping elsewhere closes it.
const GAP = 8, MARGIN = 8;

export function initTooltips({ glossary }) {
  const lookup = new Map(glossary.map((g) => [g.term.toLowerCase(), g.plain]));
  const tip = document.createElement('div');
  tip.id = 'glossary-tip';
  tip.setAttribute('role', 'tooltip');
  tip.className = 'tooltip';
  tip.hidden = true;
  document.body.append(tip);

  let active = null, pinned = false;

  function place(term) {
    const r = term.getBoundingClientRect();
    const t = tip.getBoundingClientRect();
    // Below the term if it fits, otherwise above, so the tooltip never covers the word itself.
    const below = r.bottom + GAP + t.height <= window.innerHeight - MARGIN;
    const top = below ? r.bottom + GAP : r.top - GAP - t.height;
    const left = Math.min(Math.max(MARGIN, r.left + r.width / 2 - t.width / 2), window.innerWidth - t.width - MARGIN);
    tip.style.top = `${Math.max(MARGIN, top)}px`;
    tip.style.left = `${left}px`;
  }

  function show(term, pin = false) {
    active = term;
    pinned = pin;
    tip.textContent = term.dataset.plain;
    tip.hidden = false;
    place(term);
    term.setAttribute('aria-expanded', 'true');
  }

  function hide() {
    if (active) active.setAttribute('aria-expanded', 'false');
    tip.hidden = true;
    active = null;
    pinned = false;
  }

  document.querySelectorAll('section').forEach((section) => {
    const seen = new Set();
    section.querySelectorAll('.term[data-term]').forEach((term) => {
      const key = term.dataset.term.toLowerCase();
      const plain = lookup.get(key);
      if (!plain) { console.warn(`No glossary entry for "${term.dataset.term}"`); return; }
      if (seen.has(key)) { term.classList.add('term-repeat'); return; }
      seen.add(key);
      term.dataset.plain = plain;
      term.tabIndex = 0;
      term.setAttribute('role', 'button');
      term.setAttribute('aria-describedby', tip.id);
      term.setAttribute('aria-expanded', 'false');
      term.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse' && !pinned) show(term); });
      term.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !pinned && active === term) hide(); });
      // Set the text before the screen reader reads the description.
      term.addEventListener('focus', () => show(term));
      term.addEventListener('blur', () => { if (active === term) hide(); });
      term.addEventListener('click', (e) => {
        e.stopPropagation();
        if (active === term && pinned) hide(); else show(term, true);
      });
      term.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (active === term && !tip.hidden) hide(); else show(term, true); }
      });
    });
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && active) hide(); });
  document.addEventListener('click', (e) => { if (active && !tip.contains(e.target)) hide(); });
  window.addEventListener('scroll', () => { if (active) place(active); }, { passive: true });
  window.addEventListener('resize', () => { if (active) place(active); });
}
