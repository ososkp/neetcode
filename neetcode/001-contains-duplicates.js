class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        const numSet = new Set()
        return nums.some(num => {
            if (numSet.has(num)) return true;
            numSet.add(num)
            return false
        })
    }
}

const sol = new Solution()

const result = sol.hasDuplicate([1, 2, 3, 3])

console.log(result)