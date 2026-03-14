class Solution {
    search(nums, target) {
        let mid = Math.floor(nums.length / 2);
        let low = 0, high = nums.length - 1;

        while (low < high) {
            if (nums[mid] === target) return mid;
            if (nums[mid] < target) low = mid + 1;
            if (nums[mid] > target) high = mid - 1

            mid = Math.floor((high + low) / 2);
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

console.log(sol.search(nums1, target1)); // 3
console.log(sol.search(nums2, target2)); // -1
console.log(sol.search(nums3, target3)); // 4