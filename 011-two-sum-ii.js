class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0, r = numbers.length - 1
        let sum

        while (l < r) {
            sum = numbers[l] + numbers[r];
            if (sum < target) {
                l++;
            } else if (sum > target) {
                r--;
            } else {
                return [l + 1, r + 1];
            }
        }
    }
}

const sol = new Solution()

const numbers = [1, 2, 3, 4]
const target = 3

console.log(sol.twoSum(numbers, target))