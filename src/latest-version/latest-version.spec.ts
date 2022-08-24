import { latestVersion } from './latest-version';

describe("latestVersion", () => {
    [
        {
            input: { v1: "1", v2: "2" },
            expected: "2",
        },
        {
            input: { v1: "1.9", v2: "2" },
            expected: "2",
        },
        {
            input: { v1: "2.2", v2: "1.5" },
            expected: "2.2",
        },
        {
            input: { v1: "2.10", v2: "2.9.99" },
            expected: "2.10",
        },
        {
            input: { v1: "2.34.99", v2: "2.35.0" },
            expected: "2.35.0",
        },
        {
            input: { v1: "2.3.4", v2: "2.3.5" },
            expected: "2.3.5",
        },
        {
            input: { v1: "2.4.15", v2: "2.4.9" },
            expected: "2.4.15",
        },
        {
            input: { v1: "3.0.0", v2: "3" },
            expected: "3",
        },
        {
            input: { v1: "3.0.1", v2: "3" },
            expected: "3.0.1",
        },
        {
            input: { v1: "3.0.1", v2: "10" },
            expected: "10",
        },
    ].forEach(({input: {v1, v2}, expected}) => {
        it (`${v1} vs ${v2}`, () => expect(latestVersion(v1, v2)).toBe(expected));
    });
});
