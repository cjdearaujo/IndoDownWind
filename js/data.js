// One place that loads every data file. Throws a clear error so callers can show a message.
const FILES = ['pm25', 'climate_zones', 'glossary', 'quiz'];

export async function loadAll() {
  const entries = await Promise.all(FILES.map(async (name) => {
    const res = await fetch(`data/${name}.json`);
    if (!res.ok) throw new Error(`Could not load data/${name}.json (${res.status})`);
    return [name, await res.json()];
  }));
  return Object.fromEntries(entries);
}
