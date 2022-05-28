import {
  JSONObject,
  jsonToCamelCase,
  snakeCaseToCamelCase,
} from "./json-to-camel-case";

describe(".snakeCaseToCamelCase()", () => {
  [
    {
      input: "hi_there",
      expected: "hiThere",
    },
    {
      input: "my_name_is_john",
      expected: "myNameIsJohn",
    },
    {
      input: "_this_is_wierd",
      expected: "thisIsWierd",
    },
    {
      input: "",
      expected: "",
    },
    {
      input: "_",
      expected: "",
    },
    {
      input: "____one___edge________case",
      expected: "oneEdgeCase",
    },
  ].forEach(({ input, expected }) => {
    it(`WHEN ${input}`, () =>
      expect(snakeCaseToCamelCase(input)).toBe(expected));
  });
});

describe(".jsonToCamelCase()", () => {
  const toCamelCaseTestCases: { input: JSONObject; expected: JSONObject }[] = [
    {
      input: {
        string_value: "test_value",
        number_value: 123.45,
        boolean_value: true,
      },
      expected: {
        stringValue: "test_value",
        numberValue: 123.45,
        booleanValue: true,
      },
    },
    {
      input: {
        array_value: [1, 2, 3, 4, 5],
      },
      expected: {
        arrayValue: [1, 2, 3, 4, 5],
      },
    },
    {
      input: {
        complex_value: {
          sub_complex_value: {
            string_value: "Hello World!",
          },
        },
      },
      expected: {
        complexValue: {
          subComplexValue: {
            stringValue: "Hello World!",
          },
        },
      },
    },
  ];

  toCamelCaseTestCases.forEach(({ input, expected }, index) => {
    it(`#${index}`, () => {
      expect(jsonToCamelCase(input)).toEqual(expected);
    });
  });
});
