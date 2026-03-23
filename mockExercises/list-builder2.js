class MenuListBuilder {
    constructor(menuData) {
        this.menu = {};
        for (const entry of menuData) {
            this.menu[entry.id] = {
                id: entry.id,
                name: entry.name,
                category: entry.category,
                price: entry.price,
                inStock: entry.inStock,
            }
        }

        this.state = {
            category: null,
            instock: null,
            sort: null
        }

        this.filters = {
            category: (categoryName, item) => item.category.toLowerCase() === categoryName.toLowerCase(),
            instock: (inStockRule, item) => item.inStock === inStockRule
        }
    }

    getResults() {
        let results = Object.values(this.menu);
        let sortLambda = null;

        for (const [ruleName, ruleValue] of Object.entries(this.state)) {
            if (ruleName === 'sort') {
                sortLambda = ruleValue;
                continue;
            }

            if (ruleValue === null) continue;

            results = results.filter(item => this.filters[ruleName](ruleValue, item));
        }

        if (sortLambda !== null) {
            results.sort((a, b) => {
                const by = this.state.sort.by;
                const dir = this.state.sort.direction;
                let lambda;

                switch (dir) {
                    case 'asc':
                        lambda = typeof a[by] === 'number'
                            ? a[by] - b[by]
                            : a[by].localeCompare(b[by]);
                        break;
                    case 'desc':
                        lambda = typeof a[by] === 'number'
                            ? b[by] - a[by]
                            : b[by].localeCompare(a[by]);
                }

                return lambda;
            })
        }

        return results;
    }

    dispatch(rule, ...args) {
        let ruleSanitized = rule.toLowerCase();

        if (!this.state.hasOwnProperty(ruleSanitized)) return false;

        if (ruleSanitized === 'sort') {
            this.state[ruleSanitized] = {
                by: args[0],
                direction: args[1]
            }
        } else {
            this.state[ruleSanitized] = args[0];
        }
    }
}

const rawMenuData = [
    { id: 1, name: "Burger", category: "Mains", price: 12.99, inStock: true },
    { id: 2, name: "Fries", category: "Sides", price: 4.99, inStock: true },
    { id: 3, name: "Milkshake", category: "Desserts", price: 5.99, inStock: false },
    { id: 4, name: "Salad", category: "Sides", price: 8.99, inStock: true },
    { id: 5, name: "Steak", category: "Mains", price: 24.99, inStock: true },
    { id: 6, name: "Soup", category: "Sides", price: 6.99, inStock: false }
];

const mlb = new MenuListBuilder(rawMenuData);
// mlb.dispatch('Category', 'Sides');
// mlb.dispatch('InStock', true);
// console.log(mlb.getResults());
mlb.dispatch('Sort', 'price', 'desc');
console.log(mlb.getResults());
mlb.dispatch('Sort', 'name', 'asc');
console.log(mlb.getResults());