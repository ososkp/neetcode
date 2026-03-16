class Solution {
    /**
     * @param {number} target
     * @param {number[]} position
     * @param {number[]} speed
     * @return {number}
     */
    carFleet(target, position, speed) {
        // timeToTarget = (target - position) / speed
        const result = [];

        const cars = position.map((pos, idx) => [pos, (target - pos) / speed[idx]]);
        cars.sort((a, b) => b[0] - a[0]);

        for (const car of cars) {
            result.push(car[1]);

            if (result.length >= 2 &&
                result[result.length - 1] <= result[result.length - 2]) {
                result.pop();
            }
        }

        return result.length;
    }
}

const sol = new Solution();

const target1 = 10;
const position1 = [1, 4];
const speed1 = [3, 2];

const target2 = 10;
const position2 = [4, 1, 0, 7];
const speed2 = [2, 2, 1, 1]

console.log(sol.carFleet(target1, position1, speed1));
console.log(sol.carFleet(target2, position2, speed2));