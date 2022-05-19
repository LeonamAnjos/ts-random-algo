import { merge } from "../../src/sorting/merge-sorted-array";

describe(".merge()", () => {
    [
        {
            input: {
                arr1: [1,2,3,0,0,0],
                length1: 3,
                arr2: [2,5,6],
                length2: 3,
            },
            expected: [1,2,2,3,5,6],
        },
        {
            input: {
                arr1: [1],
                length1: 1,
                arr2: [],
                length2: 0,
            },
            expected: [1],
        },
        {
            input: {
                arr1: [0],
                length1: 0,
                arr2: [1],
                length2: 1,
            },
            expected: [1],
        },
    ].forEach(({input, expected}, index) => {
        it(`#${index}`, () => {
            const { arr1, length1, arr2, length2 } = input;
            expect(merge(arr1, length1, arr2, length2)).toEqual(expected);
        });
    });
});
