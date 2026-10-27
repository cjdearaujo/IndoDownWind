// Climate-zone shift: hot semi-arid share of each region, then and now, plus places that moved and a farming note.
// Bars grow via a CSS transition when they enter view; base.css turns transitions off under reduced motion.

function bar(period, pct, label) {
  return `<div class="zone-row">
    <span class="zone-period">${period}</span>
    <div class="zone-track" role="img" aria-label="${period}: ${label} of the region in the hot semi-arid zone">
      <div class="zone-fill" style="--w: ${pct}%"></div>
    </div>
    <span class="zone-value">${label}</span>
  </div>`;
}

export function initZones({ data }) {
  const root = document.querySelector('#zones .zone-bars');
  if (!root) return;
  const { northwest: nw, peninsula: pen } = data.climate_zones;
  const [nwThen, nwNow] = ['1951-60', '1991-2020'];

  root.innerHTML = `
    <div class="zone-blocks">
      <article class="zone-block">
        <h3>Northwest India</h3>
        <p class="zone-sub">Share of the region in the hot semi-arid zone</p>
        ${bar(nwThen, nw.hot_semi_arid[nwThen], `about ${nw.hot_semi_arid[nwThen]}%`)}
        ${bar(nwNow, nw.hot_semi_arid[nwNow], `about ${nw.hot_semi_arid[nwNow]}% (a third)`)}
        <p class="zone-note">An area equal to roughly ${nw.area_moved_to_drier_zone_pct}% of the region moved into the drier zone.</p>
        <p class="zone-note">The temperate zone ${nw.temperate.qualifier}.</p>
      </article>
      <article class="zone-block">
        <h3>Peninsular India</h3>
        <p class="zone-sub">Share of the region in the hot semi-arid zone</p>
        ${bar('Before', pen.hot_semi_arid.before, `about ${pen.hot_semi_arid.before}%`)}
        ${bar('After', pen.hot_semi_arid.after, `${pen.hot_semi_arid.after}%`)}
        <p class="zone-note">Most of that land moved into the tropical savannah zone, which ${pen.tropical_savannah_qualifier}.</p>
      </article>
    </div>
    <h3 class="zone-places-title">Places that moved</h3>
    <ul class="zone-places">
      ${data.climate_zones.places_that_moved.map((p) => `<li><strong>${p.place}</strong>: ${p.change}</li>`).join('')}
    </ul>
    <aside class="zone-callout" aria-labelledby="farmers-title">
      <h3 id="farmers-title">Why farmers care</h3>
      <p>${data.climate_zones.why_farmers_care}</p>
      <p class="zone-not-reported">${data.climate_zones.not_reported}</p>
    </aside>`;

  const fills = root.querySelectorAll('.zone-fill');
  if (!('IntersectionObserver' in window)) { fills.forEach((f) => f.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  fills.forEach((f) => io.observe(f));
}
