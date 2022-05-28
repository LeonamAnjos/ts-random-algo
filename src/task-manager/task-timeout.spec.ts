import { taskTimeout, TimeoutError } from "./task-timeout";
import { delay } from "../utils";

describe("taskTimeout()", () => {
  it("SHOULD rejects WHEN timeout", async () => {
    expect.assertions(2);

    const timeoutError = new TimeoutError();

    await expect(taskTimeout(delay(3), 1)).rejects.toThrow(timeoutError);
    await expect(taskTimeout(delay(3), 2)).rejects.toThrow(timeoutError);
  });

  it("SHOULD resolves WHEN NOT timeout", async () => {
    expect.assertions(3);

    await Promise.all([
      expect(taskTimeout(delay(3))).resolves.toBeUndefined(),
      expect(taskTimeout(delay(3), 3)).resolves.toBeUndefined(),
      expect(taskTimeout(delay(3), 4)).resolves.toBeUndefined(),
    ]);
  });
});
