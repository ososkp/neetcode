class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height || height?.length < 3) return 0;

        let totalWater = 0;
        let l = 0, r = height.length - 1;
        let maxL = height[l], maxR = height[r];

        while (l < r) {
            if (maxL < maxR) {
                l++;
                maxL = Math.max(maxL, height[l]);
                totalWater += maxL - height[l];
            } else {
                r--;
                maxR = Math.max(maxR, height[r]);
                totalWater += maxR - height[r];
            }

        }
        return totalWater;
    }
}

const sol = new Solution();

const height = [0, 2, 0, 3, 1, 0, 1, 3, 2, 1];

console.log(sol.trap(height));
console.log(sol.trap());