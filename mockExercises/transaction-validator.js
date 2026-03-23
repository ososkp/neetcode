class TransactionValidator {
    constructor() {
        this.validations = [];
        const REQUIRED_FIELDS = new Set([
            'account_id',
            'amount',
            'currency',
            'payment_method',
            'country',
            'time'
        ]);
        const blockedMethods = new Set(['bad']);
        const threshold = 150;

        this.validations.push(this.missingRequiredField(REQUIRED_FIELDS));
        this.validations.push(this.exceedsThreshold(threshold));
        this.validations.push(this.blockedMethod(blockedMethods));
    }

    getMostCommonValue(arr) {
        // Get average for numbers
        if (typeof arr[0] === 'number') {
            return arr.reduce((total, acc) => total + acc, 0) / arr.length;
        }

        const freqMap = {};
        let mostCommon;
        let mostCommonAmount;

        for (const entry of arr) {
            freqMap[entry] = (freqMap[entry] || 0) + 1;

            if (freqMap[entry] > mostCommonAmount) {
                mostCommon = entry;
                mostCommonAmount = freqMap[entry];
            }
        }

        console.log(freqMap);
        return mostCommon;
    }

    getHistoricalNormsForAccount(historicalData) {
        const history = {};
        for (const field of Object.keys(historicalData[0])) {
            const fieldValues = historicalData.map(obj => obj[field]);
            history[field] = this.getMostCommonValue(fieldValues);
        }

        return history;
    }

    missingRequiredField = (fields) => {
        return (transaction) => {
            for (const field of fields) {
                if (!Object.hasOwn(transaction, field) || transaction[field] === null) return true;
            }
            return false;
        }
    }
    exceedsThreshold = (threshold) => {
        return (transaction) => Object.hasOwn(transaction, 'amount') && transaction.amount > threshold;
    }
    blockedMethod = (methods) => {
        return (transaction) => Object.hasOwn(transaction, 'payment_method') && methods.has(transaction.payment_method);
    }

    readRecords(json) {
        const result = [];

        for (const entry of json) {
            const suspicious = this.validations.some(val => val(entry));
            result.push({
                result: suspicious ? 'SUSPICIOUS' : 'OKAY',
                transaction: Object.values(entry).join('_')
            });
        }

        return result;
    }
}

const requiredFields = [
    'account_id',
    'amount',
    'currency',
    'payment_method',
    'country',
    'time'
]

const tv = new TransactionValidator();

// tv.addRequiredFieldValidation(requiredFields);
// tv.addExceedsThresholdValidation(149);
// tv.addBlockedPaymentMethodValidation(['bad']);

const historicalData = [
    { "account_id": "acc_123", "amount": 45, "currency": "USD", "payment_method": "card", "country": "US", "time": "13:30" },
    { "account_id": "acc_123", "amount": 60, "currency": "USD", "payment_method": "card", "country": "US", "time": "15:45" },
    { "account_id": "acc_123", "amount": 25, "currency": "USD", "payment_method": "card", "country": "US", "time": "09:15" },
    { "account_id": "acc_123", "amount": 80, "currency": "USD", "payment_method": "card", "country": "US", "time": "12:00" },
    { "account_id": "acc_123", "amount": 55, "currency": "USD", "payment_method": "card", "country": "US", "time": "14:20" },
    // Adding one slight outlier to make the data realistic, but the baseline remains strong
    { "account_id": "acc_123", "amount": 120, "currency": "USD", "payment_method": "bank_transfer", "country": "US", "time": "20:00" }
];

const json = [
    { "account_id": "acc_123", "amount": 50, "currency": "USD", "payment_method": "card", "country": "US", "time": "14:00" },
    { "account_id": "acc_123", "amount": null, "currency": "USD", "payment_method": "card", "country": "US", "time": "14:00" },
    { "account_id": "acc_123", "amount": 500, "currency": "USD", "payment_method": "crypto", "country": "RU", "time": "03:00" },
    { "account_id": "acc_123", "amount": 100, "currency": "USD", "payment_method": "bad", "country": "RU", "time": "03:00" },
    { "account_id": "acc_123", "amount": 100, "currency": null, "payment_method": "bad", "country": "RU", "time": "03:00" },
    { "account_id": "acc_123", "amount": 150, "currency": "USD", "payment_method": "bad", "country": "RU", "time": "03:00" }
];

// console.log(tv.readRecords(json));
console.log(tv.getHistoricalNormsForAccount(historicalData));

/*
class TransactionValidator {
    constructor() {
        this.validations = [];
        this.failedTransactions = {};
    }

    addRequiredFieldValidation = (requiredFields) => {
        const MISSING_FIELD = 'ERR_MISSING_FIELD';
        if (!this.failedTransactions[MISSING_FIELD]) this.failedTransactions[MISSING_FIELD] = [];

        const val = (transaction) => {
            for (const field of requiredFields) {
                if (!Object.hasOwn(transaction, field) || transaction[field] === null) {
                    this.failedTransactions[MISSING_FIELD].push(transaction)
                    return false;
                }
            }
            return true;
        }

        this.validations.push(val);
    }

    addExceedsThresholdValidation = (threshold) => {
        const EXCEEDS_THRESHOLD = 'ERR_EXCEEDS_THREHOLD';
        if (!this.failedTransactions[EXCEEDS_THRESHOLD]) this.failedTransactions[EXCEEDS_THRESHOLD] = [];
        const val = (transaction) => {
            if (transaction.amount !== null && Number(transaction.amount) > threshold) {
                this.failedTransactions[EXCEEDS_THRESHOLD].push(transaction);
                return false;
            }
            return true;
        }

        this.validations.push(val);
    }

    addBlockedPaymentMethodValidation = (blockedMethods) => {
        const blocked = new Set(blockedMethods).add(null);
        const BLOCKED_METHOD = 'ERR_BLOCKED_METHOD';
        if (!this.failedTransactions[BLOCKED_METHOD]) this.failedTransactions[BLOCKED_METHOD] = [];
        const val = (transaction) => {
            if (blocked.has(transaction.payment_method)) {
                this.failedTransactions[BLOCKED_METHOD].push(transaction);
                return false;
            }
            return true;
        }

        this.validations.push(val);
    }

    readRecords(json) {
        const records = [];

        for (const record of json) {
            let isValid = true;

            for (const validation of this.validations) {
                const passed = validation(record);

                if (!passed) {
                    isValid = false;
                }
            }

            if (isValid) records.push(record);
        }

        return records;
    }
}
    */