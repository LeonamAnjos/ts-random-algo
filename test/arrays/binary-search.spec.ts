import {binarySearch, binarySearchV2} from "../../src/arrays/binary-search";

const odds = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];

describe(".binarySearch()", () => {

    odds.forEach((e, index) => {
        it(`SHOULD find ${e} WHEN odds`, () => {
            expect(binarySearch(odds, e)).toBe(index);
        });
    });

    odds.forEach((e) => {
        it(`SHOULD NOT find ${e + 1} WHEN oods`, () => {
            expect(binarySearch(odds, e + 1)).toBe(-1);
        });
    });
});

describe(".binarySearchV2()", () => {
    odds.forEach((e, index) => {
        it(`SHOULD find ${e} WHEN odds`, () => {
            expect(binarySearchV2(odds, e)).toBe(index);
        });
    });

    odds.forEach((e) => {
        it(`SHOULD NOT find ${e + 1} WHEN oods`, () => {
            expect(binarySearchV2(odds, e + 1)).toBe(-1);
        });
    });
});
