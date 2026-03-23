class Api {
    constructor() {
        this.rates = {};
    }

    rateLimit(stream, rate, time) {
        // ts, id, endpoint
        const results = [];
        for (const [ts, id, endpoint] of stream) {
            if (!Object.hasOwn(this.rates, id)) this.rates[id] = {};
            if (!Object.hasOwn(this.rates[id], endpoint)) this.rates[id][endpoint] = [];

            const queue = this.rates[id][endpoint];

            while (queue.length > 0 && ts - queue[0] >= time) queue.shift();

            if (queue.length >= rate) {
                results.push(false);
            } else {
                queue.push(ts)
                results.push(true);
            }
        }

        return results;
    }
}

/**
 * THE MEATY TEST SUITE
 */
const testCases = [
    {
        name: "1. The Exact Boundary (Off-By-One Catcher)",
        description: "Tests if the window strictly enforces the 60-second rule. If T=10, T=70 is exactly 60 seconds later and should be ALLOWED.",
        input: [
            ...generateRequests(100, 10, "cust_boundary"), // 100 requests at T=10
            [69, "cust_boundary", "/api/data"],           // T=69 (59 secs later) -> Should DROP
            [70, "cust_boundary", "/api/data"],           // T=70 (60 secs later) -> Should ALLOW
            [70, "cust_boundary", "/api/data"],           // T=70 (2nd request)   -> Should ALLOW
        ],
        expected: [
            ...Array(100).fill(true),
            false,
            true,
            true
        ]
    },
    {
        name: "2. Cross-Tenant Contamination",
        description: "Ensures Customer B is not punished for Customer A's rate limit.",
        input: [
            ...generateRequests(100, 0, "cust_A"),  // A maxes out at T=0
            [0, "cust_B", "/api/data"],             // B makes a request at T=0 -> ALLOW
            [30, "cust_A", "/api/data"],            // A tries at T=30          -> DROP
            [30, "cust_B", "/api/data"],            // B tries at T=30          -> ALLOW
            ...generateRequests(98, 30, "cust_B"),  // B makes 98 more at T=30  -> ALLOW
            [31, "cust_B", "/api/data"],            // B hits limit (101st)     -> DROP
        ],
        expected: [
            ...Array(100).fill(true), // A's initial 100
            true,                     // B at T=0
            false,                    // A at T=30
            true,                     // B at T=30 (1st)
            ...Array(98).fill(true),  // B's remaining 98
            false                     // B's 101st request
        ]
    },
    {
        name: "3. The Slow Drip (Queue Eviction Test)",
        description: "Tests if old requests are evicted smoothly, freeing up exact capacity rather than clearing the whole window at once.",
        input: [
            ...generateRequests(50, 0, "cust_drip"),   // 50 requests at T=0
            ...generateRequests(50, 30, "cust_drip"),  // 50 requests at T=30 (Total: 100)
            [45, "cust_drip", "/api/data"],            // T=45 -> DROP (Queue is full)

            // At T=60, the 50 requests from T=0 expire. 
            // The 50 requests from T=30 are still active.
            // We should have exactly 50 slots available.
            ...generateRequests(50, 60, "cust_drip"),  // 50 requests at T=60 -> ALLOW
            [60, "cust_drip", "/api/data"],            // 51st request at T=60 -> DROP

            // At T=90, the 50 requests from T=30 expire.
            ...generateRequests(50, 90, "cust_drip"),  // 50 requests at T=90 -> ALLOW
        ],
        expected: [
            ...Array(50).fill(true),  // T=0
            ...Array(50).fill(true),  // T=30
            false,                    // T=45
            ...Array(50).fill(true),  // T=60
            false,                    // T=60 (overflow)
            ...Array(50).fill(true),  // T=90
        ]
    },
    {
        name: "4. The Sparse Timeline (Memory Leak Prevention)",
        description: "A large time jump. If you iterate second-by-second to clear old data, a large jump will cause a massive lag spike. You must jump directly using Math or a while loop on the Deque.",
        input: [
            ...generateRequests(100, 0, "cust_sparse"),     // Max out at T=0
            [10, "cust_sparse", "/api/data"],               // T=10 -> DROP
            [1_000_000, "cust_sparse", "/api/data"],        // T=1,000,000 -> ALLOW (Huge time jump)
            ...generateRequests(99, 1_000_000, "cust_sparse")// T=1,000,000 -> ALLOW remaining 99
        ],
        expected: [
            ...Array(100).fill(true),
            false,
            true,
            ...Array(99).fill(true)
        ]
    }
];

testCases.forEach((tc, index) => {
    const api = new Api();
    const result = api.rateLimit(tc.input, 100, 60);

    // Simple array equality check
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected);

    console.log(`\nTest ${index + 1}: ${tc.name}`);
    console.log(`Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);

    if (!passed) {
        console.log("Expected length:", tc.expected.length, "Got:", result.length);
        // Find the first mismatch to help debugging
        for (let i = 0; i < tc.expected.length; i++) {
            if (tc.expected[i] !== result[i]) {
                console.log(`Mismatch at index ${i}. Expected ${tc.expected[i]}, Got ${result[i]}`);
                console.log(`Failing Request Data:`, tc.input[i]);
                break;
            }
        }
    }
});
/**
 * Helper to generate bulk requests for testing
 */
function generateRequests(count, timestamp, customerId, endpoint = "/api/data") {
    return Array.from({ length: count }, () => [timestamp, customerId, endpoint]);
}

// --- HOW TO USE THIS WITH YOUR FUNCTION ---
// Assuming your function is called `rateLimit(stream)`:

/*
testCases.forEach((tc, index) => {
    const result = rateLimit(tc.input);
    
    // Simple array equality check
    const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
    
    console.log(`\nTest ${index + 1}: ${tc.name}`);
    console.log(`Result: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
    
    if (!passed) {
        console.log("Expected length:", tc.expected.length, "Got:", result.length);
        // Find the first mismatch to help debugging
        for(let i = 0; i < tc.expected.length; i++) {
            if (tc.expected[i] !== result[i]) {
                console.log(`Mismatch at index ${i}. Expected ${tc.expected[i]}, Got ${result[i]}`);
                console.log(`Failing Request Data:`, tc.input[i]);
                break;
            }
        }
    }
});
*/