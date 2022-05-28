import { threeSum } from "./three-sum";

describe(".threeSum()", () => {
  [
    {
      input: [],
      expected: [],
    },
    {
      input: [0],
      expected: [],
    },
    {
      input: [-1, 0, 1, 2, -1, -4],
      expected: [
        [-1, 0, 1],
        [-1, -1, 2],
      ],
    },
  ].forEach(({ input, expected }, index) => {
    it(`#${index}`, async () => {
      expect(JSON.stringify(await threeSum(input))).toEqual(
        JSON.stringify(expected)
      );
    });
  });
});
