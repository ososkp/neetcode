class Pos {
    constructor(menu) {
        this.menu = menu;
        this.priceMap = new Map();
    }

    buildPriceMap() {
        const priceMap = new Map();
        search(this.menu);

        this.priceMap = priceMap;

        function search(item) {
            if (typeof item !== 'object' || item === null) return null;
            if (item.hasOwnProperty('price')) {
                priceMap.set(item.id, Number(item.price))
            }

            for (const subItemKey of Object.keys(item)) {
                search(item[subItemKey]);
            }

            return null;
        }
    }

    /**
     * 
     * @param {Array[int]} orders 
     */
    getTotal(orders) {
        return orders.reduce((total, orderPrice) => total + (this.priceMap.get(orderPrice) ?? 0), 0);
    }

    getPriceMap() {
        return JSON.stringify(Object.fromEntries(this.priceMap), null, 2);
    }
}

const menu1 = {
    "Breakfast": {
        "Pancakes": { "id": 101, "price": 8.99 },
        "Sides": {
            "Bacon": { "id": 42, "price": 3.99 },
            "Eggs": { "id": 43, "price": 2.99 }
        }
    },
    "Lunch": {
        "Burger": { "id": 201, "price": 12.99 }
    }
};
const targetId1 = 42;
// Expected Output: { "id": 42, "price": 3.99 }

const menu2 = {
    "Dinner": {
        "Steakhouse": {},
        "Pasta": { "id": 301, "price": 18.99 }
    },
    "Drinks": {}
};
const targetId2 = 999;
// Expected Output: null

const menu3 = {
    "Specials": {
        "Friday": {
            "Chef_Choice": {
                "Appetizer": {
                    "Soup_Of_The_Day": { "id": 5, "price": "12.99" }
                }
            }
        }
    }
};
const targetId3 = 5;
// Expected Output: { "id": 5, "price": "12.99" }

const pos = new Pos(menu1);
pos.buildPriceMap();
console.log(pos.getPriceMap());
console.log(pos.getTotal([101, 42, 2148]));