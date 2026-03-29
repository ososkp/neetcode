class Solution {
    graph = {}
    operatorMap = {
        '+': 1,
        '-': -1
    }

    resolveExpression(arr) {
        this.graph = {};
        const toSearch = arr[0];
        arr.splice(0, 1);
        for (const exp of arr) {
            const [left, right] = exp.split(' = ');
            if (!Object.hasOwn(this.graph, left)) {
                this.graph[left] = [];
            }
            this.graph[left].push(right);
        }

        const answer = this.search(toSearch, new Set());
        return answer === null ? '' : String(answer);
    }

    search(node, visited) {
        if (!isNaN(node)) {
            return Number(node);
        }
        // 1. Not in map
        if (!Object.hasOwn(this.graph, node)
            || this.graph[node].length === 0) {
            return null;
        }

        // 2. Cycle - set
        if (visited.has(node)) {
            return null;
        }

        visited.add(node);
        const results = new Set();

        for (const expr of this.graph[node]) {
            const val = this.evaluateExpression(expr, visited);

            if (val === null) {
                return null;
            }

            results.add(val);
        }

        visited.delete(node);

        if (results.size > 1) {
            return null;
        }

        return [...results][0];
    }

    evaluateExpression(expr, visited) {
        const tokens = expr.split(' ');

        if (tokens.length === 1) {
            return this.search(tokens[0], visited);
        }

        const operator = this.operatorMap[tokens[1]];
        const leftSide = this.search(tokens[0], visited);
        const rightSide = this.search(tokens[2], visited);

        if (leftSide === null || rightSide === null) {
            return null;
        }

        return leftSide + (operator * rightSide);
    }
}

const arr1 = ["T2", "T1 = 5", "T2 = T1"];
// Output: "5"
const arr2 = ["X", "X = -10"];
// Output: "-10"
const arr3 = ["T3", "T1 = 2", "T2 = T1", "T3 = T2"];
// Output: "2"

const arr4 = ["T2", "T1 = 1", "T2 = T3 - 5", "T3 = T1 + 7"]
// Output: "3"
const arr5 = ["T2", "T1 = 1", "T2 = 2 + T4", "T3 = T1 - 4", "T4 = T1 + T3"]
// Output: "0"
const arr6 = ["T3", "T1 = 1", "T2 = 2 + T4", "T3 = T1 - 4", "T4 = T1 + T3"]
// Output: "-3"



const arr7 = ["T1", "T1 = T2", "T2 = T1"]
// Output: ""
const arr8 = ["T1", "T2 = 1", "T3 = 2"]
// Output: ""
const arr9 = ["T1", "T1 = 1", "T1 = 2"]
// Output: ""


const sol = new Solution();

console.log(sol.resolveExpression(arr1));
console.log(sol.resolveExpression(arr2));
console.log(sol.resolveExpression(arr3));
console.log(sol.resolveExpression(arr4));
console.log(sol.resolveExpression(arr5));
console.log(sol.resolveExpression(arr6));
console.log(sol.resolveExpression(arr7));
console.log(sol.resolveExpression(arr8));
console.log(sol.resolveExpression(arr9));