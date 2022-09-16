export class RateLimiter {
    public readonly refillFactor: number;
    private bucketSize: number;
    private lastRefillTimestamp: number = 0;

    constructor(
        public readonly limitPerPeriod: number,
        public readonly periodInMs: number,
    ) {
        this.bucketSize = limitPerPeriod;
        this.refillFactor = this.calcRefillFactor(limitPerPeriod, periodInMs);
    }

    public isAllowed(): boolean {
        this.refillBucket();

        if (this.bucketSize <= 0) {
            return false;
        }

        return --this.bucketSize >= 0;
    }

    private calcRefillFactor(limit: number, period: number): number {
        if (limit < 0) {
            throw new Error("limitPerPeriod should be positive number.");
        }

        if (period <= 0) {
            throw new Error("periodInMs should be bigger than ZERO.");
        }

        return limit / period;
    }

    private refillBucket(): void {
        const now = Date.now();
        const refill = Math.floor((now - this.lastRefillTimestamp) * this.refillFactor);

        if (refill <= 0) {
            return;
        }

        this.lastRefillTimestamp = now;
        this.bucketSize = Math.min(this.bucketSize + refill, this.limitPerPeriod);
    }
}
