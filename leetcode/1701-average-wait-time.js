const averageWaitingTime = function (customers) {
    if (customers.length === 1) return customers[0][1];
    let totalWait = 0;
    let lastFinishTime = 0;

    // For each customer:
    // Chef finishes at arrival + wait + how backed up he was
    // How backed up he was = previous finish time - current arrival time

    for (const [arrival, wait] of customers) {
        const finishedAt = Math.max(lastFinishTime, arrival) + wait;
        totalWait += finishedAt - arrival;
        lastFinishTime = finishedAt;
    }
    return totalWait / customers.length;
};

const customers1 = [[1, 2], [2, 5], [4, 3]]
// Output: 5.00000

const customers2 = [[5, 2], [5, 4], [10, 3], [20, 1]]
// Output: 3.25000

console.log(averageWaitingTime(customers1));
console.log(averageWaitingTime(customers2));