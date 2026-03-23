function findByItemId(menu, target) {
    const stack = [[menu, null]];

    while (stack.length > 0) {
        const [curr, parentPrice] = stack.pop();

        const newPrice = curr.hasOwnProperty('price') && curr['price'] !== null
            ? Number(curr['price'])
            : parentPrice;

        if (curr.hasOwnProperty('id') && curr['id'] === target) return { ...curr, price: newPrice };

        if (typeof curr === 'object' && curr !== null) {
            for (const key of Object.keys(curr)) {
                if (curr[key] !== null && typeof curr[key] === 'object') {
                    stack.push([curr[key], newPrice]);
                };
            }
        }
    }

    return null;
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

const f = {
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

console.log(findByItemId(menu1, targetId1));
console.log(findByItemId(menu2, targetId2));
console.log(findByItemId(menu3, targetId3));

const menu = {
    id: "m1",
    name: "Main Menu",
    price: 15.00, // Default price for anything in this menu
    burgers: {
        id: "g1",
        name: "Burgers",
        price: null, // Inherits 15.00 from Main Menu
        cheeseburger: { id: 101, name: "Cheeseburger", price: null }, // Should be 15.00
        bacon_burger: { id: 102, name: "Bacon Burger", price: 18.00 }  // Should be 18.00
    },
    drinks: {
        id: "g2",
        name: "Drinks",
        price: 3.00, // Overrides the Menu price of 15.00
        soda: { id: 201, name: "Soda", price: null }, // Should be 3.00
        milkshake: { id: 202, name: "Milkshake", price: 6.00 } // Should be 6.00
    }
};

console.log(findByItemId(menu, 101));
console.log(findByItemId(menu, 201));
console.log(findByItemId(menu, 102));