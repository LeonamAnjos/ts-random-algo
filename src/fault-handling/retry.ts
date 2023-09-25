import { delay, range } from "../utils";

export interface RetryOptions {
  attempts?: number;
  wait?: number | undefined;
}

const defaultOptions: Required<RetryOptions> = {
  attempts: 3,
  wait: 0,
};

const isPositiveNumber = (n: number): boolean => Math.sign(n) > 0;

export const retry = <TResult>(
  fn: () => TResult,
  options: RetryOptions = defaultOptions
): Promise<TResult> => {
  const { attempts = defaultOptions.attempts, wait = defaultOptions.wait } =
    options;

  if (!isPositiveNumber(attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  return new Promise<TResult>(async (resolve, reject) => {
    for (const i of range(1, attempts)) {
      try {
        resolve(fn());
        break;
      } catch (error) {
        if (i === attempts) {
          reject(error);
          break;
        }

        if (isPositiveNumber(wait)) {
          await delay(wait);
        }
      }
    }
  });
};
