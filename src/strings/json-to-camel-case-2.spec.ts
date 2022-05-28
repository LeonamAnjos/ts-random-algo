import { JSONObject } from "./json-to-camel-case";
import { jsonToCamelCaseV2, toCamelCaseV2 } from "./json-to-camel-case-2";

const testCase: { input: JSONObject; expected: JSONObject }[] = [
  {
    input: {
      number_one: 1,
    },
    expected: {
      numberOne: 1,
    },
  },
  {
    input: {
      boolean_true: true,
    },
    expected: {
      booleanTrue: true,
    },
  },
  {
    input: {
      string_str: "str",
    },
    expected: {
      stringStr: "str",
    },
  },
  {
    input: {
      object_json: { object_field: "object_field" },
    },
    expected: { objectJson: { objectField: "object_field" } },
  },
  {
    input: {
      object_json: {
        object_field: "object_field",
        another_object_field: { another_number: 1000 },
      },
    },
    expected: {
      objectJson: {
        objectField: "object_field",
        anotherObjectField: { anotherNumber: 1000 },
      },
    },
  },
  {
    input: {
      array_json: [
        {
          object_field: "object_field",
        },
      ],
    },
    expected: {
      arrayJson: [
        {
          objectField: "object_field",
        },
      ],
    },
  },
  {
    input: {
      array_json: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    },
    expected: {
      arrayJson: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    },
  },
];

testCase.forEach(({ input, expected }, index) => {
  it(`#${index}`, () => {
    expect(jsonToCamelCaseV2(input)).toStrictEqual(expected);
  });
});

[
  {
    input: "",
    expected: "",
  },
  {
    input: "mas",
    expected: "mas",
  },
  {
    input: "MAS",
    expected: "mas",
  },
  {
    input: "MAS_BHA",
    expected: "masBha",
  },
  {
    input: "MAS_BHA_again",
    expected: "masBhaAgain",
  },
  {
    input: "MAS__bha",
    expected: "masBha",
  },
  {
    input: "MAS.bha",
    expected: "masBha",
  },
  {
    input: "MAS bha",
    expected: "masBha",
  },
].forEach(({ input, expected }) => {
  it(`WHEN '${input}'`, () => {
    expect(toCamelCaseV2(input)).toBe(expected);
  });
});
