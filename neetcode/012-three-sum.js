class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        let l, r, sum, result = new Array()
        nums = nums.sort((a, b) => a - b);
        if (nums[0] > 0) {
            return result;
        }

        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            l = i + 1, r = nums.length - 1;

            while (l < r) {
                sum = nums[i] + nums[l] + nums[r];

                if (sum < 0) {
                    l++;
                } else if (sum > 0) {
                    r--;
                } else {
                    result.push([nums[i], nums[l], nums[r]]);
                    l++;
                    r--;

                    while (nums[l] === nums[l - 1]) l++;
                    while (nums[r] === nums[r + 1]) r--;
                }
            }

        }

        return result;
    }
}

// [-3, -2, -1, 0, 1, 2, 3, 4]
// -3 -1 4  // -3 0 3   // -3 1 2

const sol = new Solution()

const test = [-3, -2, -1, 0, 1, 2, 3, 4]

// console.log(sol.threeSum(test))

const nums = [-1, 0, 1, 2, -1, -4]
console.log(sol.threeSum(nums));