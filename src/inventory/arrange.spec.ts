import { arrange } from "./arrange";

describe(".arrange()", () => {
  [
    {
      input: {
        orders: [
          [6, 5, 7],
          [4, 6, 5],
        ],
        warehouse: 1,
      },
      expected: 60,
    },
    {
      input: {
        orders: [
          [6, 5, 7],
          [4, 6, 5],
        ],
        warehouse: 2,
      },
      expected: 40,
    },
    {
      input: {
        orders: [
          [6, 5, 7],
          [4, 2, 5],
        ],
        warehouse: 1,
      },
      expected: 100,
    },
    {
      input: {
        orders: [
          [6, 5, 7],
          [4, 2, 5],
        ],
        warehouse: 2,
      },
      expected: 0,
    },
    {
      input: {
        orders: [
          [6, 5, 5],
          [4, 5, 5],
        ],
        warehouse: 1,
      },
      expected: 50,
    },
    {
      input: {
        orders: [
          [6, 5, 5],
          [4, 5, 5],
        ],
        warehouse: 2,
      },
      expected: 50,
    },
  ].forEach(({ input: { orders, warehouse }, expected }, index): void => {
    it(`#${index}`, () => {
      expect(arrange(orders, warehouse)).toBe(expected);
    });
  });
});
