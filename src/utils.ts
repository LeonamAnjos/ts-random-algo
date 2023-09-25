export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const isPositiveNumber = (n: number): boolean => Math.sign(n) > 0;

export function* range(start: number, end: number) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}
