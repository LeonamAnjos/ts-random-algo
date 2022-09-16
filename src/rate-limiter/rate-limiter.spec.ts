import { RateLimiter } from './rate-limiter'

describe("RateLimiter", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("SHOULD create", () => {
        const rateLimiter = new RateLimiter(1, 200);

        expect(rateLimiter.limitPerPeriod).toBe(1);
        expect(rateLimiter.periodInMs).toBe(200);
    });

    describe("#refillFactor", () => {
        [
            {
                input: {
                    limitPerPeriod: 0,
                    periodInMs: 1,
                },
                expected: 0.0,
            },
            {
                input: {
                    limitPerPeriod: 10,
                    periodInMs: 1000,
                },
                expected: 0.01,
            },
            {
                input: {
                    limitPerPeriod: 7,
                    periodInMs: 2000,
                },
                expected: 0.0035,
            },
        ].forEach(({input, expected}) => {
            it(`SHOULD calc refillFactor WHEN limit: ${input.limitPerPeriod} and period: ${input.periodInMs}`, () => {
                const rateLimiter = new RateLimiter(input.limitPerPeriod, input.periodInMs);
                expect(rateLimiter.refillFactor).toBe(expected);
            });
        });

        [
            {
                input: {
                    limitPerPeriod: 1,
                    periodInMs: 0,
                },
                expected: "periodInMs should be bigger than ZERO.",
            },
            {
                input: {
                    limitPerPeriod: 1,
                    periodInMs: -1,
                },
                expected: "periodInMs should be bigger than ZERO.",
            },
            {
                input: {
                    limitPerPeriod: -1,
                    periodInMs: 1,
                },
                expected: "limitPerPeriod should be positive number.",
            },
        ].forEach(({input, expected}) => {
            it(`SHOULD throw WHEN limit: ${input.limitPerPeriod} and period: ${input.periodInMs}`, () => {
                expect(() => new RateLimiter(input.limitPerPeriod, input.periodInMs)).toThrowError(expected);
            });
        });
    });

    describe("#isAllowed", () => {
        it ("SHOULD allow 2 WHEN 2 per period of 100 milliseconds", () => {
            const rateLimiter = new RateLimiter(2, 100);

            expect(rateLimiter.isAllowed()).toBe(true);
            expect(rateLimiter.isAllowed()).toBe(true);
        });

        it ("SHOULD not allow 2 WHEN 1 per period of 100 millisecons", () => {
            const rateLimiter = new RateLimiter(1, 100);

            expect(rateLimiter.isAllowed()).toBe(true);
            expect(rateLimiter.isAllowed()).toBe(false);
        });

        [
            {
                timeElapsed: 10,
                expected: false,
            },
            {
                timeElapsed: 50,
                expected: false,
            },
            {
                timeElapsed: 90,
                expected: false,
            },
            {
                timeElapsed: 100,
                expected: true,
            },
            {
                timeElapsed: 110,
                expected: true,
            },
            {
                timeElapsed: 190,
                expected: true,
            },
        ].forEach(({timeElapsed, expected}) => {
            it (`WHEN 1 per period of 100 millisecons AND time elapsed of ${timeElapsed}`, () => {
                const rateLimiter = new RateLimiter(1, 100);

                expect(rateLimiter.isAllowed()).toBe(true);
                expect(rateLimiter.isAllowed()).toBe(false);

                jest.advanceTimersByTime(timeElapsed);
                expect(rateLimiter.isAllowed()).toBe(expected);
            });
        });
    });
});
