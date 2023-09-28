import { range } from "../utils";
import { retry } from "./retry";

describe(".retry", () => {
  const fn = jest.fn();
  const error = Error("Test Error");

  beforeEach(() => fn.mockClear());

  it("WHEN input function returns a promise", async () => {
    fn.mockRejectedValueOnce(error);
    fn.mockResolvedValueOnce("Resolved!");

    const actual = await retry<string>(fn);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(actual).toBe("Resolved!");
  });

  it("WHEN input function returns a string", async () => {
    fn.mockImplementationOnce(() => {
      throw error;
    });
    fn.mockReturnValueOnce("Returned!");

    const actual = await retry<string>(fn);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(actual).toBe("Returned!");
  });

  describe("#retries", () => {
    it("WHEN default AND succeeds", async () => {
      fn.mockReturnValueOnce("Done!");

      const actual = await retry<string>(fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(actual).toBe("Done!");
    });

    [...range(-5, 0)].forEach((retries) => {
      it(`WHEN ${retries}`, async () => {
        await retry(fn, { retries }).catch((err) =>
          expect(err.message).toBe("Retries must be positive number!")
        );

        expect(fn).not.toHaveBeenCalled();
      }, 1000);
    });

    [...range(1, 5)].forEach((retries) => {
      it(`WHEN ${retries} AND rejects`, async () => {
        fn.mockImplementation(() => {
          throw error;
        });

        await retry(fn, { retries }).catch((err) => {
          expect(err).toBe(error);
        });

        expect(fn).toHaveBeenCalledTimes(retries);
      });
    });

    [...range(2, 6)].forEach((retries) => {
      it(`WHEN ${retries} AND last attempt succeeds`, async () => {
        for (let j = 1; j < retries; j++) {
          fn.mockImplementationOnce(() => {
            throw error;
          });
        }

        fn.mockImplementation(() => "Done!");

        await retry<string>(fn, { retries })
          .then((actual: string) => expect(actual).toBe("Done!"))
          .catch((_) => fail());

        expect(fn).toHaveBeenCalledTimes(retries);
      });
    });
  });

  describe("#interval as number", () => {
    jest.useFakeTimers();

    beforeEach(() => {
      fn.mockImplementationOnce(() => {
        throw error;
      });

      fn.mockReturnValueOnce("Done!");
    });

    it("WHEN 300", async () => {
      retry<string>(fn, { intervalInMs: 300 }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(299);

      expect(fn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(1);

      expect(fn).toHaveBeenCalledTimes(2);
      expect(jest.getTimerCount()).toBe(0);
    });

    it("WHEN -1", () => {
      retry<string>(fn, { intervalInMs: -1 }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(2);
      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe("#interval as function", () => {
    jest.useFakeTimers();

    beforeEach(() => {
      fn.mockImplementationOnce(() => {
        throw error;
      })
        .mockImplementationOnce(() => {
          throw error;
        })
        .mockImplementationOnce(() => {
          throw error;
        })
        .mockImplementationOnce(() => {
          throw error;
        })
        .mockReturnValueOnce("Done!");
    });

    it("WHEN (i) => 5**i * 100", async () => {
      const intervalFn = jest.fn((i) => Math.pow(5, i) * 100); // 500ms, 2.500ms, 12.500ms, 62.500ms, 312.500ms

      retry<string>(fn, { retries: 5, intervalFn }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(1);
      expect(intervalFn).toHaveBeenCalledWith(1);
      expect(intervalFn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(500);

      expect(fn).toHaveBeenCalledTimes(2);
      expect(intervalFn).toHaveBeenCalledWith(2);
      expect(intervalFn).toHaveBeenCalledTimes(2);

      await jest.advanceTimersByTimeAsync(2500);

      expect(fn).toHaveBeenCalledTimes(3);
      expect(intervalFn).toHaveBeenCalledTimes(3);
      expect(intervalFn).toHaveBeenCalledWith(3);

      await jest.advanceTimersByTimeAsync(12500);

      expect(fn).toHaveBeenCalledTimes(4);
      expect(intervalFn).toHaveBeenCalledTimes(4);
      expect(intervalFn).toHaveBeenCalledWith(4);

      await jest.advanceTimersByTimeAsync(62500);

      expect(fn).toHaveBeenCalledTimes(5);
      expect(intervalFn).toHaveBeenCalledTimes(4);
      expect(jest.getTimerCount()).toBe(0);
    });

    it("WHEN (i) => i * 500", async () => {
      const intervalFn = jest.fn((i) => i * 500); // 500ms, 1000ms, 1500ms, 2000ms, 2500ms

      retry<string>(fn, { retries: 5, intervalFn }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(1);
      expect(intervalFn).toHaveBeenCalledWith(1);
      expect(intervalFn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(500);

      expect(fn).toHaveBeenCalledTimes(2);
      expect(intervalFn).toHaveBeenCalledWith(2);
      expect(intervalFn).toHaveBeenCalledTimes(2);

      await jest.advanceTimersByTimeAsync(1000);

      expect(fn).toHaveBeenCalledTimes(3);
      expect(intervalFn).toHaveBeenCalledTimes(3);
      expect(intervalFn).toHaveBeenCalledWith(3);

      await jest.advanceTimersByTimeAsync(1500);

      expect(fn).toHaveBeenCalledTimes(4);
      expect(intervalFn).toHaveBeenCalledTimes(4);
      expect(intervalFn).toHaveBeenCalledWith(4);

      await jest.advanceTimersByTimeAsync(2000);

      expect(fn).toHaveBeenCalledTimes(5);
      expect(intervalFn).toHaveBeenCalledTimes(4);
      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe("#predicate", () => {
    beforeEach(() => {
      fn.mockImplementation(() => {
        throw error;
      });
    });

    [...range(1, 5)].forEach((i) => {
      it(`WHEN false on ${i} attempt`, async () => {
        const predicate = jest.fn((attempt: number) => attempt < i);

        await retry(fn, { retries: 10, predicate }).catch((err) => {
          expect(err).toBe(error);
        });

        expect(fn).toHaveBeenCalledTimes(i);
        expect(predicate).toHaveBeenCalledTimes(i);
        expect(predicate).toHaveBeenCalledWith(i, error);
      });
    });
  });

  describe("#onFailure", () => {
    beforeEach(() => {
      fn.mockImplementation(() => {
        throw error;
      });
    });

    it("WHEN it fails every attempt", async () => {
      const onFailureFn = jest.fn();

      await retry(fn, { retries: 3, onFailure: onFailureFn }).catch((err) => {
        expect(err).toBe(error);
      });

      expect(onFailureFn).toHaveBeenCalledTimes(3);
      expect(onFailureFn).toHaveBeenNthCalledWith(1, 1, 2, error);
      expect(onFailureFn).toHaveBeenNthCalledWith(2, 2, 1, error);
      expect(onFailureFn).toHaveBeenNthCalledWith(3, 3, 0, error);
    });
  });

  describe("#signal", () => {
    jest.useFakeTimers();

    beforeEach(() => {
      fn.mockImplementation(() => {
        throw error;
      });
    });

    it("WHEN aborted", async () => {
      const controller = new AbortController();

      retry(fn, {
        retries: Number.POSITIVE_INFINITY,
        intervalInMs: 10,
        signal: controller.signal,
      }).catch((err) => {
        expect(err.message).toBe("AbortError");
      });

      expect(fn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(10);

      expect(fn).toHaveBeenCalledTimes(2);

      controller.abort("AbortError");

      await jest.advanceTimersByTimeAsync(10);

      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
