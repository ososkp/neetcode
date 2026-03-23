class PaymentProcessor {
    constructor() {
        this.activeRules = [];
    }

    addRules(rules) {
        this.activeRules.push(...rules);
    }

    static createAmountRule = (thresholdAmount) => {
        return (transaction) => Number(transaction.amount) > thresholdAmount;
    }

    static createBlockedMerchantsRule = (merchantList) => {
        const merchantSet = new Set(merchantList);
        return (transaction) => merchantSet.has(transaction.merchant_id);
    }

    static createVelocityRule = (limit, timeWindowInMinutes) => {
        const timestampsByCardId = {};
        const rule = (transaction) => {
            const id = transaction.card_id;
            // No transactions for this card yet
            if (!Object.hasOwn(timestampsByCardId, id)) timestampsByCardId[id] = [];

            const newTime = new Date(transaction.timestamp);
            // Evict any past the time window, even if we're not at the limit
            const milisToMinutes = 1 / 60000;
            while (timestampsByCardId[id].length > 0) {
                const nextOldest = timestampsByCardId[id][0];
                if (((newTime - nextOldest) * milisToMinutes) > timeWindowInMinutes) {
                    timestampsByCardId[id].shift();
                } else {
                    break;
                }
            }
            // Add
            timestampsByCardId[id].push(newTime);
            //Check length
            if (timestampsByCardId[id].length > limit) {
                return true;
            }
            return false;
        }
        return rule;
    }

    evaluateRisk(transactions) {
        const filtered = transactions
            .filter(transaction => {
                return this.activeRules.some(rule => rule(transaction));
            });

        return filtered.map(transaction => transaction.id);
    }
}


const transactions = [
    {
        "id": "tx_1",
        "amount": 5000,
        "merchant_id": "m_alpha",
        "card_id": "c_123",
        "timestamp": "2026-03-21T10:00:00Z"
    },
    {
        "id": "tx_2",
        "amount": 15000,
        "merchant_id": "m_beta",
        "card_id": "c_456",
        "timestamp": "2026-03-21T10:05:00Z"
    },
    {
        "id": "tx_3",
        "amount": 2000,
        "merchant_id": "m_alpha",
        "card_id": "c_123",
        "timestamp": "2026-03-21T10:06:00Z"
    }
]

const pay = new PaymentProcessor;

const r1 = PaymentProcessor.createAmountRule(10000);
const r2 = PaymentProcessor.createBlockedMerchantsRule(['m_alpha', 'm_gamma']);
const r3 = PaymentProcessor.createVelocityRule(2, 10);
pay.addRules([r1, r2, r3]);

const trans2 = [
    {
        "id": "tx_001",
        "amount": 1500,
        "merchant_id": "m_safe",
        "card_id": "c_target_123",
        "timestamp": "2026-03-21T10:00:00Z"
    },
    {
        "id": "tx_002",
        "amount": 2500,
        "merchant_id": "m_safe",
        "card_id": "c_noise_999",
        "timestamp": "2026-03-21T10:02:00Z"
    },
    {
        "id": "tx_003",
        "amount": 1000,
        "merchant_id": "m_safe",
        "card_id": "c_target_123",
        "timestamp": "2026-03-21T10:05:00Z"
    },
    {
        "id": "tx_004",
        "amount": 500,
        "merchant_id": "m_safe",
        "card_id": "c_target_123",
        "timestamp": "2026-03-21T10:09:59Z"
    },
    {
        "id": "tx_005",
        "amount": 2000,
        "merchant_id": "m_safe",
        "card_id": "c_target_123",
        "timestamp": "2026-03-21T10:15:00Z"
    }
]

console.log(pay.evaluateRisk(trans2));