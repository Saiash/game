export function calculateEncumbrance(weight: number, str: number): number {
  let level = Math.floor(weight / calculateBasicWeight(str));
  if (level >= 4 && level <= 6) {
    level = 3;
  } else if (level > 6) {
    level = 4;
  }
  return level;
}

export function calculateBasicWeight(str: number): number {
  return Math.pow(str, 2) / 5;
}
