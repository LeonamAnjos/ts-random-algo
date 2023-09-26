import { delay, isPositiveNumber, range } from "../utils";

type RetryWaitFunc = (i: number) => number;
type RetryPredicateFunc = (i: number, e: unknown) => boolean;

export interface RetryOptions {
  attempts?: number;
  wait?: number | RetryWaitFunc;
  predicate?: RetryPredicateFunc;
}

const defaultOptions: Required<RetryOptions> = {
  attempts: 3,
  wait: 0,
  predicate: () => true,
};

const getCalcWaitFunc = (wait: number | RetryWaitFunc): RetryWaitFunc => {
  if (typeof wait === "number") {
    return () => wait as number;
  }

  return wait as RetryWaitFunc;
};

export const retry = <TResult>(
  fn: () => TResult,
  options: RetryOptions = defaultOptions
): Promise<TResult> => {
  const {
    attempts = defaultOptions.attempts,
    wait = defaultOptions.wait,
    predicate = defaultOptions.predicate,
  } = options;

  if (!isPositiveNumber(attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  const calcWait: RetryWaitFunc = getCalcWaitFunc(wait);

  return new Promise<TResult>(async (resolve, reject) => {
    for (const i of range(1, attempts)) {
      try {
        resolve(fn());
        break;
      } catch (error) {
        if (i === attempts || !predicate(i, error)) {
          reject(error);
          break;
        }

        const w = calcWait(i);
        if (isPositiveNumber(w)) {
          await delay(w);
        }
      }
    }
  });
};
