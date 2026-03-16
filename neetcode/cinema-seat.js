/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function (n, reservedSeats) {
    let count = 0;

    const map = new Map();

    for (let i = 0; i < reservedSeats.length; i++) {
        if (!map.has(reservedSeats[i][0])) {
            map.set(reservedSeats[i][0], new Set());
        }

        map.get(reservedSeats[i][0]).add(reservedSeats[i][1]);
    }

    count += (n - map.size) * 2;

    for (const key of map.keys()) {
        const row = map.get(key);
        let leftFree = true;
        let rightFree = true;
        let midFree = true;
        // left => 2, 3, 4, 5
        for (let left = 2; left <= 5; left++) {
            if (row.has(left)) {
                leftFree = false;
                break;
            }
        }

        // right => 6, 7, 8, 9
        for (let right = 6; right <= 9; right++) {
            if (row.has(right)) {
                rightFree = false;
                break;
            }
        }

        if (leftFree && rightFree) {
            count += 2;
            continue;
        }

        // middle => 4, 5, 6, 7
        for (let mid = 4; mid <= 7; mid++) {
            if (row.has(mid)) {
                midFree = false;
                break;
            }
        }

        if (midFree || leftFree || rightFree) {
            count++;
        }
    }

    return count;
};

const n1 = 3;
const reservedSeats1 = [[1, 2], [1, 3], [1, 8], [2, 6], [3, 1], [3, 10]];

const n2 = 2;
const reservedSeats2 = [[2, 1], [1, 8], [2, 6]]

const n3 = 4;
const reservedSeats3 = [[4, 3], [1, 4], [4, 6], [1, 7]];

console.log(maxNumberOfFamilies(n1, reservedSeats1));
console.log(maxNumberOfFamilies(n2, reservedSeats2));
console.log(maxNumberOfFamilies(n3, reservedSeats3));