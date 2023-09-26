import { range } from "../utils";
import { retry } from "./retry";

describe(".retry", () => {
  const fn = jest.fn();
  const error = Error("Test Error");

  beforeEach(() => fn.mockClear());

  describe("#attempts", () => {
    it("WHEN default AND succeeds", async () => {
      fn.mockReturnValueOnce("Done!");

      const actual = await retry<string>(fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(actual).toBe("Done!");
    });

    [...range(-5, 0)].forEach((attempts) => {
      it(`WHEN ${attempts}`, async () => {
        await retry(fn, { attempts }).catch((err) =>
          expect(err.message).toBe("Attempts must be positive number!")
        );

        expect(fn).not.toHaveBeenCalled();
      }, 1000);
    });

    [...range(1, 5)].forEach((attempts) => {
      it(`WHEN ${attempts} AND rejects`, async () => {
        fn.mockImplementation(() => {
          throw error;
        });

        await retry(fn, { attempts }).catch((err) => {
          expect(err).toBe(error);
        });

        expect(fn).toHaveBeenCalledTimes(attempts);
      });
    });

    [...range(2, 6)].forEach((attempts) => {
      it(`WHEN ${attempts} AND last attempt succeeds`, async () => {
        for (let j = 1; j < attempts; j++) {
          fn.mockImplementationOnce(() => {
            throw error;
          });
        }

        fn.mockImplementation(() => "Done!");

        await retry<string>(fn, { attempts })
          .then((actual: string) => expect(actual).toBe("Done!"))
          .catch((_) => fail());

        expect(fn).toHaveBeenCalledTimes(attempts);
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

      retry<string>(fn, { attempts: 5, intervalFn: intervalFn }).then((value) =>
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

      retry<string>(fn, { attempts: 5, intervalFn }).then((value) =>
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

        await retry(fn, { attempts: 10, predicate }).catch((err) => {
          expect(err).toBe(error);
        });

        expect(fn).toHaveBeenCalledTimes(i);
        expect(predicate).toHaveBeenCalledTimes(i);
        expect(predicate).toHaveBeenCalledWith(i, error);
      });
    });
  });

  it.todo("SHOULD accept promise");
});
