import { countRepeated } from "./count-repeated";

describe("countRepeated()", () => {
  [
    {
      input: "",
      expected: 0,
    },
    {
      input: "   ",
      expected: 0,
    },
    {
      input: "a    a",
      expected: 1,
    },
    {
      input: "A a",
      expected: 1,
    },
    {
      input: "A.a,A;a:A/a|A!a@A#a$A%a¨A&a*A(a)A_a-A+a=A{a}A`a´A^a~A[a]A<a>A",
      expected: 30,
    },
    {
      input: "1 2 1 22 11 2",
      expected: 2,
    },
    {
      input: "AaA; aa - - aaA?",
      expected: 1,
    },
  ].forEach(({ input, expected }) => {
    it(`WHEN '${input}'`, () => {
      expect(countRepeated(input)).toBe(expected);
    });
  });
});
