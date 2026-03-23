class Menu {
    /**
     * 
     * @param {String} name 
     * @param {Number} price 
     * @param {Array(MenuGroup)} groups 
     */
    constructor(name, price, groups) {
        this.name = name;
        this.price = price;
        this.groups = groups;
    }
}

class MenuGroup {
    /**
     * 
     * @param {String} name 
     * @param {Number} price 
     * @param {Array(MenuItem)} items 
     * @param {Array(MenuGroup)} groups 
     */
    constructor(name, price, items, groups) {
        this.name = name;
        this.price = price;
        this.items = items;
        this.groups = groups;
    }
}

class MenuItem {
    /**
     * 
     * @param {String} name 
     * @param {Number} price 
     */
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Search for item in all menus to find the one and return the computed price (if found)
/**
 * 
 * @param {Array(Menu)} menus 
 * @param {String} itemName 
 */
function getPrice(menus, itemName) {
    const stack = menus.map(m => [m, m.price, m.name]);

    while (stack.length > 0) {
        const [curr, inheritedPrice, inheritedSource] = stack.pop();

        const effectivePrice = curr.price !== null && curr.price !== undefined
            ? curr.price
            : inheritedPrice;

        const effectiveSource = curr.price !== null && curr.price !== undefined
            ? curr.name
            : inheritedSource;

        if (curr.name === itemName) {
            return {
                name: curr.name,
                price: effectivePrice,
                source: effectiveSource
            }
        }

        if (curr.groups) {
            for (const group of curr.groups) {
                stack.push([group, effectivePrice, effectiveSource])
            }
        }

        if (curr.items) {
            for (const item of curr.items) {
                stack.push([item, effectivePrice, effectiveSource]);
            }
        }
    }

    return null;
}










// function getPrice(menus, itemName) {
//     const stack = menus.map(m => [m, m.price, m.name]);

//     while (stack.length > 0) {
//         const [curr, inheritedPrice, inheritedName] = stack.pop();

//         const effectivePrice = (curr.price !== null && curr.price !== undefined)
//             ? curr.price
//             : inheritedPrice;

//         const effectiveName = (curr.price !== null && curr.price !== undefined)
//             ? curr.name
//             : inheritedName;

//         if (curr instanceof MenuItem && curr.name === itemName) return [curr.name, effectivePrice, effectiveName];

//         if (curr.groups) {
//             for (const group of curr.groups) {
//                 stack.push([group, effectivePrice, effectiveName]);
//             }
//         }

//         if (curr.items) {
//             for (const item of curr.items) {
//                 stack.push([item, effectivePrice, effectiveName]);
//             }
//         }
//     }

//     return null;
// }

// Menu 1: Value Menu (Default $5.00)
const burgerGroup = new MenuGroup("Burgers", null, [
    new MenuItem("Slider", null),      // Should be $5.00 (Inherit from Menu)
    new MenuItem("Big Burger", 8.00)  // Should be $8.00 (Override)
], []);

const valueMenu = new Menu("Value Menu", 5.00, [burgerGroup]);

// Menu 2: Fancy Menu (Default $20.00)
const steakGroup = new MenuGroup("Steaks", 25.00, [
    new MenuItem("Sirloin", null),     // Should be $25.00 (Inherit from Group)
    new MenuItem("Wagyu", 50.00)       // Should be $50.00 (Override)
], []);

const fancyMenu = new Menu("Fancy Menu", 20.00, [steakGroup]);

const allMenus = [valueMenu, fancyMenu];

console.log(getPrice(allMenus, "Slider"));
console.log(getPrice(allMenus, "Sirloin"));
console.log(getPrice(allMenus, "Wagyu"));
console.log(getPrice(allMenus, "Pizza"));