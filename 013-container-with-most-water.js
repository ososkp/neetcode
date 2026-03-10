class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let maxArea = 0, l = 0, r = heights.length - 1

        while (l < r) {
            maxArea = Math.max(maxArea, Math.min(heights[l], heights[r]) * (r - l))

            if (heights[l] < heights[r]) {
                l++;
            } else if (heights[l] > heights[r]) {
                r--;
            } else {
                l++;
                r--;
            }
        }

        return maxArea;
    }
}

const sol = new Solution()

const height = [1, 7, 2, 5, 4, 7, 3, 6];

console.log(sol.maxArea(height));

const height2 = [2, 2, 2];

console.log(sol.maxArea(height2));
