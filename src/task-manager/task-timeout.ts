export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export const taskTimeout = <TaskResultType>(
  fn: Promise<TaskResultType>,
  ms?: number
): Promise<TaskResultType> => {
  if (!ms || ms === Number.POSITIVE_INFINITY) {
    return fn;
  }

  let timer: any = null;

  const clean = () => {
    if (!!timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return new Promise<TaskResultType>((resolve, reject) => {
    timer = setTimeout(() => {
      clean();
      reject(new TimeoutError());
    }, ms);

    (async () => {
      try {
        const result = await fn;
        if (!!timer) {
          resolve(result);
        }
      } catch (error: unknown) {
        if (!!timer) {
          reject(error);
        }
      } finally {
        clean();
      }
    })();
  });
};
