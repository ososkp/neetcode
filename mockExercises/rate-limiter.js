class RateLimiter {
    constructor(maxCapacity, refillRatePerSecond) {
        this.maxCapacity = maxCapacity;
        this.refillRatePerSecond = refillRatePerSecond;
        this.currentRequestNumber = 0;
        this.lastChecked = Date.now();
    }

    allowRequest() {
        const now = Date.now();

        const timePassedMs = now - this.lastChecked;
        this.lastChecked = now;

        const refills = (timePassedMs / 1000) * this.refillRatePerSecond;
        this.currentRequestNumber = Math.max(0, this.currentRequestNumber - refills)

        let result = false;
        if (this.currentRequestNumber <= this.maxCapacity - 1) {
            this.currentRequestNumber++;
            result = true;
        }

        return result;
    }
}

function printDate(ms) {
    return new Date(ms).toLocaleTimeString();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const limiter = new RateLimiter(2, 1);
console.log(limiter.allowRequest());
console.log(limiter.allowRequest());
console.log(limiter.allowRequest());
await sleep(1050);
console.log(limiter.allowRequest());
