class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        let buckets = Array.from({ length: nums.length + 1 }, () => new Array())

        const freqMap = this.buildFreqMap(nums)
        for (const [key, value] of freqMap.entries()) {
            buckets[value].push(key)
        }

        const resultArray = new Array()
        for (let i = buckets.length - 1; i >= 0; i--) {
            if (buckets[i].length > 0) {
                for (const num of buckets[i]) {
                    resultArray.push(num)
                    if (resultArray.length === k) return resultArray
                }
            }
        }

        return resultArray
    }

    buildFreqMap(nums) {
        const freqMap = new Map()

        for (let i = 0; i < nums.length; i++) {
            freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1)
        }

        return freqMap
    }
}

const sol = new Solution()

nums = [1, 2, 2, 3, 3, 3], k = 2

console.log(sol.topKFrequent(nums, k))