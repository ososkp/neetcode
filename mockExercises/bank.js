class Bank {
    constructor(balances) {
        this.accounts = [...balances];
        this.statements = new Map();
        this.accounts.forEach((_, index) => {
            this.statements.set(index + 1, []);
        })
        this.pendingPayments = [];

        this.ops = {
            "DEPOSIT": (_, acc, money) => this.deposit(acc, money),
            "WITHDRAW": (_, acc, money) => this.withdraw(acc, money),
            "TRANSFER": (_, from, to, money) => this.transfer(from, to, money),
            "SCHEDULE_PAYMENT": (timestamp, from, to, money, delay) => this.schedule(timestamp, from, to, money, delay)
        }
    }

    // 1-indexed
    isValid(acc) {
        return acc >= 1 && acc <= this.accounts.length;
    }

    hasSufficientFunds(acc, money) {
        return this.accounts[acc - 1] >= money;
    }

    logTransaction(accId, type, amount, result) {
        const history = this.statements.get(accId);

        if (history) {
            const status = result ? 'Success' : 'Failed';
            history.push({
                type,
                amount,
                status
            });
        }
    }

    deposit = (toAcc, money) => {
        let result;
        if (!this.isValid(toAcc)) {
            result = false;
        } else {

            this.accounts[toAcc - 1] += money;
            result = true;
        }

        this.logTransaction(toAcc, 'Deposit', money, result);
        return result;
    }

    withdraw = (fromAcc, money) => {
        let result;
        if (!(this.isValid(fromAcc)
            && this.hasSufficientFunds(fromAcc, money))) {
            result = false;
        } else {

            this.accounts[fromAcc - 1] -= money;
            result = true;
        }

        this.logTransaction(fromAcc, 'Withdraw', money, result);
        return result;
    }

    transfer = (fromAcc, toAcc, money) => {
        let result;
        if (!this.withdraw(fromAcc, money)) {
            this.logTransaction(fromAcc, 'Transfer_Out', money, false)
            return false;
        }

        result = this.deposit(toAcc, money);

        // Check for network error
        if (!result) {
            // Put the money back if the deposite failed
            result = false;
            this.deposit(fromAcc, money);
            this.logTransaction(fromAcc, 'Transfer_Out', money, result)
        } else {
            this.logTransaction(fromAcc, 'Transfer_Out', money, result)
            this.logTransaction(toAcc, 'Transfer_In', money, result)
        }

        return result;
    }

    processPayments(timestamp) {
        while (this.pendingPayments.length > 0 && this.pendingPayments[0].executionTime <= timestamp) {
            const next = this.pendingPayments.shift()
            this.transfer(next.fromAcc, next.toAcc, next.money);
        }
    }

    schedule = (timestamp, fromAcc, toAcc, money, delay) => {
        if (!(this.isValid(fromAcc) && this.isValid(toAcc))) return false;

        this.pendingPayments.push({
            executionTime: timestamp + delay,
            fromAcc,
            toAcc,
            money
        })

        this.pendingPayments.sort((a, b) => a.executionTime - b.executionTime);
        return true;
    }

    getStatement = (accId) => {
        return this.statements.get(accId);
    }

    process(requests) {
        return requests.map(req => {
            const parts = req.split(' ').map(x => isNaN(x) ? x : Number(x));
            const timestamp = parts[0];
            const type = parts[1].toUpperCase();
            const args = parts.slice(2);

            this.processPayments(timestamp);

            const operation = this.ops[type]
            if (!operation) return false;

            return operation(timestamp, ...args);
        })
    }
}

class BankFactory {
    static createBank(accounts) {
        return new Bank(accounts);
    }
}

const bank = BankFactory.createBank([10, 100, 20]);
const requests = [
    "1 withdraw 2 10",
    "4 transfer 1 3 5",
    "5 deposit 1 50",
    "10 withdraw 3 100"
];
// console.log(bank.process(requests)); // Expected: [true, true, true, false]

// Scheduled payments
const scenario1_balances = [100, 100];
const scenario1_requests = [
    "10 SCHEDULE_PAYMENT 1 2 50 10", // Due at T=20
    "15 WITHDRAW 1 70",              // T=15: Acc1 has 100, withdraws 70. Bal: [30, 100]
    "25 DEPOSIT 2 0"                 // T=25: Flushes T=20. Acc1 only has 30, so $50 transfer FAILS.
];
const bank1 = BankFactory.createBank(scenario1_balances);
console.log(bank1.process(scenario1_requests));
// Expected Output: [true, true, true] 
// Final Balances: [30, 100]

const scenario2_balances = [10, 100];
const scenario2_requests = [
    "10 SCHEDULE_PAYMENT 1 2 50 10", // Due at T=20. Acc1 has $10.
    "15 DEPOSIT 1 100",              // T=15: Acc1 now has $110.
    "25 WITHDRAW 1 0"                // T=25: Flushes T=20. Acc1 has $110, transfer $50 SUCCEEDS.
];
const bank2 = BankFactory.createBank(scenario2_balances);
console.log(bank2.process(scenario2_requests));
// Expected Output: [true, true, true]
// Final Balances: [60, 150]

const scenario3_balances = [200, 0, 0];
const scenario3_requests = [
    "10 SCHEDULE_PAYMENT 1 2 100 50", // Due at T=60
    "20 SCHEDULE_PAYMENT 1 3 100 20", // Due at T=40
    "70 WITHDRAW 1 0"                 // T=70: Flushes T=40 first, then T=60.
];
const bank3 = BankFactory.createBank(scenario3_balances);
console.log(bank3.process(scenario3_requests));
// Expected Output: [true, true, true]
// Final Balances: [0, 100, 100]

const failure_balances = [100, 0];
const failure_requests = [
    "10 SCHEDULE_PAYMENT 1 2 60 10", // T=10: Scheduled for T=20.
    "15 WITHDRAW 1 50",               // T=15: Success. Balance: [50, 0]
    "25 DEPOSIT 1 0"                  // T=25: Trigger flush for T=20.
];

const bank4 = BankFactory.createBank(failure_balances);
console.log(bank4.process(failure_requests));
console.log(bank4.getStatement(1));
console.log(bank4.getStatement(2));