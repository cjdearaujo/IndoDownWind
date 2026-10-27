// City-wise PM2.5 change chart with a winter toggle. Stated values are solid, approximate values striped.
// The text summary in #city-chart-summary is generated from the same data and is the accessible alternative.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const GROUPS = [{ region: 'north', label: 'North India' }, { region: 'peninsula', label: 'Peninsula' }];

const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const formatPct = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n)}%`;

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

// Text for one record, honest about qualifiers and approximation.
function describe(rec) {
  if (rec.pct === null || rec.source === 'missing') return 'no data';
  if (rec.source === 'approximate' && rec.pct === 0) return 'about 0 (too small to read)';
  const value = `${rec.qualifier ? `${rec.qualifier} ` : ''}${formatPct(rec.pct)}`;
  return rec.source === 'approximate' ? `approx. ${value}` : value;
}

// Rows: a divider label per group, then that group's cities in data order. Identical for both winters.
function buildRows(records) {
  const rows = [];
  for (const g of GROUPS) {
    rows.push({ label: g.label, divider: true });
    for (const rec of records) {
      if (rec.region === g.region && !rows.some((r) => r.city === rec.city)) rows.push({ label: rec.city, city: rec.city });
    }
  }
  return rows;
}

function stripePattern(ctx, colour, stripe) {
  const tile = document.createElement('canvas');
  tile.width = tile.height = 8;
  const t = tile.getContext('2d');
  t.fillStyle = colour; t.fillRect(0, 0, 8, 8);
  t.strokeStyle = stripe; t.lineWidth = 2;
  t.beginPath(); t.moveTo(-2, 2); t.lineTo(2, -2); t.moveTo(0, 8); t.lineTo(8, 0); t.moveTo(6, 10); t.lineTo(10, 6); t.stroke();
  return ctx.createPattern(tile, 'repeat');
}

function summarise(winter, phase, records) {
  const withValue = records.filter((r) => r.pct !== null && r.source !== 'missing');
  const rises = withValue.filter((r) => r.pct > 0).sort((a, b) => b.pct - a.pct).slice(0, 3);
  const falls = withValue.filter((r) => r.pct < 0).sort((a, b) => a.pct - b.pct).slice(0, 3);
  const list = (rs) => rs.map((r) => `${r.city} (${describe(r)})`).join(', ');
  const count = (region, test) => withValue.filter((r) => r.region === region && test(r.pct)).length;
  const total = (region) => records.filter((r) => r.region === region).length;
  const regionLine = GROUPS.map((g) => `${g.label}: ${count(g.region, (p) => p < 0)} of ${total(g.region)} cities fell, ${count(g.region, (p) => p > 0)} rose, ${count(g.region, (p) => p === 0)} about 0`).join('; ');
  return {
    long: `Winter ${winter} (${phase}). Biggest rises: ${list(rises) || 'none'}. Biggest falls: ${list(falls) || 'none'}. ${regionLine}. Values marked approx. are read from the article's chart.`,
    short: `Bar chart of PM2.5 change by city, winter ${winter} (${phase}): ${rises[0] ? `${rises[0].city} rose most (${describe(rises[0])})` : 'no rises'}, ${falls[0] ? `${falls[0].city} fell most (${describe(falls[0])})` : 'no falls'}.`,
  };
}

export function initCityChart({ data }) {
  const { meta, records } = data.pm25;
  const canvas = document.getElementById('city-chart');
  const summaryEl = document.getElementById('city-chart-summary');
  const panel = document.getElementById('city-panel');
  const tabs = [...document.querySelectorAll('#cities [role="tab"]')];
  const rows = buildRows(records);
  const find = (city, winter) => records.find((r) => r.city === city && r.winter === winter);

  // Chart.js sizes the canvas from its parent, so give it a box of its own (the figure also holds the caption).
  const box = document.createElement('div');
  box.className = 'chart-box';
  canvas.before(box);
  box.append(canvas);

  const legend = document.createElement('div');
  legend.className = 'chart-legend';
  legend.innerHTML = `<span><i class="swatch swatch-solid" aria-hidden="true"></i>Solid: stated in the article text</span>
    <span><i class="swatch swatch-striped" aria-hidden="true"></i>Striped: approximate, read from the article's chart</span>`;
  box.after(legend);

  let chart = null;
  if (typeof Chart !== 'undefined') chart = createChart(canvas, rows, records);

  function select(winter, focus = false) {
    tabs.forEach((tab) => {
      const on = tab.dataset.winter === winter;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on) { panel.setAttribute('aria-labelledby', tab.id); if (focus) tab.focus(); }
    });
    const winterRecords = records.filter((r) => r.winter === winter);
    const summary = summarise(winter, meta.phases[winter], winterRecords);
    summaryEl.textContent = summary.long;
    canvas.setAttribute('aria-label', summary.short);
    if (chart) chart.showWinter(winter);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab.dataset.winter));
    tab.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const next = tabs[(keys[e.key] + tabs.length) % tabs.length];
      select(next.dataset.winter, true);
    });
  });

  select(tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.winter || tabs[0].dataset.winter);

  function createChart(el, rowList, allRecords) {
    const colours = { clean: css('--clean'), mid: css('--haze-mid'), heavy: css('--haze-heavy'), ink: css('--ink'), dim: css('--ink-dim'), line: css('--accent-line'), night: css('--night') };
    const font = css('--font-body');
    const values = allRecords.filter((r) => r.pct !== null).map((r) => r.pct);
    // One fixed axis for both winters so the flip is comparable; extra room on the right for value labels.
    const xMin = Math.floor((Math.min(...values) - 10) / 10) * 10;
    const xMax = Math.ceil((Math.max(...values) + 30) / 10) * 10;
    const patterns = new Map();
    let current = null;

    const recordAt = (i) => (rowList[i].divider || !current ? null : find(rowList[i].city, current));

    function colourFor(pct) {
      if (pct <= 0) return colours.clean;
      const t = Math.min(pct / (xMax - 30), 1);
      const [a, b] = [hexToRgb(colours.mid), hexToRgb(colours.heavy)];
      return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(',')})`;
    }

    function fillFor(rec, ctx) {
      if (!rec || rec.pct === null) return 'transparent';
      const colour = colourFor(rec.pct);
      if (rec.source !== 'approximate') return colour;
      if (!patterns.has(colour)) patterns.set(colour, stripePattern(ctx, colour, colours.night));
      return patterns.get(colour);
    }

    // Draws what bars cannot: stated value labels, hairlines for "about 0", and "no data".
    const labelsPlugin = {
      id: 'cityLabels',
      afterDatasetsDraw(c) {
        const { ctx } = c;
        const x0 = c.scales.x.getPixelForValue(0);
        const small = window.innerWidth < 700;
        ctx.save();
        ctx.font = `${small ? 11 : 13}px ${font}`;
        ctx.textBaseline = 'middle';
        c.getDatasetMeta(0).data.forEach((bar, i) => {
          const rec = recordAt(i);
          if (!rec) return;
          const text = describe(rec);
          if (rec.pct === null || rec.source === 'missing') {
            ctx.fillStyle = colours.dim; ctx.textAlign = 'left'; ctx.fillText(text, x0 + 6, bar.y);
          } else if (rec.pct === 0) {
            ctx.strokeStyle = colours.ink; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x0, bar.y - bar.height / 2); ctx.lineTo(x0, bar.y + bar.height / 2); ctx.stroke();
            ctx.fillStyle = colours.dim; ctx.textAlign = 'left'; ctx.fillText(text, x0 + 6, bar.y);
          } else if (rec.source === 'stated') {
            const right = rec.pct > 0;
            ctx.fillStyle = colours.ink; ctx.textAlign = right ? 'left' : 'right';
            ctx.fillText(text, bar.x + (right ? 6 : -6), bar.y);
          }
        });
        ctx.restore();
      },
    };

    const c = new Chart(el, {
      type: 'bar',
      data: { labels: rowList.map((r) => r.label), datasets: [{ data: rowList.map(() => null), backgroundColor: [], borderWidth: 0, barPercentage: 0.8, categoryPercentage: 0.9 }] },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        animation: reduceMotion ? false : { duration: 400 },
        plugins: {
          legend: { display: false },
          tooltip: {
            filter: (item) => !rowList[item.dataIndex].divider,
            callbacks: { label: (item) => { const rec = recordAt(item.dataIndex); return rec ? describe(rec) : ''; } },
          },
        },
        scales: {
          x: {
            min: xMin, max: xMax,
            ticks: { color: colours.dim, callback: (v) => formatPct(v), font: () => ({ family: font, size: window.innerWidth < 700 ? 10 : 12 }) },
            grid: { color: (g) => (g.tick && g.tick.value === 0 ? colours.ink : colours.line), lineWidth: (g) => (g.tick && g.tick.value === 0 ? 2 : 1) },
            border: { display: false },
          },
          y: {
            ticks: {
              autoSkip: false,
              color: (t) => (rowList[t.index].divider ? colours.ink : colours.dim),
              font: (t) => ({ family: font, size: window.innerWidth < 700 ? 11 : 13, weight: rowList[t.index]?.divider ? '600' : '400' }),
            },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
      plugins: [labelsPlugin],
    });

    c.showWinter = (winter) => {
      current = winter;
      const ds = c.data.datasets[0];
      const recs = rowList.map((_, i) => recordAt(i));
      ds.data = recs.map((rec) => (rec && rec.source !== 'missing' ? rec.pct : null));
      ds.backgroundColor = recs.map((rec) => fillFor(rec, c.ctx));
      c.update();
    };
    return c;
  }
}
