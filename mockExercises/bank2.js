class Bank {
    constructor(accounts) {
        this.accounts = [...accounts];

        this.ops = {
            "withdraw": (args) => this.withdraw(...args),
            "deposit": (args) => this.deposit(...args),
            "transfer": (args) => this.transfer(...args)
        }
    }

    isValidAccount(acc) {
        return acc >= 1 && acc <= this.accounts.length;
    }

    hasSufficientFunds(acc, amount) {
        return this.accounts[acc - 1] >= amount;
    }

    withdraw = (fromAcc, amount) => {
        if (!(this.isValidAccount(fromAcc)
            && this.hasSufficientFunds(fromAcc, amount))) {
            return false;
        }

        this.accounts[fromAcc - 1] -= amount;
        return true;
    }

    deposit = (toAcc, amount) => {
        if (!this.isValidAccount(toAcc)) return false;

        this.accounts[toAcc - 1] += amount;
        return true;
    }

    transfer = (fromAcc, toAcc, amount) => {
        if (!this.withdraw(fromAcc, amount)) return false;

        const result = this.deposit(toAcc, amount);

        if (result === false) {
            // Put money back
            this.deposit(fromAcc, amount);
        } else {
            this.deposit(toAcc, amount);
        }

        return result;
    }

    process(requests) {
        const results = [];
        for (const request of requests) {
            const split = request.split(' ');

            if (!this.ops[split[0]]) {
                return false;
            }

            const args = [...split.slice(1)].map(x => Number(x));
            console.log(split[0], args);

            const result = this.ops[split[0]](args);
            results.push(result);
        }

        console.log(this.accounts);
        return results;
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