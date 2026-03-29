class DataWarehouse {
    constructor(data) {
        this.headers = {};
        data[0].forEach((header, index) => this.headers[header] = index);
        this.data = data.slice(1);
        this.dateCol = this.headers['date'];
        this.sellCol = this.headers['sell_price'];
        this.costCol = this.headers['cost'];
    }

    getMostProfitable(cat, fromDate = '0') {
        if (!Object.hasOwn(this.headers, cat)) return '';

        const catCol = this.headers[cat];
        const profitsByCat = {};

        this.data
            .filter(row => row[this.dateCol] >= fromDate)
            .forEach(row => {
                const profit = row[this.sellCol] - row[this.costCol];
                const category = row[catCol];

                profitsByCat[category] = (profitsByCat[category] ?? 0) + profit;
            });

        console.log(profitsByCat);

        let bestProfitSoFar = -Infinity;
        let bestCategorySoFar = '';

        for (const [key, value] of Object.entries(profitsByCat)) {
            if (value > bestProfitSoFar) {
                bestProfitSoFar = value;
                bestCategorySoFar = key;
            } else if (value === bestProfitSoFar && key < bestCategorySoFar) {
                bestCategorySoFar = key;
            }
        }

        return bestCategorySoFar;
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

console.log(dw.getMostProfitable(...queries[0])); // CA
console.log(dw.getMostProfitable(...queries[1])); // cheese
console.log(dw.getMostProfitable(...queries[2])); // blank
console.log(dw.getMostProfitable(...queries[3])); // blank