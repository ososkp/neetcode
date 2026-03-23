/*
The Problem: Currency Conversion (Payment Routing)

The Prompt: You are given an array of currency pairs equations and an array of real numbers rates, 
where equations[i] = [CurrencyA, CurrencyB] and rates[i] represent the exchange rate. 
(Meaning, 1 CurrencyA = rates[i] CurrencyB).

You are also given an array of queries, where queries[j] = [CurrencyC, CurrencyD].

For each query, write a function that calculates the exchange rate from CurrencyC to CurrencyD.
If the conversion cannot be determined from the provided rates, return -1.0.

Key Concepts: Weighted Directed Graphs, BFS/DFS with cumulative path calculation, 
Hash Maps/Adjacency Lists.
*/

class Graph {
    constructor(equations, rates) {
        const graph = {};
        for (let i = 0; i < equations.length; i++) {
            const from = equations[i][0];
            const to = equations[i][1];

            if (!graph[from]) graph[from] = {};
            graph[from][to] = rates[i];

            // Other way too
            if (!graph[to]) graph[to] = {};
            graph[to][from] = (1.0 / rates[i]);
        }

        this.graph = graph;
    }

    traverse(startAndEnd) {
        const curr = startAndEnd[0];
        const target = startAndEnd[1];

        if (!(this.graph[curr] && this.graph[target])) return -1.0;
        if (curr === target) return 1.0;

        const visited = new Set([curr]);
        const stack = [[curr, 1.0]];

        while (stack.length > 0) {
            const [currentNode, currentProduct] = stack.pop();
            if (currentNode === target) return currentProduct;

            for (const [neighbor, rate] of Object.entries(this.graph[currentNode])) {
                const newProduct = rate * currentProduct;
                if (neighbor === target) return newProduct;
                if (visited.has(neighbor)) continue;
                visited.add(neighbor);
                stack.push([neighbor, newProduct]);
            }
        }

        return -1.0;
    }
}


const equations = [["USD", "EUR"], ["EUR", "GBP"], ["JPY", "USD"]]
const rates = [0.90, 0.85, 0.0067]

const query1 = ["JPY", "GBP"]; // 0.0051255
const query2 = ["EUR", "USD"]; // 1.111...
const query3 = ["USD", "CAD"]; // -1.0 - CAD not in systme
const query4 = ["USD", "USD"]; // 1.0 - no lookup needed

const graph = new Graph(equations, rates);
console.log(graph.traverse(query1));