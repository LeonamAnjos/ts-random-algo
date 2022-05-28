import { threeSumClosest } from "../../src/arrays/three-sum-closest";

describe(".threeSumClosest()", () => {
    [
        {
            input: {
                nums: [0,0,0],
                target: 1,
            },
            expected: 0,
        },
        {
            input: {
                nums: [-1,2,1,-4],
                target: 1,
            },
            expected: 2,
        },
    ].forEach(({input, expected}, index) => {
        it(`#${index}`, () => {
            expect(threeSumClosest(input.nums, input.target)).toEqual(expected);
        })
    });
});
