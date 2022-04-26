import {minimumSwaps} from "../../src/arrays/minimum-swaps";

describe("#minimumSwaps", () => {
    [
        {
            input: [7, 1, 3, 2, 4, 5, 6],
            expected: 5,
        },
        {
            input: [4, 3, 1, 2],
            expected: 3,
        },
        {
            input: [2, 3, 4, 1, 5],
            expected: 3,
        },
        {
            input: [1, 3, 5, 2, 4, 6, 7],
            expected: 3,
        },
    ].forEach(({input, expected}, index: number): void => {
        it(`#${index}.`, () => {
            expect(minimumSwaps(input)).toEqual(expected);
        });
    })
});

