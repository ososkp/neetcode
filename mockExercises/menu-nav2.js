function findByItemId(menu, target) {
    const stack = [menu];
    for (const menuEntry of stack) {
        if (typeof menuEntry !== 'object') continue;
        if (menuEntry['id'] === target) return {
            id: menuEntry['id'],
            price: Number(menuEntry['price'])
        };

        for (const value of Object.values(menuEntry)) {
            stack.push(value)
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

// console.log(calculateTotal(menu1, [42, 43, 43829]));