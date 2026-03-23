class MenuListBuilder {
    constructor(rawData) {
        this.menu = {};
        for (const data of rawData) {
            this.menu[data['id']] = {
                id: data.id,
                name: data.name,
                category: data.category,
                price: data.price,
                inStock: data.inStock
            }
        }

        this.state = {
            category: null,
            instock: null,
            sort: null
        }

        this.filters = {
            category: (item, targetCategory) => item.category.toLowerCase() === targetCategory.toLowerCase(),
            instock: (item, requiredStockState) => item.inStock === requiredStockState
        }
    }

    sortResults(results, sort) {
        if (sort === null || sort.by === null) return results;

        let sortLambda;
        switch (sort.direction) {
            case 'asc':
                sortLambda = (a, b) => typeof a[sort.by] === 'number' ?
                    a[sort.by] - b[sort.by]
                    : a[sort.by].localeCompare(b[sort.by]);
                break;
            case 'desc':
                sortLambda = (a, b) => typeof a[sort.by] === 'number'
                    ? b[sort.by] - a[sort.by]
                    : sortLambda = (a, b) => b[sort.by].localeCompare(a[sort.by]);
                break;
        }

        results.sort(sortLambda);

        return results;
    }

    getResults() {
        let results = Object.values(this.menu);
        let sort = null;

        for (const [filterName, filterValue] of Object.entries(this.state)) {
            if (filterName === 'sort') {
                sort = filterValue;
                continue
            }

            if (filterValue !== null) {
                const filterLambda = this.filters[filterName];

                results = results.filter(item => filterLambda(item, filterValue));
            }
        }



        return this.sortResults(results, sort);
    }

    dispatch(filterName, ...args) {
        let filter = filterName.toLowerCase();
        if (this.state.hasOwnProperty(filter)) {
            if (filter === 'sort') {
                this.state[filter] = {
                    by: args[0],
                    direction: args[1]
                };
            } else {
                this.state[filter] = args[0];
            }
        } else {
            console.error(`Filter ${filter} does not exist`)
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
mlb.dispatch('Category', 'Sides');
mlb.dispatch('InStock', true);
mlb.dispatch('Sort', 'price', 'asc');
console.log(mlb.getResults());
mlb.dispatch('Sort', 'name', 'desc');
console.log(mlb.getResults());
