import { Task } from "../task-manager/task-manager";
import { delay, isPositiveNumber, range } from "../utils";

type RetryIntervalFunc = (i: number) => number;
type RetryPredicateFunc = (i: number, e: unknown) => boolean;

export interface RetryOptions {
  attempts?: number;
  intervalInMs?: number;
  intervalFn?: RetryIntervalFunc;
  predicate?: RetryPredicateFunc;
}

const defaultOptions: Required<RetryOptions> = {
  attempts: 3,
  intervalInMs: 0,
  intervalFn: () => 0,
  predicate: () => true,
};

export const retry = <TaskResultType>(
  fn: Task<TaskResultType>,
  options: RetryOptions = defaultOptions
): Promise<TaskResultType> => {
  const {
    attempts = defaultOptions.attempts,
    intervalInMs = defaultOptions.intervalInMs,
    intervalFn = defaultOptions.intervalFn,
    predicate = defaultOptions.predicate,
  } = options;

  if (!isPositiveNumber(attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  const calcInterval: RetryIntervalFunc = isPositiveNumber(intervalInMs)
    ? () => intervalInMs
    : intervalFn;

  return new Promise<TaskResultType>(async (resolve, reject) => {
    for (const i of range(1, attempts)) {
      try {
        resolve(await fn());
        break;
      } catch (error) {
        if (i === attempts || !predicate(i, error)) {
          reject(error);
          break;
        }

        const interval = calcInterval(i);
        if (isPositiveNumber(interval)) {
          await delay(interval);
        }
      }
    }
  });
};
