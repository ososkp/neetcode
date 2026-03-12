class Solution {
    /**
     * @param {string[]} tokens
     * @return {number}
     */
    evalRPN(tokens) {
        const ops = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => Math.trunc(a / b),
        }
        const stack = [];

        for (let token of tokens) {
            if (token in ops) {
                const right = stack.pop();
                const left = stack.pop();
                stack.push(ops[token](left, right));
            } else {
                stack.push(+token);
            }
        }

        return stack[0];
    }
}

const sol = new Solution();

const tokens = ["1", "2", "+", "3", "*", "4", "-"]

console.log(sol.evalRPN(tokens));