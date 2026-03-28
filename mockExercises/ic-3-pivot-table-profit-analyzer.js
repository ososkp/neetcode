class DataWarehouse {
    constructor(data) {
        this.columnHeaders = {};

        data[0].forEach((colHeader, idx) => this.columnHeaders[colHeader] = idx);
        this.data = data.slice(1);
    }

    getMostProfitable(column, startDate) {
        if (!Object.hasOwn(this.columnHeaders, column)) return '';

        const dateCol = this.columnHeaders['date'];
        const sellPriceCol = this.columnHeaders['sell_price'];
        const costCol = this.columnHeaders['cost'];
        const columnCol = this.columnHeaders[column];
        const profits = {};

        this.data
            .filter(row => row[dateCol] >= startDate)
            .forEach(row => {
                const profit = row[sellPriceCol] - row[costCol];
                const cat = row[columnCol];

                profits[cat] = (profits[cat] || 0) + profit;
                profits[row[columnCol]] += profit;
            });

        let bestProfitByCategory = '';
        let maxProfit = -Infinity;

        for (const [cat, profit] of Object.entries(profits)) {
            if (profit > maxProfit) {
                maxProfit = profit;
                bestProfitByCategory = cat;
            } else if (profit === maxProfit && cat < bestProfitByCategory) {
                // Lexicographic
                bestProfitByCategory = cat;
            }
        }

        return bestProfitByCategory;
    }
}

const input1 = [
    ["order_id", "cost", "sell_price", "product", "date", "state"],
    ["23", "12", "18", "cheese", "2023-12-04", "CA"],
    ["24", "5", "12", "melon", "2023-12-04", "OR"],
    ["25", "25", "31", "cheese", "2023-12-05", "OR"],
    ["26", "4", "12", "bread", "2023-12-05", "CA"],
    ["25", "10", "14", "cheese", "2023-12-06", "CA"],
    ["26", "5", "6", "bread", "2023-12-06", "OR"]
];

const queries = [
    ["state", "2023-12-05"],
    ["product", "2023-12-05"],
    ["product", "2025-12-05"],
    ["color", "2023-12-01"]
];

const dw = new DataWarehouse(input1);

console.log(dw.getMostProfitable(...queries[0]));
console.log(dw.getMostProfitable(...queries[1])); // Returns bread, should be cheese
console.log(dw.getMostProfitable(...queries[2]));
console.log(dw.getMostProfitable(...queries[3]));