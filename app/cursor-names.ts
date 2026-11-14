// Edit this list to change the names shown on animated cursors.
// Each colour gets one random name, shared across the page until reload.
export const cursorNames: readonly string[] = [
  "Alex",
  "Sam",
  "Jamie",
  "Riley",
  "Taylor",
  "Morgan",
  "Casey",
  "Jordan",
  "Avery",
  "Quinn",
  "Robin",
  "Charlie",
];

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
