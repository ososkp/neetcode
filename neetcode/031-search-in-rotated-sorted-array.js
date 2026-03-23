class Solution {
    search(nums, target) {
        let l = 0, r = nums.length - 1;

        while (l < r) {
            let mid = Math.floor((l + r) / 2);

            if (nums[mid] < nums[r]) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
    }

    // search(nums, target) {
    //     let l = 0, r = nums.length - 1;

    //     while (l < r) {
    //         let mid = Math.floor((l + r) / 2);

    //         if (nums[mid] < nums[r]) {
    //             r = mid;
    //         } else {
    //             l = mid + 1;
    //         }
    //     }

    //     const midpoint = l;
    //     let startIndex = 0;
    //     let endIndex = nums.length - 1;

    //     if (nums[midpoint] === target) return midpoint;

    //     if (nums[midpoint] <= target && nums[nums.length - 1] >= target) {
    //         // Search in 2nd half
    //         startIndex = midpoint;
    //     } else {
    //         // Search in 1st half
    //         endIndex = midpoint - 1;
    //     }

    //     l = startIndex, r = endIndex;

    //     while (l <= r) {
    //         let mid = Math.floor((l + r) / 2);
    //         if (nums[mid] === target) {
    //             return mid;
    //         } else if (nums[mid] < target) {
    //             l = mid + 1;
    //         } else {
    //             r = mid - 1;
    //         }
    //     }

    //     return -1;
    // }
}

const sol = new Solution();

const nums1 = [3, 4, 5, 6, 1, 2];
const target1 = 5
console.log(sol.search(nums1, 3));
console.log(sol.search(nums1, 4));
console.log(sol.search(nums1, 5));
console.log(sol.search(nums1, 6));
console.log(sol.search(nums1, 1));
console.log(sol.search(nums1, 2));
const nums2 = [3, 5, 6, 0, 1, 2];
const target2 = 4
console.log(sol.search(nums2, target2));
