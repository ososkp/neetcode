class Solution {
    maxProfit(prices) {
        if (prices.length <= 1) return 0;

        let maxSellValue = 0;
        let l = 0, r = 0;

        while (r < prices.length) {
            if (prices[r] > prices[l]) {
                maxSellValue = Math.max(maxSellValue, prices[r] - prices[l]);
            } else {
                l = r;
            }

            r++;
        }

        return maxSellValue;
    }
}

const sol = new Solution()

const prices = [10, 1, 5, 6, 7, 1];
const prices2 = [10, 8, 7, 5, 2];
const prices3 = [5, 1, 5, 6, 7, 1, 10]
const prices4 = [7, 1, 5, 3, 6, 4];
const prices5 = [1, 2];

console.log(sol.maxProfit(prices)); // 6
console.log(sol.maxProfit(prices2)); // 0
console.log(sol.maxProfit(prices3)); // 9
console.log(sol.maxProfit(prices4)); // 5
console.log(sol.maxProfit(prices5)); // 1
