import { delay, isPositiveNumber, range } from "../utils";

type RetryWaitFunc = (i: number) => number;

export interface RetryOptions {
  attempts?: number;
  wait?: number | RetryWaitFunc;
}

const defaultOptions: Required<RetryOptions> = {
  attempts: 3,
  wait: 0,
};

const getWaitFunc = (wait: number | RetryWaitFunc): RetryWaitFunc => {
  if (typeof wait === "number") {
    return () => wait as number;
  }

  return wait as RetryWaitFunc;
};

export const retry = <TResult>(
  fn: () => TResult,
  options: RetryOptions = defaultOptions
): Promise<TResult> => {
  const { attempts = defaultOptions.attempts, wait = defaultOptions.wait } =
    options;

  if (!isPositiveNumber(attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  const waitFn: RetryWaitFunc = getWaitFunc(wait);

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

        const w = waitFn(i);
        if (isPositiveNumber(w)) {
          await delay(w);
        }
      }
    }
  });
};
