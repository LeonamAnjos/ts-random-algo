export interface RetryOptions {
  attempts: number;
}

const defaultOptions: RetryOptions = {
  attempts: 3,
};

const isPositiveNumber = (n: number): boolean => Math.sign(n) > 0;

export const retry = <TResult>(
  fn: () => TResult,
  options: RetryOptions = defaultOptions
): Promise<TResult> => {
  if (!isPositiveNumber(options.attempts)) {
    return Promise.reject(Error("Attempts must be positive number!"));
  }

  return new Promise<TResult>((resolve, reject) => {
    for (let i = 1; i <= options.attempts; i++) {
      try {
        resolve(fn());
        break;
      } catch (error) {
        if (i === options.attempts) {
          reject(error);
        }
      }
    }
  });
};
