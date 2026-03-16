class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        const n = nums.length;
        if (n === 0) return [];

        const deque = [];
        const results = new Int32Array(n - k + 1);

        for (let r = 0; r < nums.length; r++) {
            while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[r]) {
                deque.pop();
            }
            deque.push(r);

            if (deque[0] === r - k) {
                deque.shift();
            }

            if (r >= k - 1) {
                results[r - k + 1] = nums[deque[0]]
            }
        }

        return Array.from(results);
    }
}

const sol = new Solution();

const nums = [1, 2, 1, 0, 4, 2, 6];
const k = 3;

console.log(sol.maxSlidingWindow(nums, k));