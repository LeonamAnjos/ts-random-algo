import { countClicks } from './count-clicks'

describe("countClicks", () => {
    [
        {
            input: [
                "900,google.com",
                "10,mail.google.com",
                "50,yahoo.com",
                "200,mail.io",
            ],
            expected: new Map([
                ["com", 960],
                ["google.com", 910],
                ["mail.google.com", 10],
                ["yahoo.com", 50],
                ["io", 200],
                ["mail.io", 200],
            ]),
        },
    ].forEach(({input, expected}, index) => {
        it(`#${index}`, () => {
            expect(countClicks(input)).toEqual(expected);
        });
    });
});
