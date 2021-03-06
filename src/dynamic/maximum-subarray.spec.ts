import { maxSubArray } from "./maximum-subarray";

describe("maximumSubarray()", () => {
  [
    {
      input: [],
      expected: 0,
    },
    {
      input: [1],
      expected: 1,
    },
    {
      input: [-2, 1],
      expected: 1,
    },
    {
      input: [-6, -1, -7],
      expected: -1,
    },
    {
      input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
      expected: 6,
    },
    {
      input: [5, 4, -1, 7, 8],
      expected: 23,
    },
  ].forEach(({ input, expected }, index) => {
    it(`#${index}`, () => {
      expect(maxSubArray(input)).toBe(expected);
    });
  });
});
