class Ledger {
    // Has account balances { "account_id": balance}
    // Read in chronological list of transfers
    // Process and output final balances
    // Amounts in cents
    constructor(accounts) {
        this.accounts = {};
        this.transactionQueue = [];
        this.transactionQueuePointer = 0;
        this.rejectedTransactions = [];
        for (const [id, amount] of Object.entries(accounts)) {
            this.accounts[id] = {
                balance: amount,
                pendingIn: 0,
                pendingOut: 0
            };
        }

        this.ops = {
            'SETTLED': (args) => this.transfer(...args),
            'PENDING': (args) => this.recordPendingTransaction(...args)
        }
    }

    withdraw(fromAcc, amount) {
        if (!Object.hasOwn(this.accounts, fromAcc)) return false;
        if (this.hasInsufficientFunds(fromAcc, amount)) return false;

        this.accounts[fromAcc].balance -= amount;
        return true;
    }

    deposit(toAcc, amount) {
        if (!Object.hasOwn(this.accounts, toAcc)) return false;

        this.accounts[toAcc].balance += amount;
        return true;
    }

    transfer = (fromAcc, toAcc, amount) => {
        if (!this.withdraw(fromAcc, amount)) return false;

        const depositResult = this.deposit(toAcc, amount);
        // Failed, put the money back
        if (!depositResult) {
            this.deposit(fromAcc, amount);
            return false;
        }

        return true;
    }

    hasInsufficientFunds(acc, amount) {
        return (Math.abs(this.accounts[acc].pendingOut + amount)
            > this.accounts[acc].balance);
    }

    recordPendingTransaction(fromAcc, toAcc, amount) {
        if (!Object.hasOwn(this.accounts, fromAcc)) return false;
        if (!Object.hasOwn(this.accounts, toAcc)) return false;

        if (this.hasInsufficientFunds(fromAcc, amount)) return false;

        this.accounts[fromAcc].pendingOut += amount;
        this.accounts[toAcc].pendingIn += amount;

        return true;
    }

    processTransactions(transactions) {
        this.transactionQueue.push(...transactions);
        const failedTransactions = [];

        while (this.transactionQueuePointer < this.transactionQueue.length) {
            const transaction = this.transactionQueue[this.transactionQueuePointer];
            const from = transaction.from;
            const to = transaction.to;
            const amount = transaction.amount;

            if (!Object.hasOwn(this.ops, transaction.status)) {
                throw new Error(`Status ${transaction.status} not recognized`)
            }

            const result = this.ops[transaction.status]([from, to, amount]);
            if (!result) {
                failedTransactions.push(this.transactionQueue[this.transactionQueuePointer].id)
            }
            this.transactionQueuePointer++;
        }

        return failedTransactions;
    }

    printAccountDetails() {
        for (const [id, status] of Object.entries(this.accounts)) {
            console.log(`${id}\nCurrent: ${status.balance + status.pendingIn - status.pendingOut}`);
            console.log(`Available: ${status.balance - status.pendingOut}\n----------`);
        }
    }
}

const transactions = [
    {
        "id": "tr_1",
        "from": "acc_A",
        "to": "acc_B",
        "amount": 200,
        "status": "SETTLED"
    },
    {
        "id": "tr_2",
        "from": "acc_B",
        "to": "acc_C",
        "amount": 100,
        "status": "SETTLED"
    },
    {
        "id": "tr_1",
        "from": "acc_A",
        "to": "acc_B",
        "amount": 200,
        "status": "PENDING"
    }
]
const l1 = new Ledger({ acc_A: 1000, acc_B: 500, acc_C: 0 });
// console.log(l1.accounts);
// l1.processTransactions(transactions);
// console.log(l1.accounts);

const l = new Ledger({ acc_A: 1000, acc_B: 500, acc_C: 0, acc_D: 200 });
const meaty = [
    { "id": "tr_01", "from": "acc_A", "to": "acc_B", "amount": 200, "status": "SETTLED" },
    { "id": "tr_02", "from": "acc_B", "to": "acc_C", "amount": 300, "status": "PENDING" },
    { "id": "tr_03", "from": "acc_B", "to": "acc_D", "amount": 500, "status": "PENDING" },
    { "id": "tr_04", "from": "acc_A", "to": "acc_C", "amount": 800, "status": "SETTLED" },
    { "id": "tr_05", "from": "acc_A", "to": "acc_B", "amount": 10, "status": "SETTLED" },
    { "id": "tr_06", "from": "acc_C", "to": "acc_D", "amount": 1000, "status": "SETTLED" },
    { "id": "tr_07", "from": "acc_C", "to": "acc_D", "amount": 800, "status": "PENDING" }
]

console.log(l.accounts);
console.log(l.processTransactions(meaty));
console.log(l.accounts);
l.printAccountDetails();