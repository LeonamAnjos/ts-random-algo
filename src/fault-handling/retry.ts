import { delay, isPositiveNumber, range } from "../utils";

type RetryWaitFunc = (i: number) => number;
type RetryPredicateFunc = (i: number, e: unknown) => boolean;

export interface RetryOptions {
  attempts?: number;
  waitInMs?: number;
  waitFn?: RetryWaitFunc;
  predicate?: RetryPredicateFunc;
}

const defaultOptions: Required<RetryOptions> = {
  attempts: 3,
  waitInMs: 0,
  waitFn: () => 0,
  predicate: () => true,
};

export const retry = <TResult>(
  fn: () => TResult,
  options: RetryOptions = defaultOptions
): Promise<TResult> => {
  const {
    attempts = defaultOptions.attempts,
    waitInMs = defaultOptions.waitInMs,
    waitFn = defaultOptions.waitFn,
    predicate = defaultOptions.predicate,
  } = options;

  if (!isPositiveNumber(attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  const calcWaitTimeInMs: RetryWaitFunc = isPositiveNumber(waitInMs)
    ? () => waitInMs
    : waitFn;

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

        const waitTimeInMs = calcWaitTimeInMs(i);
        if (isPositiveNumber(waitTimeInMs)) {
          await delay(waitTimeInMs);
        }
      }
    }
  });
};
