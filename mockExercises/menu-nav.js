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

function findByItemId(menu, orderId) {
    const result = search(menu);

    return JSON.stringify(result, null, 2);

    function search(menu) {
        if (typeof menu !== "object" && menu === null) return null;
        if (menu.hasOwnProperty("id") && menu.id === orderId) return menu;

        for (const key of Object.keys(menu)) {
            const retrieved = search(menu[key]);

            if (retrieved !== null) return { [key]: retrieved };
        }

        return null;
    }
}

function calculateTotal(menu, order) {
    // Order: item IDs array (e.g. [42, 101, 5])

    let total = 0;

    for (const currentId of order) {
        const item = searchForItem(menu, currentId)

        if (item !== null && item.hasOwnProperty("price")) {
            total += Math.round(Number(item.price) * 100);
        }
    }

    return total / 100;

    function searchForItem(item, targetId) {
        if (typeof item !== 'object' || item === null) return null;
        if (item.hasOwnProperty("id") && Number(item.id) === targetId) {
            return item;
        }

        for (const key of Object.keys(item)) {
            const retrieved = searchForItem(item[key], targetId);
            if (retrieved !== null) return retrieved;
        }

        return null;
    }
}

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

// console.log(findByItemId(menu1, targetId1));
// console.log(findByItemId(menu2, targetId2));
// console.log(findByItemId(menu3, targetId3));

console.log(calculateTotal(menu1, [42, 43, 43829]));