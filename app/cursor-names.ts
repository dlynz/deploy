// Edit this list to change the names shown on animated cursors.
// Each colour gets one random name, shared across the page until reload.
export const cursorNames: readonly string[] = [
  "dylan",
  "erica",
  "long",
  "brandon",
  "ming",
  "andrew",
  "ethan",
  "nic",
  "veer",
  "michael",
  "celine",
  "leo",
  "kevin",
];

// Shared palette for the hero and scroll animations. Edit colours here.
export const cursorColors = {
  violet: "var(--violet)",
  cyan: "var(--cyan)",
  mint: "var(--mint)",
  rose: "var(--rose)",
  amber: "var(--amber)",
  coral: "#ffab8a",
  blue: "#8eafff",
  lime: "#d4ed87",
  orchid: "#e6a0ee",
};

// Use every name once before refilling the shuffled pool.
function createCursorNamePicker() {
  let pool: string[] = [];
  return () => {
    if (!pool.length) {
      pool = [...new Set(cursorNames.map((name) => name.trim()).filter(Boolean))];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    return pool.pop() ?? "Guest";
  };
}

const nextName = createCursorNamePicker();
const namesByColor = new Map<string, string>();

export function getCursorName(color: string): string {
  const existing = namesByColor.get(color);
  if (existing !== undefined) return existing;
  const name = nextName();
  namesByColor.set(color, name);
  return name;
}

// Cache shuffled batches so rerenders keep colours stable during this visit.
const colorOrder: string[] = [];
export function getCursorColor(index: number): string {
  while (colorOrder.length <= index) {
    const batch = Object.values(cursorColors);
    for (let i = batch.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [batch[i], batch[j]] = [batch[j], batch[i]];
    }
    if (batch[0] === colorOrder.at(-1)) [batch[0], batch[1]] = [batch[1], batch[0]];
    colorOrder.push(...batch);
  }
  return colorOrder[index];
}

// Each collaborator keeps a slightly different pace for the whole visit.
// 0.15 means up to 15% faster or slower; set to 0 for identical speeds.
export const cursorSpeedVariation = 0.15;
const speedsByColor = new Map<string, number>();
export function getCursorSpeed(color: string): number {
  const existing = speedsByColor.get(color);
  if (existing !== undefined) return existing;
  const speed = 1 + (Math.random() * 2 - 1) * cursorSpeedVariation;
  speedsByColor.set(color, speed);
  return speed;
}
