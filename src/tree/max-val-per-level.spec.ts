import { maxValPerLevel, TreeNode } from "./max-val-per-level";

type TestCase = {
  input: TreeNode;
  expected: number[];
};

const testCases: TestCase[] = [
  {
    input: {
      value: 10,
    },
    expected: [10],
  },
  {
    input: {
      value: 2,
      left: {
        value: 3,
        left: {
          value: 5,
        },
        right: {
          value: 8,
        },
      },
      right: {
        value: 7,
        right: {
          value: 9,
        },
      },
    },
    expected: [2, 7, 9],
  },
  {
    input: {
      value: 4,
      left: {
        value: 8,
        left: {
          value: 5,
        },
        right: {
          value: 7,
          right: {
            value: 12,
          },
        },
      },
      right: {
        value: 6,
        right: {
          value: 1,
        },
      },
    },
    expected: [4, 8, 7, 12],
  },
];

describe("maxValPerLevel", () => {
  testCases.forEach(({ input, expected }: TestCase, index: number) => {
    it(`#${index + 1}`, () => {
      const actual = maxValPerLevel(input);

      expect(actual.length).toBe(expected.length);
      expect(actual).toEqual(expect.arrayContaining(expected));
    });
  });
});
