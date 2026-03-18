class Pos {
    constructor(menu) {
        this.menu = menu;
        this.priceMap = {};
    }

    buildPriceMap() {
        const stack = [this.menu];
        let head = 0;

        while (head < stack.length) {
            const current = stack[head]

            if (current.hasOwnProperty('id')) {
                this.priceMap[Number(current['id'])] = Number(current['price']);
            } else {
                for (const key of Object.keys(current)) {
                    stack.push(current[key])
                }
            }
            head++;
        }
    }

    getPrice(itemArray) {
        return itemArray.reduce((total, item) => {
            return (this.priceMap[item] ??= 0) + total;
        }, 0)
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
console.log(pos.getPrice([101, 42, 43, 201, -1]));