export const generateNumberFromTo = (from: number) => (to: number): number => {
  if (to <= from) {
    throw new TypeError('`to` number must greater than `from` number.');
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
}
export const generateNumberFrom150 = generateNumberFromTo(150);
