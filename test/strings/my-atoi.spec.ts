import {myAtoi, myAtoi2} from "../../src/strings/my-atoi";

const testCases=     [
    {
        input: "42",
        expected: 42,
    },
    {
        input: "-12-",
        expected: -12,
    },
    {
        input: "+456-",
        expected: 456,
    },
    {
        input: "+-9",
        expected: 0,
    },
    {
        input: "w42",
        expected: 0,
    },
    {
        input: "    -123test",
        expected: -123,
    },
    {
        input: "-99999999999999999",
        expected: -2147483648,
    },
    {
        input: "99999999999999999",
        expected: 2147483647,
    },
];

describe(".myAtoi()", () => {
    testCases.forEach(({input, expected}) => {
        it(`WHEN "${input}"`, () => {
            expect(myAtoi(input)).toBe(expected);
        });
    });
})

describe(".myAtoi2()", () => {
    testCases.forEach(({input, expected}) => {
        it(`WHEN "${input}"`, () => {
            expect(myAtoi2(input)).toBe(expected);
        });
    });
})
