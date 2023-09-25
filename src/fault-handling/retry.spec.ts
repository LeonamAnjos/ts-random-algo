import { range } from "../utils";
import { retry } from "./retry";

describe(".retry", () => {
  const fn = jest.fn();

  beforeEach(() => fn.mockClear());

  describe("attempts", () => {
    it("WHEN attempts: default AND succeeds", async () => {
      fn.mockReturnValueOnce("Done!");

      const actual = await retry<string>(fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(actual).toBe("Done!");
    });

    [...range(-5, 0)].forEach((attempts) => {
      it(`WHEN attempts: ${attempts}`, async () => {
        await retry(fn, { attempts }).catch((err) =>
          expect(err.message).toBe("Attempts must be positive number!")
        );

        expect(fn).not.toHaveBeenCalled();
      }, 1000);
    });

    [...range(1, 5)].forEach((attempts) => {
      it(`WHEN attempts: ${attempts} AND rejects`, async () => {
        const error = Error("Something went wrong!");
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
      it(`WHEN attempts: ${attempts} AND last attempt succeeds`, async () => {
        for (let j = 1; j < attempts; j++) {
          fn.mockImplementationOnce(() => {
            throw Error("Error");
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

  describe("wait", () => {
    jest.useFakeTimers();

    beforeEach(() => {
      fn.mockImplementationOnce(() => {
        throw Error();
      });

      fn.mockReturnValueOnce("Done!");
    });

    it("WHEN wait: 300", async () => {
      retry<string>(fn, { wait: 300 }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(299);

      expect(fn).toHaveBeenCalledTimes(1);

      await jest.advanceTimersByTimeAsync(1);

      expect(fn).toHaveBeenCalledTimes(2);
      expect(jest.getTimerCount()).toBe(0);
    });

    it("WHEN wait: -1", () => {
      retry<string>(fn, { wait: -1 }).then((value) =>
        expect(value).toBe("Done!")
      );

      expect(fn).toHaveBeenCalledTimes(2);
      expect(jest.getTimerCount()).toBe(0);
    });
  });
});
