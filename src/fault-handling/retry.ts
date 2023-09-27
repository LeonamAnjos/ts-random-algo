import { Task } from "../task-manager/task-manager";
import { delay, isPositiveNumber, range } from "../utils";

type RetryIntervalFunc = (i: number) => number;
type RetryPredicateFunc = (i: number, e: unknown) => boolean;

export interface RetryOptions {
  retries?: number;
  intervalInMs?: number;
  intervalFn?: RetryIntervalFunc;
  predicate?: RetryPredicateFunc;
}

const defaultOptions: Required<RetryOptions> = {
  retries: 3,
  intervalInMs: 0,
  intervalFn: () => 0,
  predicate: () => true,
};

export const retry = <TaskResultType>(
  fn: Task<TaskResultType>,
  options: RetryOptions = defaultOptions
): Promise<TaskResultType> => {
  const {
    retries = defaultOptions.retries,
    intervalInMs = defaultOptions.intervalInMs,
    intervalFn = defaultOptions.intervalFn,
    predicate = defaultOptions.predicate,
  } = options;

  if (!isPositiveNumber(retries)) {
    return Promise.reject(Error("Retries must be positive number!"));
  }

  const calcInterval: RetryIntervalFunc = isPositiveNumber(intervalInMs)
    ? () => intervalInMs
    : intervalFn;

  return new Promise<TaskResultType>(async (resolve, reject) => {
    for (const i of range(1, retries)) {
      try {
        resolve(await fn());
        break;
      } catch (error) {
        if (i === retries || !predicate(i, error)) {
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
