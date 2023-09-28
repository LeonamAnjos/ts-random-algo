import { Task } from "../task-manager/task-manager";
import { delay, isPositiveNumber, range } from "../utils";

type RetryIntervalFunc = (attempt: number) => number;
type RetryPredicateFunc = (attempt: number, error: unknown) => boolean;
type RetryOnFailureFunc = (
  attempt: number,
  retriesLeft: number,
  error: unknown
) => void;

export interface RetryOptions {
  retries?: number;
  intervalInMs?: number;
  intervalFn?: RetryIntervalFunc;
  predicate?: RetryPredicateFunc;
  onFailure?: RetryOnFailureFunc;
  signal?: AbortSignal;
}

const defaultOptions: Required<Omit<RetryOptions, "signal">> = {
  retries: 3,
  intervalInMs: 0,
  intervalFn: () => 0,
  predicate: () => true,
  onFailure: () => {},
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
    onFailure = defaultOptions.onFailure,
    signal,
  } = options;

  if (!isPositiveNumber(retries)) {
    return Promise.reject(Error("Retries must be positive number!"));
  }

  const calcInterval: RetryIntervalFunc = isPositiveNumber(intervalInMs)
    ? () => intervalInMs
    : intervalFn;

  return new Promise<TaskResultType>(async (resolve, reject) => {
    for (const i of range(1, retries)) {
      if (!!signal?.aborted) {
        reject(Error(signal?.reason));
        break;
      }

      try {
        resolve(await fn());
        break;
      } catch (error) {
        onFailure(i, retries - i, error);

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
