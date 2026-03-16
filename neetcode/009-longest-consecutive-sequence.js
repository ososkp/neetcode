class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const numSet = new Set(nums)

        let longestStreak = 0
        for (const num of numSet) {
            let streak = 1
            const oneLess = num - 1
            if (numSet.has(oneLess)) {
                continue
            }

            let iter = num + 1
            while (numSet.has(iter)) {
                iter++
                streak++
            }

            if (streak > longestStreak) {
                longestStreak = streak
            }
        }

        return longestStreak
    }
}

const sol = new Solution()

const nums = [2, 20, 4, 10, 3, 4, 5]

console.log(sol.longestConsecutive(nums))

const nums2 = [0, 3, 2, 5, 4, 6, 1, 1]

console.log(sol.longestConsecutive(nums2));