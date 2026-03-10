class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const result = new Array(nums.length).fill(1)

        for (let i = 1; i < result.length; i++) {
            result[i] = nums[i - 1] * result[i - 1]
        }

        let suffix = 1
        for (let i = result.length - 1; i >= 0; i--) {
            result[i] *= suffix
            suffix *= nums[i]
        }
        return result
    }
}

const sol = new Solution()

nums = [1, 2, 4, 6]

console.log(sol.productExceptSelf(nums))

nums2 = [-1, 0, 1, 2, 3]

console.log(sol.productExceptSelf(nums2));