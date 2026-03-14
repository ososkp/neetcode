/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function (n, reservedSeats) {
    let count = 0;

    const map = new Map();

    for (const [row, col] of reservedSeats) {
        if (col < 2 || col > 9) continue;
        map.set(row, (map.get(row) || 0) | (1 << (col - 2)));
    }

    count += (n - map.size) * 2;

    const LEFT = 0b00001111;
    const RIGHT = 0b11110000;
    const MIDDLE = 0b00111100;

    for (const mask of map.values()) {
        console.log(mask.toString(2), LEFT.toString(2));
        let canFitLeft = (mask & LEFT) === 0;
        let canFitRight = (mask & RIGHT) === 0;
        let canFitMiddle = (mask & MIDDLE) === 0;

        if (canFitLeft && canFitRight) count += 2;
        else if (canFitLeft || canFitRight || canFitMiddle) count++;
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