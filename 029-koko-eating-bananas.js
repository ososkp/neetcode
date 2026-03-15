class Solution {
    /**
     * @param {number[]} piles
     * @param {number} h
     * @return {number}
     */
    minEatingSpeed(piles, h) {
        if (piles.length === 1) {
            return Math.ceil(piles[0] / h);
        }

        let low = 1, high = piles.reduce((max, pile) => pile > max ? pile : max, 0);

        let bestRate = high;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            let total = 0;
            for (let i = 0; i < piles.length; i++) {
                total += Math.ceil(piles[i] / mid);
                if (total > h) break;
            }

            if (total <= h) {
                bestRate = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return bestRate;
    }
}

const sol = new Solution();

const piles1 = [1, 4, 3, 2];
const h1 = 9;
const piles2 = [25, 10, 23, 4];
const h2 = 4;
const piles3 = [25];
const h3 = 4;
const piles4 = [3, 6, 7, 11]
const h4 = 8
const piles5 = [312884470]
const h5 = 312884469

console.log(sol.minEatingSpeed(piles1, h1));
console.log(sol.minEatingSpeed(piles2, h2));
console.log(sol.minEatingSpeed(piles3, h3));
console.log(sol.minEatingSpeed(piles4, h4));
console.log(sol.minEatingSpeed(piles5, h5));