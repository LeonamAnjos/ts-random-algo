/*
Task Manager

We need to handle multiple (potentially) long-running tasks.

Complete the implementation of the "TaskManager" class, considering that:

* If the number of tasks executing right now is less than the concurrency limit, tasks should be executed immediately;
* If the number of tasks executing right now equals the concurrency limit, new taks should be queued and executed as soon as possible.

*/

/***** Implementation *****/

export type Task<TaskResultType> =
  | (() => PromiseLike<TaskResultType>)
  | (() => TaskResultType);

export interface Options {
  readonly concurrency?: number;
}

export class TaskManager {
  private readonly queue: Task<unknown>[] = [];
  private readonly _concurrency!: number;
  private _pendingCount: number = 0;

  public constructor(options?: Options) {
    this._concurrency = options?.concurrency ?? Number.POSITIVE_INFINITY;
  }

  public get concurrency(): number {
    return this._concurrency;
  }

  public get doesConcurrentAllowAnother(): boolean {
    return this._pendingCount < this._concurrency;
  }

  public add<TaskResultType>(
    fn: Task<TaskResultType>
  ): Promise<TaskResultType> {
    return new Promise<TaskResultType>((resolve, reject) => {
      const run = async (): Promise<void> => {
        this._pendingCount++;

        try {
          const result = await fn();
          resolve(result);
        } catch (error: unknown) {
          reject(error);
        } finally {
          this._pendingCount--;
          this.tryToExecute();
        }
      };

      this.queue.push(run);
      this.tryToExecute();
    });
  }

  public tryToExecute(): void {
    if (!this.doesConcurrentAllowAnother) {
      return;
    }

    const task = this.queue.shift();
    if (!!task) {
      task();
    }
  }
}
