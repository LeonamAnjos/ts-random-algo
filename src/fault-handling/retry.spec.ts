import { range } from "../utils";
import { retry } from "./retry";

describe(".retry", () => {
  const fn = jest.fn();

  beforeEach(() => fn.mockClear());

  describe("attempts", () => {
    it("SHOULD execute only once WHEN succeed on first attempt", async () => {
      fn.mockReturnValueOnce("Done!");

      const actual = await retry<string>(fn);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(actual).toBe("Done!");
    });

    [...range(-5, 0)].forEach((attempts) => {
      it(`SHOULD reject WHEN attempts is set to ${attempts}`, async () => {
        await retry(fn, { attempts }).catch((err) =>
          expect(err.message).toBe("Attempts must be positive number!")
        );

        expect(fn).not.toHaveBeenCalled();
      }, 1000);
    });

    [...range(1, 5)].forEach((attempts) => {
      it(`SHOULD reject WHEN attempts is set to ${attempts} AND fails every attempt`, async () => {
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
      it(`SHOULD succeed WHEN attempts is set to ${attempts} AND succeed in the last attempt`, async () => {
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
});
