class Solution {
    /**
     * @param {number[]} prices
     * @return {number}
     */
    maxProfit(prices) {
        if (prices.length <= 1) return 0;

        let l = 0, r = 1, maxSellValue = 0;

        while (r < prices.length) {
            if (prices[l] < prices[r]) {
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

console.log(sol.maxProfit(prices));

const prices2 = [10, 8, 7, 5, 2]

console.log(sol.maxProfit(prices2));