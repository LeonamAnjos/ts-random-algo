import { mostRequestedResource } from "./most-requested-resource";

describe("mostRequestedResource()", () => {
  [
    {
      input: [],
      expected: { resource: "", count: 0 },
    },
    {
      input: [["100", "user_1", "resource_1"]],
      expected: { resource: "resource_1", count: 1 },
    },
    {
      input: [
        ["300", "user_1", "resource_3"],
        ["599", "user_1", "resource_3"],
        ["900", "user_1", "resource_3"],
        ["1199", "user_1", "resource_3"],
        ["1200", "user_1", "resource_3"],
        ["1201", "user_1", "resource_3"],
        ["1202", "user_1", "resource_3"],
      ],
      expected: { resource: "resource_3", count: 4 },
    },
    {
      input: [
        ["58523", "user_1", "resource_1"],
        ["62314", "user_2", "resource_2"],
        ["54001", "user_1", "resource_3"],
        ["200", "user_6", "resource_5"],
        ["215", "user_6", "resource_4"],
        ["54060", "user_2", "resource_3"],
        ["53760", "user_3", "resource_3"],
        ["58522", "user_22", "resource_1"],
        ["53651", "user_5", "resource_3"],
        ["2", "user_6", "resource_1"],
        ["100", "user_6", "resource_6"],
        ["400", "user_7", "resource_2"],
        ["100", "user_8", "resource_6"],
        ["54359", "user_1", "resource_3"],
      ],
      expected: { resource: "resource_3", count: 3 },
    },
  ].forEach(({ input, expected }, index) => {
    it(`#${index}`, () => {
      expect(mostRequestedResource(input)).toEqual(expected);
    });
  });
});
