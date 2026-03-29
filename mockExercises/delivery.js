function findDelivery(order, shoppers) {
    const [distanceToHouse, startTime, acceptableLateWindow] = order;

    return shoppers.map(shopper => {
        const [distanceToStore, speed, timeInStore] = shopper;
        const timeSpent = ((distanceToHouse + distanceToStore) / speed) + timeInStore;
        const acceptableToCustomer = timeSpent <= startTime + acceptableLateWindow;
        const acceptableToShopper = timeSpent >= startTime;

        return acceptableToCustomer && acceptableToShopper;
    })
}

const order = [200, 20, 15];
const shoppers = [
    [600, 40, 10],  // true (Safely inside)
    [300, 40, 5],   // false (Too early)
    [1000, 20, 20], // false (Too late)
    [400, 40, 5],   // true (Exact start)
    [800, 40, 10]   // true (Exact end)
];

console.log(findDelivery(order, shoppers));