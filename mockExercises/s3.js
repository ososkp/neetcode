// --- MOCK ERRORS ---
class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}

// --- MOCK DOWNSTREAM SERVICE ---
class ChargeService {
    /**
     * Legacy API that randomly throws network errors or returns 5XX status codes.
     * @param {Object} request - { accountId: string, amount: number }
     * @returns {Promise<Object>} - { statusCode: number, transactionId: string|null }
     */
    async execute(request) {
        const roll = Math.random() * 100;

        if (roll < 20) {
            console.log("[ChargeService] Network connection dropped!");
            throw new NetworkError("Connection reset by peer");
        } else if (roll < 40) {
            console.log("[ChargeService] Internal Server Error (500)");
            return { statusCode: 500, transactionId: null };
        } else if (roll < 50) {
            console.log("[ChargeService] Service Unavailable (503)");
            return { statusCode: 503, transactionId: null };
        }

        console.log("[ChargeService] Charge successful (200)");
        return { statusCode: 200, transactionId: `txn_success_${Date.now()}` };
    }
}

// --- YOUR WRAPPER SKELETON ---
class ResilientChargeClient {
    constructor(chargeService) {
        this.chargeService = chargeService;
        this.fakeRedisCache = new Map();
        this.statusCodes = Object.freeze({
            INTERNAL_SERVICE_ERROR: 500,
            SERVICE_UNAVAILABLE: 503,
            SUCCESS: 200
        });
    }

    /**
     * Part 1 & 2: Implement retries and exponential backoff.
     * Part 3: Update signature and logic to support an Idempotency-Key.
     * * @param {Object} request - The charge request payload.
     * @param {string} idempotencyKey - Unique key for this specific charge attempt.
     * @returns {Promise<Object>}
     */
    async processChargeReliably(request, idempotencyKey) {
        // TODO: Part 3 - Write pseudo-code explaining how you would use idempotencyKey
        //                to check a database/cache before executing. How do you prevent
        //                double-charging if a previous attempt succeeded but the network
        //                dropped before the 200 OK reached this client?
        // 0. Lock down thread - we're in a transaction
        // 1. Check Redis cache for the idempotency key
        //      1a. If in cache, check response - if COMPLETED, return cached. If PENDING, reject
        //      1b. If not, add to cache and continue transaction
        // 2. Make request to chargeService.execute and capture response
        if (this.fakeRedisCache.has(idempotencyKey)) {
            const cachedRecord = this.fakeRedisCache.get(idempotencyKey);

            if (cachedRecord.status === 'COMPLETED') {
                return cachedRecord.response;
            } else {
                return { statusCode: 409, message: `Request already in progress: ${idempotencyKey}` };
            }
        }

        this.fakeRedisCache.set(idempotencyKey, {
            status: 'PENDING',
            response: null
        });

        // TODO: Part 1 - Add a loop (e.g., up to 3 retries) to catch NetworkError or 
        //                handle 5XX status codes from this.chargeService.execute(request).
        let attempts = 0;
        const MAX_RETRIES = 3;
        let lastError = null;
        while (attempts < MAX_RETRIES) {
            attempts++;
            console.log(`Attempt ${attempts}`);
            try {
                const response = await this.chargeService.execute(request);

                if (this.isServerError(response.statusCode)) {
                    lastError = new Error(`Upstream response failed with status ${response.statusCode}`);
                } else {
                    this.fakeRedisCache.set(idempotencyKey, {
                        status: 'COMPLETED',
                        response: response
                    });
                    return response;
                }
            } catch (e) {
                lastError = e;
            }

            const backoff = Math.pow(2, attempts - 1) * 100;
            console.log(`Backing off ${backoff} ms`);
            await new Promise(resolve => setTimeout(resolve, backoff));
        }

        this.fakeRedisCache.delete(idempotencyKey);
        console.log(`Retry limit exceeded for ${request.accountId}`);
        throw lastError;

        // TODO: Part 2 - Add exponential backoff between retries.
        //                Hint: A standard JS delay pattern is: 
        //                await new Promise(resolve => setTimeout(resolve, delayMs));

        // Current naive implementation:
        // return this.chargeService.execute(request);
    }

    isServerError(statusCode) {
        return statusCode >= 500 && statusCode < 600;
    }
}

// --- TEST RUNNER ---
async function runTest() {
    const legacyService = new ChargeService();
    const client = new ResilientChargeClient(legacyService);

    const request = { accountId: "acct_9876", amount: 150.00 };
    const idempotencyKey = "idemp_123456789";

    console.log("Starting charge request...");
    try {
        const response = await client.processChargeReliably(request, idempotencyKey);
        console.log(`Final Result: Status Code ${response.statusCode}`);
    } catch (error) {
        console.log(`Final Result: Failed permanently with ${error.message}`);
    }
}

// Execute the test
runTest();