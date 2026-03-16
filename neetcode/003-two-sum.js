class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        const numMap = new Map()

        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i]
            if (numMap.has(complement)) {
                return [numMap.get(complement), i]
            }

            numMap.set(nums[i], i)
        }
    }
}

const sol = new Solution()

const nums = [5, 4, 3, 6]
const target = 7

console.log(sol.twoSum(nums, target))

const nums2 = [5, 5]
const target2 = 10

console.log(sol.twoSum(nums2, target2))