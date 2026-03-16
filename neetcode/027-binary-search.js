class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    search(nums, target) {
        let low = 0;
        let high = nums.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }

        return -1;
    }
}

const sol = new Solution();

const nums1 = [-1, 0, 2, 4, 6, 8];
const target1 = 4;

const nums2 = [-1, 0, 2, 4, 6, 8];
const target2 = 3;

const nums3 = [-1, 0, 3, 5, 9, 12]
const target3 = 9

console.log(sol.search(nums1, target1));
console.log(sol.search(nums2, target2));
console.log(sol.search(nums3, target3));