class Bank {
    constructor(balances) {
        this.accounts = [...balances];

        this.ops = {
            "DEPOSIT": (args) => this.deposit(...args),
            "WITHDRAW": (args) => this.withdraw(...args),
            "TRANSFER": (args) => this.transfer(...args)
        }
    }

    // 1-indexed
    isValid(acc) {
        return acc >= 1 && acc <= this.accounts.length;
    }

    hasSufficientFunds(acc, money) {
        return this.accounts[acc - 1] >= money;
    }

    deposit = (toAcc, money) => {
        if (!this.isValid(toAcc)) return false;
        this.accounts[toAcc - 1] += money;
        return true;
    }

    withdraw = (fromAcc, money) => {
        if (!(this.isValid(fromAcc) && this.hasSufficientFunds(fromAcc, money))) return false;
        this.accounts[fromAcc - 1] -= money;
        return true;
    }

    transfer = (fromAcc, toAcc, money) => {
        if (!this.withdraw(fromAcc, money)) return false;

        const result = this.deposit(toAcc, money);

        // Check for network error
        if (!result) {
            // Put the money back if the deposite failed
            this.deposit(fromAcc, money);
        }

        return result;
    }

    process(requests) {
        return requests.map(req => {
            const [type, ...args] = req.split(' ')
                .map(x => isNaN(x) ? x : Number(x));
            console.log(args);
            const operation = this.ops[type.toUpperCase()]
            return operation ? operation(args) : false;
        })
    }
}

class BankFactory {
    static createBank(accounts) {
        return new Bank(...accounts);
    }
}

const myBank = new Bank([10, 100, 20]);
const requests = [
    "withdraw 2 10",
    "transfer 1 3 5",
    "deposit 1 50",
    "withdraw 3 100"
];
console.log(myBank.process(requests)); // Expected: [true, true, true, false]

const commands = ["Bank", "withdraw", "transfer", "deposit", "transfer", "withdraw"];
const details = [[[10, 100, 20, 50, 30]], [3, 10], [5, 1, 20], [5, 20], [3, 4, 15], [10, 50]];
const newBank = BankFactory.createBank(details[0]);

l = [];
for (let i = 1; i < commands.length; i++) {
    l.push(commands[i] + ' ' + details[i].join(' '));
}

console.log(l);
console.log(newBank.process(l));