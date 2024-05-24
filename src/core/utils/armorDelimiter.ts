export const calcArmorDelimiter = (a: number, b: number) => {
  if (a >= 1 && b >= 1) return a + b - 1;
  return a * b;
};
