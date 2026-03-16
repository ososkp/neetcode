class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findMin(nums) {
        let low = 0, high = nums.length - 1;

        while (low < high) {
            const mid = Math.floor((low + high) / 2)
            // 0 1 2 3 4 5
            // 3 4 5 0 1 2
            // 5 0 1 2 3 4
            // 4 5 0 1 2 3

            if (nums[mid] > nums[high]) { // Break is on right
                low = mid + 1;
            } else if (nums[mid] < nums[high]) { // Break is on left
                high = mid;
            }
        }

        return nums[low];
    }
}

const sol = new Solution();

const nums1 = [3, 4, 5, 6, 1, 2];
const nums2 = [4, 5, 0, 1, 2, 3];
const nums3 = [4, 5, 6, 7];

console.log(sol.findMin(nums1));
console.log(sol.findMin(nums2));
console.log(sol.findMin(nums3));